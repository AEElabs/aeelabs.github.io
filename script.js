/* =============================================
   AEE Labs — Professional Engineering Website
   Master JavaScript
   ============================================= */

/**
 * Features:
 * - Mobile navigation menu toggle
 * - Smooth scrolling for anchor links
 * - Active navigation link highlighting via Intersection Observer
 * - Sticky header shadow on scroll
 * - Back-to-top button visibility toggle
 * - Fade-in animations on scroll using Intersection Observer
 * - Contact form validation
 */

document.addEventListener('DOMContentLoaded', function () {

    /* ────────────────────────────────────
       DOM Element References
       ──────────────────────────────────── */
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const allNavLinks = document.querySelectorAll('.nav__link');
    const fadeElements = document.querySelectorAll(
        '.about__card, .service-card, .software-card, .project-card, .why-us-card, .founder__grid, .capability-tag'
    );

    /* ────────────────────────────────────
       1. MOBILE NAVIGATION TOGGLE
       ──────────────────────────────────── */
    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            const isOpen = nav.classList.contains('nav--open');
            if (isOpen) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        // Close mobile nav when a link is clicked
        allNavLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                if (nav.classList.contains('nav--open')) {
                    closeMobileNav();
                }
            });
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);
            if (
                nav.classList.contains('nav--open') &&
                !isClickInsideNav &&
                !isClickOnToggle
            ) {
                closeMobileNav();
            }
        });

        // Close mobile nav on Escape key
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && nav.classList.contains('nav--open')) {
                closeMobileNav();
                navToggle.focus();
            }
        });
    }

    function openMobileNav() {
        nav.classList.add('nav--open');
        navToggle.classList.add('nav-toggle--active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        nav.classList.remove('nav--open');
        navToggle.classList.remove('nav-toggle--active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    /* ────────────────────────────────────
       2. STICKY HEADER SHADOW ON SCROLL
       ──────────────────────────────────── */
    function handleHeaderScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 10) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }

    /* ────────────────────────────────────
       3. BACK-TO-TOP BUTTON
       ──────────────────────────────────── */
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('back-to-top--visible');
        } else {
            backToTop.classList.remove('back-to-top--visible');
        }
    }

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Throttled scroll handler for performance
    let scrollTicking = false;
    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            window.requestAnimationFrame(function () {
                handleHeaderScroll();
                handleBackToTop();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    /* ────────────────────────────────────
       4. ACTIVE NAV LINK HIGHLIGHTING
       Using Intersection Observer
       ──────────────────────────────────── */
    const sectionIds = ['home', 'about', 'services', 'portfolio', 'contact'];
    const sectionElements = sectionIds
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);

    if (sectionElements.length > 0 && allNavLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px -50% 0px',
            threshold: 0
        };

        const navObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const activeId = entry.target.id;
                    setActiveNavLink(activeId);
                }
            });
        }, observerOptions);

        sectionElements.forEach(function (section) {
            navObserver.observe(section);
        });

        // Fallback: update on scroll for better accuracy
        function updateActiveOnScroll() {
            let currentSection = 'home';
            sectionElements.forEach(function (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 120) {
                    currentSection = section.id;
                }
            });
            setActiveNavLink(currentSection);
        }

        window.addEventListener('scroll', function () {
            if (!scrollTicking) {
                window.requestAnimationFrame(function () {
                    updateActiveOnScroll();
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        });
    }

    function setActiveNavLink(activeId) {
        allNavLinks.forEach(function (link) {
            link.classList.remove('nav__link--active');
            const href = link.getAttribute('href');
            if (href === '#' + activeId) {
                link.classList.add('nav__link--active');
            }
        });
    }

    /* ────────────────────────────────────
       5. FADE-IN ANIMATIONS ON SCROLL
       Using Intersection Observer
       ──────────────────────────────────── */
    if (fadeElements.length > 0) {
        fadeElements.forEach(function (el) {
            el.classList.add('fade-in');
        });

        const fadeObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in--visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.1
        });

        fadeElements.forEach(function (el) {
            fadeObserver.observe(el);
        });
    }

    /* ────────────────────────────────────
       6. SMOOTH SCROLLING FOR ANCHOR LINKS
       (CSS handles native smooth scrolling; no JS needed here)
       ──────────────────────────────────── */

    /* ────────────────────────────────────
       7. CONTACT FORM VALIDATION
       ──────────────────────────────────── */
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const descriptionInput = document.getElementById('description');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const descriptionError = document.getElementById('descriptionError');
        const formSuccess = document.getElementById('formSuccess');

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Reset previous errors
            resetFormErrors();
            hideFormSuccess();

            let isValid = true;

            // Validate Name
            if (!nameInput.value.trim()) {
                showError(nameInput, nameError, 'Please enter your full name.');
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                showError(nameInput, nameError, 'Name must be at least 2 characters.');
                isValid = false;
            }

            // Validate Email
            if (!emailInput.value.trim()) {
                showError(emailInput, emailError, 'Please enter your email address.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, emailError, 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate Description
            if (!descriptionInput.value.trim()) {
                showError(descriptionInput, descriptionError, 'Please describe your project requirements.');
                isValid = false;
            } else if (descriptionInput.value.trim().length < 10) {
                showError(descriptionInput, descriptionError, 'Please provide at least 10 characters.');
                isValid = false;
            }

            if (isValid) {
                // Simulate successful submission
                showFormSuccess();
                contactForm.reset();
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Hide success message after 8 seconds
                setTimeout(function () {
                    hideFormSuccess();
                }, 8000);
            }
        });

        // Real-time error clearing on input
        [nameInput, emailInput, descriptionInput].forEach(function (input) {
            if (!input) return;
            input.addEventListener('input', function () {
                var errorEl = document.getElementById(input.id + 'Error');
                clearError(input, errorEl);
            });
        });
    }

    function showError(inputElement, errorElement, message) {
        inputElement.parentElement.classList.add('form-group--error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('form-error--visible');
        }
    }

    function clearError(inputElement, errorElement) {
        inputElement.parentElement.classList.remove('form-group--error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('form-error--visible');
        }
    }

    function resetFormErrors() {
        var errorElements = contactForm.querySelectorAll('.form-error--visible');
        errorElements.forEach(function (el) {
            el.textContent = '';
            el.classList.remove('form-error--visible');
        });
        var errorGroups = contactForm.querySelectorAll('.form-group--error');
        errorGroups.forEach(function (el) {
            el.classList.remove('form-group--error');
        });
    }

    function showFormSuccess() {
        var successEl = document.getElementById('formSuccess');
        if (successEl) {
            successEl.style.display = 'block';
        }
    }

    function hideFormSuccess() {
        var successEl = document.getElementById('formSuccess');
        if (successEl) {
            successEl.style.display = 'none';
        }
    }

    function isValidEmail(email) {
        // RFC 5322 compliant pattern
        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(email);
    }

    /* ────────────────────────────────────
       8. INITIALIZATION
       ──────────────────────────────────── */
    handleHeaderScroll();
    handleBackToTop();

    // Set initial active nav link
    if (allNavLinks.length > 0) {
        var initialActive = allNavLinks[0];
        if (initialActive) {
            initialActive.classList.add('nav__link--active');
        }
    }

    console.log('AEE Labs — Website initialized successfully.');
});
