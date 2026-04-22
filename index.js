const menuButton = document.getElementById("menu-button");
const siteNav = document.getElementById("site-nav");
const ctaButton = document.getElementById("cta-button");
const revealElements = document.querySelectorAll(".reveal");

if (menuButton && siteNav) {
    menuButton.addEventListener("click", () => {
        const nextExpanded = menuButton.getAttribute("aria-expanded") !== "true";
        menuButton.setAttribute("aria-expanded", String(nextExpanded));
        siteNav.classList.toggle("open", nextExpanded);
    });
}

if (ctaButton) {
    ctaButton.addEventListener("click", (event) => {
        const target = document.getElementById("contact");

        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
}

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("visible"));
}
