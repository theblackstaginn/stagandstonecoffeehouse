(() => {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const CACHE_BUST = window.__STAG_CACHE_BUST__ || params.get("_cb") || "";

  const bustUrl = source => {
    if (!CACHE_BUST || !source || source.startsWith("data:") || source.startsWith("blob:")) {
      return source;
    }

    try {
      const url = new URL(source, window.location.href);
      url.searchParams.set("_cb", CACHE_BUST);
      return url.href;
    } catch {
      const joiner = source.includes("?") ? "&" : "?";
      return source + joiner + "_cb=" + encodeURIComponent(CACHE_BUST);
    }
  };

  const bustSrcset = value => {
    if (!CACHE_BUST || !value) return value;

    return value
      .split(",")
      .map(part => {
        const match = part.trim().match(/^(\S+)(\s+.+)?$/);
        if (!match) return part;
        return bustUrl(match[1]) + (match[2] || "");
      })
      .join(", ");
  };

  const applyCacheBust = () => {
    if (!CACHE_BUST) return;

    document.querySelectorAll('link[rel~="stylesheet"]').forEach(link => {
      const href = link.getAttribute("href");
      if (!href) return;

      try {
        const resolved = new URL(href, window.location.href);
        if (resolved.origin === window.location.origin) {
          link.href = bustUrl(href);
        }
      } catch {}
    });

    document.querySelectorAll("img[src]").forEach(image => {
      image.src = bustUrl(image.getAttribute("src"));
    });

    document.querySelectorAll("source[src]").forEach(source => {
      source.src = bustUrl(source.getAttribute("src"));
    });

    document.querySelectorAll("source[srcset], img[srcset]").forEach(source => {
      source.srcset = bustSrcset(source.getAttribute("srcset"));
    });

    document.querySelectorAll("video[poster]").forEach(video => {
      video.poster = bustUrl(video.getAttribute("poster"));
    });

    document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]').forEach(link => {
      link.href = bustUrl(link.getAttribute("href"));
    });
  };

  const ensureIndicator = () => {
    let indicator = document.getElementById("sitePullRefresh");
    if (indicator) return indicator;

    const style = document.createElement("style");
    style.textContent = `
      #sitePullRefresh{
        position:fixed;
        top:calc(env(safe-area-inset-top,0px) + 8px);
        left:50%;
        z-index:9999;
        display:flex;
        align-items:center;
        gap:8px;
        min-height:42px;
        padding:8px 14px;
        border:1px solid rgba(225,177,127,.24);
        border-radius:999px;
        background:rgba(16,17,18,.96);
        color:#efe4d1;
        box-shadow:0 8px 26px rgba(0,0,0,.34);
        font:600 .68rem/1 Cinzel,serif;
        letter-spacing:.06em;
        text-transform:uppercase;
        pointer-events:none;
        opacity:0;
        transform:translate3d(-50%,-72px,0);
        transition:opacity .14s ease;
        will-change:transform,opacity;
      }
      #sitePullRefresh .site-pull-refresh-mark{
        display:inline-grid;
        place-items:center;
        width:22px;
        height:22px;
        font-size:1rem;
        transform:rotate(var(--pull-rotation,0deg));
      }
      #sitePullRefresh.is-pulling,
      #sitePullRefresh.is-ready,
      #sitePullRefresh.is-refreshing{
        opacity:1;
      }
      #sitePullRefresh.is-refreshing .site-pull-refresh-mark{
        animation:site-pull-refresh-spin .7s linear infinite;
      }
      @keyframes site-pull-refresh-spin{
        to{transform:rotate(360deg)}
      }
      @media(min-width:961px){
        #sitePullRefresh{display:none!important}
      }
      @media(prefers-reduced-motion:reduce){
        #sitePullRefresh{transition:none}
        #sitePullRefresh.is-refreshing .site-pull-refresh-mark{animation:none}
      }
    `;
    document.head.appendChild(style);

    indicator = document.createElement("div");
    indicator.id = "sitePullRefresh";
    indicator.setAttribute("aria-hidden", "true");
    indicator.innerHTML =
      '<span class="site-pull-refresh-mark">↻</span>' +
      '<span class="site-pull-refresh-label">Pull to refresh</span>';
    document.body.appendChild(indicator);

    return indicator;
  };

  const initPullToRefresh = () => {
    if (!window.matchMedia("(max-width: 960px)").matches) return;

    const indicator = ensureIndicator();
    const label = indicator.querySelector(".site-pull-refresh-label");
    const threshold = 82;
    const maxPull = 124;

    let startX = 0;
    let startY = 0;
    let pullDistance = 0;
    let tracking = false;
    let verticalPull = false;
    let refreshing = false;

    const reset = () => {
      tracking = false;
      verticalPull = false;
      pullDistance = 0;
      indicator.classList.remove("is-pulling", "is-ready");
      indicator.style.transform = "translate3d(-50%,-72px,0)";
      indicator.style.setProperty("--pull-rotation", "0deg");
      if (label) label.textContent = "Pull to refresh";
    };

    document.addEventListener("touchstart", event => {
      if (refreshing || event.touches.length !== 1 || window.scrollY > 1) return;

      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      tracking = true;
      verticalPull = false;
      pullDistance = 0;
    }, { passive: true });

    document.addEventListener("touchmove", event => {
      if (!tracking || refreshing || event.touches.length !== 1) return;

      const touch = event.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (!verticalPull) {
        if (dy <= 0) {
          reset();
          return;
        }

        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
          if (dy < Math.abs(dx) * 1.2) {
            reset();
            return;
          }
          verticalPull = true;
        } else {
          return;
        }
      }

      if (window.scrollY > 1 || dy <= 0) {
        reset();
        return;
      }

      event.preventDefault();

      pullDistance = Math.min(maxPull, dy * 0.58);
      const progress = Math.min(1, pullDistance / threshold);
      const y = -72 + (pullDistance * 0.86);

      indicator.classList.add("is-pulling");
      indicator.classList.toggle("is-ready", pullDistance >= threshold);
      indicator.style.transform = `translate3d(-50%,${y}px,0)`;
      indicator.style.setProperty("--pull-rotation", `${Math.round(progress * 250)}deg`);

      if (label) {
        label.textContent = pullDistance >= threshold
          ? "Release to refresh"
          : "Pull to refresh";
      }
    }, { passive: false });

    const finishPull = () => {
      if (!tracking || refreshing) return;

      if (verticalPull && pullDistance >= threshold) {
        refreshing = true;
        tracking = false;
        indicator.classList.remove("is-pulling", "is-ready");
        indicator.classList.add("is-refreshing");
        indicator.style.transform = "translate3d(-50%,10px,0)";
        if (label) label.textContent = "Refreshing";

        window.setTimeout(() => {
          const url = new URL(window.location.href);
          url.searchParams.set("_cb", Date.now().toString(36));
          window.location.replace(url.toString());
        }, 260);
        return;
      }

      reset();
    };

    document.addEventListener("touchend", finishPull, { passive: true });
    document.addEventListener("touchcancel", reset, { passive: true });
  };

  const initMobileSiteNavigation = () => {
    document.querySelectorAll(".mobile-site-nav").forEach(menu => {
      const toggle = menu.querySelector("summary");

      menu.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => { menu.open = false; });
      });

      document.addEventListener("pointerdown", event => {
        if (menu.open && !menu.contains(event.target)) menu.open = false;
      });

      menu.addEventListener("keydown", event => {
        if (event.key === "Escape" && menu.open) {
          menu.open = false;
          toggle?.focus();
        }
      });
    });
  };

  const init = () => {
    applyCacheBust();
    initPullToRefresh();
    initMobileSiteNavigation();

    if (CACHE_BUST) {
      window.setTimeout(() => {
        const cleanUrl = new URL(window.location.href);
        cleanUrl.searchParams.delete("_cb");
        window.history.replaceState({}, "", cleanUrl.toString());
      }, 700);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();