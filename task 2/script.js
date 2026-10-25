// Efficient DOM caching using getElementById (O(1)) where possible.
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-links");
const navLinks = navMenu.querySelectorAll("a");

// Toggle navigation for mobile
hamburger.addEventListener("click", () => {
    const isActive = hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    // Accessibility: notify screen readers of state change
    hamburger.setAttribute("aria-expanded", isActive);
});

// Close nav when a link is clicked.
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
    });
});

// Optimized IntersectionObserver for Scroll Reveal
// We exclude already active items to avoid tracking them needlessly
const revealElements = document.querySelectorAll('.reveal:not(.active)');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve instantly to save memory and processing power once revealed
                observer.unobserve(entry.target); 
            }
        });
    }, { 
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before it comes fully into view
        threshold: 0 
    });

    revealElements.forEach(el => revealObserver.observe(el));
} else {
    // Graceful instantaneous fallback for very old browsers
    revealElements.forEach(el => el.classList.add('active'));
}
