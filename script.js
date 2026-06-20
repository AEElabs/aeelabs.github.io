/* =============================================
   AEE Labs — Professional Engineering Website
   Optimized JavaScript (script.js)
   ============================================= */

/**
 * All functionality is wrapped in a DOMContentLoaded listener
 * to ensure the DOM is fully parsed before any manipulation.
 */
document.addEventListener('DOMContentLoaded', () => {

    /* ────────────────────────────────────────
       DOM Element References
       ──────────────────────────────────────── */
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const allNavLinks = document.querySelectorAll('.nav__link');
    
    // Elements that will fade in on scroll
    const fadeElements = document.querySelectorAll(
        '.about__card, .service-card, .software-card, .project-card, .why-us-card, .founder__grid, .capability-tag'
    );

    /* ────────────────────────────────────────
       1. MOBILE NAVIGATION
       ──────────────────────────────────────── */
    function openMobileNav() {
        nav.classList.add('nav--open');
        navToggle.classList.add('nav-toggle--active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    function closeMobileNav() {
        nav.classList.remove('nav--open');
        navToggle.classList.remove('nav-toggle--active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (navToggle && nav) {
        // Toggle menu on button click
        navToggle.addEventListener('click', () => {
            nav.classList.contains('nav--open') ? closeMobileNav() : openMobileNav();
        });

        // Close menu when any nav link is clicked
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('nav--open')) closeMobileNav();
            });
        });

        // Close menu when clicking outside the navigation
        document.addEventListener('click', (e) => {
            if (
                nav.classList.contains('nav--open') &&
                !nav.contains(e.target) &&
                !navToggle.contains(e.target)
            ) {
                closeMobileNav();
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
                closeMobileNav();
                navToggle.focus();
            }
        });

        // Close mobile menu if window is resized above mobile breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && nav.classList.contains('nav--open')) {
                closeMobileNav();
            }
        });
    }

    /* ────────────────────────────────────────
       2. SCROLL-DEPENDENT UI UPDATES
       (Header shadow, back-to-top, active nav)
       ──────────────────────────────────────── */
    let ticking = false;

    function updateOnScroll() {
        const scrollY = window.scrollY;

        // Sticky header shadow
        if (scrollY > 10) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        // Back-to-top button visibility
        if (scrollY > 500) {
            backToTop.classList.add('back-to-top--visible');
        } else {
            backToTop.classList.remove('back-to-top--visible');
        }

        // Active navigation link (fallback for older browsers)
        updateActiveNavLink(scrollY);
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Back-to-top click handler
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /**
     * Fallback function to highlight the current section's nav link.
     * Intersection Observer is the primary method (see below),
     * but this ensures cross-browser compatibility.
     */
    function updateActiveNavLink(scrollY) {
        const sections = document.querySelectorAll('section[id]');
        let currentId = 'home';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrollY >= sectionTop) {
                currentId = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('nav__link--active');
            }
        });
    }

    /* ────────────────────────────────────────
       3. INTERSECTION OBSERVER FOR ACTIVE NAV
       (Primary method – more accurate)
       ──────────────────────────────────────── */
    const sectionElements = document.querySelectorAll('section[id]');
    if (sectionElements.length > 0 && allNavLinks.length > 0) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.id;
                    allNavLinks.forEach(link => {
                        link.classList.remove('nav__link--active');
                        if (link.getAttribute('href') === `#${activeId}`) {
                            link.classList.add('nav__link--active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-80px 0px -50% 0px',
            threshold: 0
        });

        sectionElements.forEach(section => navObserver.observe(section));
    }

    /* ────────────────────────────────────────
       4. FADE-IN ANIMATIONS ON SCROLL
       ──────────────────────────────────────── */
    if (fadeElements.length > 0) {
        fadeElements.forEach(el => el.classList.add('fade-in'));

        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in--visible');
                    fadeObserver.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.1
        });

        fadeElements.forEach(el => fadeObserver.observe(el));
    }

    /* ────────────────────────────────────────
       5. CONTACT FORM VALIDATION
       ──────────────────────────────────────── */
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const descriptionInput = document.getElementById('description');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const descriptionError = document.getElementById('descriptionError');
        const formSuccess = document.getElementById('formSuccess');

        // Helper functions
        const showError = (input, errorEl, message) => {
            input.parentElement.classList.add('form-group--error');
            if (errorEl) {
                errorEl.textContent = message;
                errorEl.classList.add('form-error--visible');
            }
        };

        const clearError = (input, errorEl) => {
            input.parentElement.classList.remove('form-group--error');
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.remove('form-error--visible');
            }
        };

        const resetFormErrors = () => {
            document.querySelectorAll('.form-error--visible').forEach(el => {
                el.textContent = '';
                el.classList.remove('form-error--visible');
            });
            document.querySelectorAll('.form-group--error').forEach(el => {
                el.classList.remove('form-group--error');
            });
        };

        const showFormSuccess = () => {
            if (formSuccess) formSuccess.style.display = 'block';
        };

        const hideFormSuccess = () => {
            if (formSuccess) formSuccess.style.display = 'none';
        };

        const isValidEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        // Real‑time error clearing
        [nameInput, emailInput, descriptionInput].forEach(input => {
            if (!input) return;
            input.addEventListener('input', () => {
                const errorEl = document.getElementById(input.id + 'Error');
                clearError(input, errorEl);
            });
        });

        // Form submission handler
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            resetFormErrors();
            hideFormSuccess();

            let isValid = true;

            // Name validation
            if (!nameInput.value.trim()) {
                showError(nameInput, nameError, 'Please enter your full name.');
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                showError(nameInput, nameError, 'Name must be at least 2 characters.');
                isValid = false;
            }

            // Email validation
            if (!emailInput.value.trim()) {
                showError(emailInput, emailError, 'Please enter your email address.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, emailError, 'Please enter a valid email address.');
                isValid = false;
            }

            // Description validation
            if (!descriptionInput.value.trim()) {
                showError(descriptionInput, descriptionError, 'Please describe your project requirements.');
                isValid = false;
            } else if (descriptionInput.value.trim().length < 10) {
                showError(descriptionInput, descriptionError, 'Please provide at least 10 characters.');
                isValid = false;
            }

            if (isValid) {
                showFormSuccess();
                contactForm.reset();
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(hideFormSuccess, 8000);
            }
        });
    }

    /* ────────────────────────────────────────
       6. INITIAL STATE
       ──────────────────────────────────────── */
    // Trigger initial scroll calculations
    updateOnScroll();

    // Set home link active by default
    if (allNavLinks.length > 0) {
        allNavLinks[0].classList.add('nav__link--active');
    }

    console.log('AEE Labs – All systems ready.');
});
