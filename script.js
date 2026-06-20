/* ============ script.js ============ */
/* AEE Labs - Premium Engineering Website Interactivity */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Loading Screen ----------
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 2000);
  });

  // ---------- Custom Cursor ----------
  const cursor = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('cursor-dot');
  if (cursor && cursorDot && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    });
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
    });
    // Enlarge cursor on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .tilt-effect, .glass-card, input, textarea, select');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '36px';
        cursor.style.height = '36px';
        cursor.style.borderColor = 'var(--pcb-green)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderColor = 'var(--cyan)';
      });
    });
  }

  // ---------- Scroll Progress Bar ----------
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    if (progressBar) progressBar.style.width = scrolled + '%';
  });

  // ---------- Header Scroll Effect ----------
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ---------- Mobile Nav Toggle ----------
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      // Toggle hamburger animation
      navToggle.classList.toggle('open');
    });
    // Close menu on link click
    document.querySelectorAll('.nav-link, .btn-nav').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('open');
      });
    });
  }

  // ---------- Theme Toggle (Dark/Light) ----------
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const getPreferredTheme = () => {
    return localStorage.getItem('theme') || 'dark';
  };
  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };
  applyTheme(getPreferredTheme());
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlElement.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // ---------- Back to Top Button ----------
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Smooth Scroll for Anchor Links (fallback for older browsers) ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Typing Animation ----------
  const typingText = document.getElementById('typing-text');
  if (typingText) {
    const fullText = "Engineering the Future Through Intelligent Hardware Design";
    let charIndex = 0;
    function type() {
      if (charIndex < fullText.length) {
        typingText.textContent += fullText.charAt(charIndex);
        charIndex++;
        setTimeout(type, 50);
      }
    }
    type();
  }

  // ---------- Animated Counters (Intersection Observer) ----------
  const statNumbers = document.querySelectorAll('.stat-number');
  const observerOptions = { threshold: 0.5 };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        if (!el.classList.contains('counted')) {
          animateCounter(el, target);
          el.classList.add('counted');
        }
        counterObserver.unobserve(el);
      }
    });
  }, observerOptions);
  statNumbers.forEach(stat => counterObserver.observe(stat));
  function animateCounter(element, target) {
    let count = 0;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / target));
    const timer = setInterval(() => {
      count += 1;
      element.textContent = count;
      if (count >= target) {
        clearInterval(timer);
        element.textContent = target;
      }
    }, stepTime);
  }

  // ---------- Parallax & Mouse Glow Effect on Hero ----------
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.01;
      const moveY = (clientY - window.innerHeight / 2) * 0.01;
      heroSection.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    });
  }

  // ---------- Floating Components (IC chips, circuit symbols) ----------
  const floatingContainer = document.getElementById('floating-components');
  if (floatingContainer) {
    const icons = [
      'M10 10h12v12H10z', // chip
      'M18 8l4 4-4 4-4-4z', // diamond
      'M6 12h20', // trace
      'M16 4v16', // vertical
      'M4 20l16-16', // diagonal
      'M10 16v-8l4 4 4-4v8', // arrow
    ];
    for (let i = 0; i < 15; i++) {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 32 32");
      svg.setAttribute("width", "30");
      svg.setAttribute("height", "30");
      svg.classList.add("floating-ic");
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", icons[Math.floor(Math.random() * icons.length)]);
      path.setAttribute("stroke", "var(--cyan)");
      path.setAttribute("stroke-width", "2");
      path.setAttribute("fill", "none");
      svg.appendChild(path);
      svg.style.left = Math.random() * 90 + '%';
      svg.style.top = Math.random() * 80 + '%';
      svg.style.animationDuration = (Math.random() * 8 + 8) + 's';
      svg.style.animationDelay = Math.random() * 5 + 's';
      floatingContainer.appendChild(svg);
    }
  }

  // ---------- Hero Canvas Particle Animation (PCB traces and signals) ----------
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];
    function resizeCanvas() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = Math.random() * 1.5 - 0.75;
        this.vy = Math.random() * 1.5 - 0.75;
        this.size = Math.random() * 2 + 1;
        this.life = 1;
        this.decay = 0.002;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${this.life})`;
        ctx.fill();
      }
    }
    function initParticles() {
      particles = [];
      for (let i = 0; i < 120; i++) {
        particles.push(new Particle());
      }
    }
    initParticles();
    function drawLines() {
      // Draw PCB-like grid lines
      ctx.strokeStyle = 'rgba(0,229,255,0.05)';
      ctx.lineWidth = 0.5;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${0.1 * (1 - dist/80)})`;
            ctx.stroke();
          }
        }
      }
    }
    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      drawLines();
      particles.forEach(p => {
        p.update();
        p.draw();
        if (p.life <= 0) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.life = 1;
        }
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ---------- Tilt Effect on Cards ----------
  const tiltElements = document.querySelectorAll('.tilt-effect');
  tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // ---------- Intersection Observer for Reveal Animations (AOS-like) ----------
  const revealElements = document.querySelectorAll('.section, .glass-card, .service-card, .project-card, .why-card, .industry-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(el);
  });

  // ---------- FAQ Accordion ----------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ---------- Testimonial Slider ----------
  const track = document.getElementById('testimonial-track');
  const slides = document.querySelectorAll('.testimonial');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dotsContainer = document.getElementById('slider-dots');
  let currentIndex = 0;
  if (track && slides.length > 0) {
    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.slider-dot');
    function updateSlider() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
    }
    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
    }
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    });
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    });
    // Auto-rotate every 6 seconds
    let autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }, 6000);
    const sliderContainer = document.getElementById('testimonial-slider');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
    sliderContainer.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
      }, 6000);
    });
  }

  // ---------- Contact Form Submission ----------
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simple client-side validation
      const requiredInputs = contactForm.querySelectorAll('[required]');
      let valid = true;
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.border = '2px solid red';
        } else {
          input.style.border = '1px solid var(--glass-border)';
        }
      });
      if (!valid) {
        alert('Please fill all required fields.');
        return;
      }
      // Simulate sending
      formSuccess.style.display = 'block';
      contactForm.reset();
      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 4000);
    });
  }

  // ---------- Newsletter Form ----------
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput.value.trim()) {
        alert('Thank you for subscribing!');
        newsletterForm.reset();
      }
    });
  }

  // ---------- Happy Clients Counter (dynamic) ----------
  const happyCount = document.getElementById('happy-count');
  if (happyCount) {
    happyCount.textContent = '50';
  }

  // Performance: lazy load images (if any)
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
});
