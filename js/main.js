/* ==========================================================================
   Breakthrough Author Live — Landing Page Scripts
   ========================================================================== */

/* -----------------------------------------------------------------------
   EDIT ME — Replace these three placeholders before going live.
   Every "Join the Challenge" button and the coupon-code display on the
   page read from this single config object, so you only need to change
   values here.
   ----------------------------------------------------------------------- */
const SITE_CONFIG = {
  // Real checkout link (Stripe Payment Link, GHL checkout URL, etc.)
  CHECKOUT_URL: "https://REPLACE-WITH-YOUR-CHECKOUT-URL.com",
  // Coupon code that drops the price from $950 to $47 at checkout
  COUPON_CODE: "YOURCODE47",
};

(function applyConfig() {
  document.querySelectorAll("[data-checkout-link]").forEach((el) => {
    el.setAttribute("href", SITE_CONFIG.CHECKOUT_URL);
  });
  document.querySelectorAll("[data-coupon-code]").forEach((el) => {
    el.textContent = SITE_CONFIG.COUPON_CODE;
  });
})();

/* -----------------------------------------------------------------------
   Theme toggle — Light / Dark mode
   Preference is stored in localStorage and re-applied on every load.
   The initial theme is set synchronously in an inline <head> script
   (see index.html) to avoid a flash of the wrong theme.
   ----------------------------------------------------------------------- */
(function themeToggle() {
  const STORAGE_KEY = "bal-theme";
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    toggleBtn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    toggleBtn.querySelector(".toggle-label").textContent =
      theme === "dark" ? "Dark" : "Light";
  }

  // Sync button label/state with whatever the inline head script already applied.
  setTheme(currentTheme());

  toggleBtn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    setTheme(next);
  });
})();

/* -----------------------------------------------------------------------
   Mobile quick-nav menu
   ----------------------------------------------------------------------- */
(function quickNav() {
  const menuBtn = document.getElementById("menu-toggle");
  const menuPanel = document.getElementById("quick-nav");
  if (!menuBtn || !menuPanel) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = menuPanel.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  menuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuPanel.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
})();
