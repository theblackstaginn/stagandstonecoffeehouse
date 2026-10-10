(() => {
"use strict";
const form = document.getElementById("newsletterForm");
if (!form) return;
const URL = "https://lpjpuedylongafgqbwjh.supabase.co/functions/v1/stag-stone-newsletter-subscribe";
const ANON_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwanB1ZWR5bG9uZ2FmZ3Fid2poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwNDU5MDIsImV4cCI6MjEwNTYyMTkwMn0.d6NsNeOpYIwzu8l1NBEjIoty_07Go-46_-WGh2Z8ZOc";
const status = document.getElementById("newsletterStatus");
const button = document.getElementById("newsletterSubmit");
const email = document.getElementById("newsletterEmail");
const consent = document.getElementById("newsletterConsent");
const honeypot = document.getElementById("newsletterWebsite");
form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  button.disabled = true;
  button.textContent = "Joining...";
  status.textContent = "Saving your signup...";
  status.dataset.state = "loading";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(URL, {
      method: "POST",
      mode: "cors",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        apikey: ANON_PUBLIC_KEY,
        Authorization: "Bearer " + ANON_PUBLIC_KEY
      },
      body: JSON.stringify({
        email: email.value.trim(),
        consent: consent.checked,
        website: honeypot.value
      }),
      signal: controller.signal
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok !== true) {
      throw new Error(result.message || "We couldn't save your signup. Please try again.");
    }
    form.reset();
    status.textContent = result.message || "You're on the list!";
    status.dataset.state = "success";
  } catch (error) {
    status.textContent = error.name === "AbortError"
      ? "The request took too long. Please try again."
      : error.message || "Signup is unavailable. Please try again.";
    status.dataset.state = "error";
  } finally {
    clearTimeout(timeout);
    button.disabled = false;
    button.textContent = "Join the List";
  }
});
})();