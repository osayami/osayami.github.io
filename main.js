/* =========================
   Utility helpers
   ========================= */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) =>
    Array.from(scope.querySelectorAll(selector));

/* =========================
   Active navigation state
   ========================= */
(function setActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop().toLowerCase();
    $$("nav a").forEach(link => {
        const href = link.getAttribute("href").toLowerCase();
        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            link.setAttribute("aria-current", "page");
        }
    });
})();

/* =========================
   Smooth scroll for in-page links
   ========================= */
$$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        const targetId = anchor.getAttribute("href");
        const target = $(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
    });
});

/* =========================
   Intro fade-in animation
   ========================= */
(function introFadeIn() {
    const intro = $("#intro");
    if (!intro) return;

    intro.style.opacity = "0";
    intro.style.transform = "translateY(16px)";

    requestAnimationFrame(() => {
        intro.style.transition = "opacity 600ms ease, transform 600ms ease";
        intro.style.opacity = "1";
        intro.style.transform = "translateY(0)";
    });
})();

/* =========================
   Project card hover (keyboard-safe)
   ========================= */
$$("#projects li").forEach(card => {
    card.setAttribute("tabindex", "0");

    card.addEventListener("focus", () => {
        card.classList.add("is-focused");
    });

    card.addEventListener("blur", () => {
        card.classList.remove("is-focused");
    });
});

/* =========================
   Footer year auto-update
   ========================= */
(function updateFooterYear() {
    const footer = $("footer");
    if (!footer) return;

    const year = new Date().getFullYear();
    footer.innerHTML = footer.innerHTML.replace(/\d{4}/, year);
})();
/* =========================
   Hamburger menu logic
   ========================= */
(function hamburgerMenu() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector("#nav-menu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";

        toggle.setAttribute("aria-expanded", String(!isOpen));
        menu.classList.toggle("open");
    });

    // Close menu on Escape
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && menu.classList.contains("open")) {
            menu.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.focus();
        }
    });

    // Close menu when clicking a link (mobile UX)
    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
})();
