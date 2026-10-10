(() => {
  "use strict";

  const catalog = window.STAG_STONE_CATALOG;
  if (!catalog) return;

  const CACHE_BUST = window.__STAG_CACHE_BUST__ || "";
  const bustUrl = source => {
    if (!CACHE_BUST || !source) return source;
    try {
      const url = new URL(source, window.location.href);
      url.searchParams.set("_cb", CACHE_BUST);
      return url.href;
    } catch {
      const joiner = source.includes("?") ? "&" : "?";
      return source + joiner + "_cb=" + encodeURIComponent(CACHE_BUST);
    }
  };

  if (CACHE_BUST) {
    document.documentElement.style.setProperty(
      "--menu-bg-texture",
      `url("${bustUrl("https://stagandstonecoffee.com/assets/menu-page-bg.webp")}")`
    );
    document.documentElement.style.setProperty(
      "--active-copper-texture",
      `url("${bustUrl("https://raw.githubusercontent.com/theblackstaginn/Stag-menu/main/Assets/stag-menu-copper-texture.webp")}")`
    );
    document.documentElement.style.setProperty(
      "--menu-charcoal-texture",
      `url("${bustUrl("https://stagandstonecoffee.com/assets/menu-charcoal-texture.webp")}")`
    );
  }

  const $ = selector => document.querySelector(selector);
  const els = {
    categories: $("#categoryList"), grid: $("#productGrid"),
    eyebrow: $("#categoryEyebrow"), title: $("#categoryTitle"), note: $("#categoryNote"),
    fulfillment: $("#fulfillmentControl"), orderCount: $("#orderCount"),
    orderLines: $("#orderLines"), orderEmpty: $("#orderEmpty"), reviewBtn: $("#reviewBtn"),
    clearBtn: $("#clearOrderBtn"), orderPill: $("#orderPill"),
    itemSheet: $("#itemSheet"), itemImage: $("#itemImage"), itemCategory: $("#itemCategory"),
    itemName: $("#itemName"), itemDescription: $("#itemDescription"), modifierHost: $("#modifierHost"),
    specialRequest: $("#specialRequest"), qty: $("#qtyValue"),
    addBtn: $("#addToOrderBtn"), reviewSheet: $("#reviewSheet"), reviewList: $("#reviewList"),
    reviewMode: $("#reviewMode")
  };

  const STORAGE_KEY = "stag-stone-kiosk-order-v2";
  const MODE_KEY = "stag-stone-kiosk-mode-v2";
  const WEBAPP_PROMO_KEY = "stag-stone-webapp-promo-dismissed-at";
  const WEBAPP_PROMO_SNOOZE_MS = 2 * 24 * 60 * 60 * 1000;

  const webappPromoOverlay = $("#webappPromoOverlay");
  const webappPromo = $(".webapp-promo");
  const webappPromoLink = $(".webapp-promo-button");
  const webappPromoClose = $("#webappPromoClose");

  const promoWasRecentlyDismissed = () => {
    try {
      const dismissedAt = Number(localStorage.getItem(WEBAPP_PROMO_KEY));
      return dismissedAt > 0 && Date.now() - dismissedAt < WEBAPP_PROMO_SNOOZE_MS;
    } catch {
      return false;
    }
  };

  const rememberPromoDismissal = () => {
    try {
      localStorage.setItem(WEBAPP_PROMO_KEY, String(Date.now()));
    } catch {}
  };

  const hideWebappPromo = (remember = false) => {
    if (!webappPromoOverlay) return;
    if (remember) rememberPromoDismissal();
    webappPromoOverlay.classList.remove("is-visible");
    window.setTimeout(() => {
      if (!webappPromoOverlay.classList.contains("is-visible")) {
        webappPromoOverlay.hidden = true;
      }
    }, 180);
  };

  const showWebappPromo = () => {
    if (!webappPromoOverlay || promoWasRecentlyDismissed()) return;
    webappPromoOverlay.hidden = false;
    window.requestAnimationFrame(() => {
      webappPromoOverlay.classList.add("is-visible");
      webappPromoClose?.focus({ preventScroll: true });
    });
  };

  if (webappPromoOverlay && !promoWasRecentlyDismissed()) {
    window.setTimeout(showWebappPromo, 1200);
  }

  webappPromoClose?.addEventListener("click", () => hideWebappPromo(true));

  webappPromoOverlay?.addEventListener("click", event => {
    if (event.target === webappPromoOverlay) hideWebappPromo(true);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && webappPromoOverlay?.classList.contains("is-visible")) {
      hideWebappPromo(true);
    }
  });

  if (webappPromoLink) {
    webappPromoLink.addEventListener("click", () => {
      rememberPromoDismissal();
    });
  }

  const safeRead = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  };

  let state = {
    categoryId: catalog.categories[0]?.id,
    serviceMode: localStorage.getItem(MODE_KEY) || catalog.serviceModes[0]?.id,
    order: safeRead(STORAGE_KEY, []),
    selectedItemId: null,
    quantity: 1
  };

  const getItem = id => catalog.items.find(item => item.id === id);
  const getCategory = id => catalog.categories.find(category => category.id === id);
  const saveOrder = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state.order));

  function renderFulfillment() {
    els.fulfillment.innerHTML = "";
    catalog.serviceModes.forEach(mode => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = mode.id === state.serviceMode ? "active" : "";
      button.textContent = mode.label;
      button.addEventListener("click", () => {
        state.serviceMode = mode.id;
        localStorage.setItem(MODE_KEY, mode.id);
        renderFulfillment();
      });
      els.fulfillment.appendChild(button);
    });
  }

  function renderCategories() {
    els.categories.innerHTML = "";
    catalog.categories.forEach(category => {
      const count = catalog.items.filter(item => item.categoryId === category.id && item.available).length;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "category-btn" + (category.id === state.categoryId ? " active" : "");
      button.innerHTML = `<span>${category.shortName}</span><small>${category.countLabel || count + " offerings"}</small>`;
      button.addEventListener("click", () => {
        state.categoryId = category.id;
        renderCategories();
        renderProducts();
        document.querySelector(".menu-stage")?.scrollTo({ top: 0, behavior: "smooth" });
      });
      els.categories.appendChild(button);
    });
  }

  function renderProducts() {
    const category = getCategory(state.categoryId);
    if (!category) return;

    els.eyebrow.textContent = category.eyebrow;
    els.title.textContent = category.name;
    els.note.textContent = category.note;
    els.grid.innerHTML = "";

    catalog.items
      .filter(item => item.categoryId === category.id && item.available)
      .forEach(item => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "product-card" + (item.hero ? " product-card--hero" : "") + (item.cardVariant === "soda" ? " product-card--soda" : "");
        button.setAttribute("aria-label", "Choose " + item.name);
        button.innerHTML = `
          <span class="product-image">
            <img src="${bustUrl(item.image)}" alt="" loading="lazy">
            ${item.seasonal ? '<span class="seasonal-tag">Seasonal</span>' : ""}
          </span>
          <span class="product-meta">
            <strong class="product-name">${item.name}</strong>
            <span class="product-hint">${item.cardHint || (item.price == null ? "Tap to customize" : formatMoney(item.price))}</span>
          </span>`;
        button.addEventListener("click", () => openItem(item.id));
        els.grid.appendChild(button);
      });
  }

  function openItem(id) {
    const item = getItem(id);
    const category = getCategory(item?.categoryId);
    if (!item) return;

    state.selectedItemId = id;
    state.quantity = 1;
    els.qty.textContent = "1";
    els.itemImage.src = bustUrl(item.image);
    els.itemImage.alt = item.name;
    els.itemCategory.textContent = category?.name || "";
    els.itemName.textContent = item.categoryId === "soda" ? "Choose Your Bottle" : item.name;
    els.itemDescription.textContent = item.description || "From the Stag & Stone menu";
    // The soda selector already has the only copy it needs in its fieldset.
    // Hide the duplicate modal header and description; restore them for other items.
    const isSoda = item.categoryId === "soda";
    [els.itemCategory, els.itemName, els.itemDescription].forEach(element => {
      element.style.display = isSoda ? "none" : "";
    });
    els.specialRequest.value = "";
    // Bottled soda selections do not need a special-requests field.
    // Restore the field when opening any other menu item.
    const specialRequestField = els.specialRequest.closest(".special-request-field");
    if (specialRequestField) {
      specialRequestField.style.display = item.categoryId === "soda" ? "none" : "";
    }
    renderModifiers(item);
    els.itemSheet.showModal();
  }

  function renderModifiers(item) {
    els.modifierHost.innerHTML = "";
    els.modifierHost.onchange = null;
    els.addBtn.disabled = false;
    els.addBtn.textContent = "Add to Order";

    if (!item.variations.length && !item.modifierGroups.length) {
      const placeholder = document.createElement("div");
      placeholder.className = "modifier-placeholder";
      placeholder.innerHTML = "<strong>Just as it is</strong>No additional selections needed for this item.";
      els.modifierHost.appendChild(placeholder);
      return;
    }

    item.modifierGroups.forEach(group => {
      const block = document.createElement("fieldset");
      block.className = "modifier-group";
      block.innerHTML = `
        <legend>${group.name}</legend>
        ${group.note ? `<p class="modifier-group-note">${group.note}</p>` : ""}
      `;

      group.options.forEach(option => {
        const label = document.createElement("label");
        label.className = "modifier-option";
        label.innerHTML = `
          <input
            type="${group.maxSelections === 1 ? "radio" : "checkbox"}"
            name="${group.id}"
            value="${option.id}"
            data-group-id="${group.id}"
          >
          <span class="modifier-option-copy">
            <strong>${option.name}</strong>
            ${option.seasonal ? '<small>Seasonal</small>' : ""}
          </span>
          <span class="modifier-option-price">${option.price ? "+" + formatMoney(option.price) : ""}</span>
        `;
        block.appendChild(label);
      });

      els.modifierHost.appendChild(block);
    });

    const requiredGroups = item.modifierGroups.filter(group => group.required);
    if (requiredGroups.length) {
      const updateRequiredSelections = () => {
        const selected = Array.from(els.modifierHost.querySelectorAll("input:checked"));
        const complete = requiredGroups.every(group =>
          selected.some(input => input.dataset.groupId === group.id)
        );
        els.addBtn.disabled = !complete;
        els.addBtn.textContent = complete ? "Add to Order" : (item.requiredAction || "Choose an Option");
      };
      els.modifierHost.onchange = updateRequiredSelections;
      updateRequiredSelections();
    }
  }

  function readSelectedModifiers(item) {
    const selected = [];
    const groups = new Map(item.modifierGroups.map(group => [group.id, group]));

    els.modifierHost.querySelectorAll("input:checked").forEach(input => {
      const group = groups.get(input.dataset.groupId);
      const option = group?.options.find(candidate => candidate.id === input.value);
      if (!group || !option) return;

      selected.push({
        groupId: group.id,
        optionId: option.id,
        name: option.name,
        price: option.price || 0
      });
    });

    return selected;
  }

  function modifierSignature(modifiers = []) {
    return modifiers
      .map(modifier => modifier.optionId)
      .sort()
      .join("|");
  }

  function addSelectedItem() {
    const item = getItem(state.selectedItemId);
    if (!item) return;

    const modifiers = readSelectedModifiers(item);
    if (item.modifierGroups.some(group => group.required && !modifiers.some(modifier => modifier.groupId === group.id))) return;
    const specialRequest = els.specialRequest.value.trim().slice(0, 240);
    const signature = modifierSignature(modifiers);
    const existing = state.order.find(line =>
      line.itemId === item.id &&
      modifierSignature(line.modifiers) === signature &&
      (line.specialRequest || "") === specialRequest
    );

    if (existing) existing.quantity += state.quantity;
    else state.order.push({
      lineId: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36),
      itemId: item.id,
      quantity: state.quantity,
      variationId: null,
      modifiers,
      specialRequest
    });

    saveOrder();
    renderOrder();
    els.itemSheet.close();
  }

  function renderOrder() {
    const count = state.order.reduce((sum, line) => sum + line.quantity, 0);
    els.orderCount.textContent = count;
    els.orderLines.innerHTML = "";

    state.order.forEach(line => {
      const item = getItem(line.itemId);
      if (!item) return;
      const row = document.createElement("div");
      row.className = "order-line";
      const modifierText = (line.modifiers || []).map(modifier => modifier.name).join(", ");
      const details = [getCategory(item.categoryId)?.shortName || "", modifierText].filter(Boolean).join(" • ");
      row.innerHTML = `<div class="order-line-details"><strong>${line.quantity} × ${item.name}</strong><small>${details}</small></div><button type="button" aria-label="Remove ${item.name}">×</button>`;
      if (line.specialRequest) {
        const note = document.createElement("small");
        note.className = "order-line-note";
        note.textContent = "Request: " + line.specialRequest;
        row.querySelector(".order-line-details").appendChild(note);
      }
      row.querySelector("button").addEventListener("click", () => removeLine(line.lineId));
      els.orderLines.appendChild(row);
    });

    els.orderEmpty.hidden = count > 0;
    els.reviewBtn.disabled = count === 0;
    els.clearBtn.disabled = count === 0;
  }

  function removeLine(lineId) {
    state.order = state.order.filter(line => line.lineId !== lineId);
    saveOrder();
    renderOrder();

    if (els.reviewSheet.open) {
      if (!state.order.length) {
        els.reviewSheet.close();
      } else {
        renderReview();
      }
    }
  }

  function clearOrder() {
    state.order = [];
    saveOrder();
    renderOrder();
  }

  function renderReview() {
    els.reviewList.innerHTML = "";

    state.order.forEach(line => {
      const item = getItem(line.itemId);
      if (!item) return;

      const row = document.createElement("div");
      row.className = "review-item";
      const modifierText = (line.modifiers || []).map(modifier => modifier.name).join(", ");
      row.innerHTML = `
        <div class="review-item-copy">
          <div class="review-item-description"><strong>${item.name}</strong></div>
          <span>× ${line.quantity}${modifierText ? " • " + modifierText : ""}</span>
        </div>
        <button class="review-remove" type="button" aria-label="Remove ${item.name} from order">Remove</button>
      `;
      if (line.specialRequest) {
        const note = document.createElement("small");
        note.className = "review-item-note";
        note.textContent = "Request: " + line.specialRequest;
        row.querySelector(".review-item-description").appendChild(note);
      }

      row.querySelector(".review-remove").addEventListener("click", () => removeLine(line.lineId));
      els.reviewList.appendChild(row);
    });

    const mode = catalog.serviceModes.find(mode => mode.id === state.serviceMode);
    els.reviewMode.textContent = "Order type: " + (mode?.label || "Dine In");
  }

  function openReview() {
    if (!state.order.length) return;
    renderReview();
    if (!els.reviewSheet.open) els.reviewSheet.showModal();
  }

  function formatMoney(amount) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: catalog.currency }).format(amount);
  }

  $("#qtyDown").addEventListener("click", () => {
    state.quantity = Math.max(1, state.quantity - 1);
    els.qty.textContent = state.quantity;
  });
  $("#qtyUp").addEventListener("click", () => {
    state.quantity += 1;
    els.qty.textContent = state.quantity;
  });
  $("#itemCloseBtn").addEventListener("click", () => els.itemSheet.close());
  $("#reviewCloseBtn").addEventListener("click", () => els.reviewSheet.close());
  els.addBtn.addEventListener("click", addSelectedItem);
  els.clearBtn.addEventListener("click", clearOrder);
  els.reviewBtn.addEventListener("click", openReview);
  els.orderPill.addEventListener("click", openReview);
  $("#homeBtn").addEventListener("click", () => {
    window.location.href = "https://stagandstonecoffee.com/";
  });
  $("#sourceBtn").addEventListener("click", () => {
    window.location.href = "https://stagandstonecoffee.com/";
  });
  els.itemSheet.addEventListener("click", event => {
    if (event.target === els.itemSheet) els.itemSheet.close();
  });
  els.reviewSheet.addEventListener("click", event => {
    if (event.target === els.reviewSheet) els.reviewSheet.close();
  });

  function initPullToRefresh() {
    const indicator = $("#pullRefresh");
    if (!indicator || !window.matchMedia("(max-width: 960px)").matches) return;

    const label = indicator.querySelector(".pull-refresh-label");
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
      if (refreshing || event.touches.length !== 1) return;
      if (window.scrollY > 1) return;
      if (els.itemSheet.open || els.reviewSheet.open) return;

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
  }

  initPullToRefresh();

  renderFulfillment();
  renderCategories();
  renderProducts();
  renderOrder();

  if (CACHE_BUST) {
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("_cb");
    window.history.replaceState({}, "", cleanUrl.toString());
  }
})();