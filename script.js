/**
 * Aryan Sharma Portfolio - Interactive Logic & UI Controllers
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Theme Switcher (Dark / Light Mode)
  // -------------------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or use system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'dark'); // default dark

  htmlRoot.setAttribute('data-theme', initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }

  // -------------------------------------------------------------------------
  // 2. Sticky Header & Active Nav Scroll Spy
  // -------------------------------------------------------------------------
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  function handleScroll() {
    const scrollPos = window.scrollY;

    // Header styling on scroll
    if (header) {
      if (scrollPos > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll top button visibility
    if (scrollTopBtn) {
      if (scrollPos > 350) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Active navigation highlight
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // initial check

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // -------------------------------------------------------------------------
  // 3. Mobile Hamburger Menu
  // -------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when any nav item is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // -------------------------------------------------------------------------
  // 4. Typewriter Effect in Hero Subtitle
  // -------------------------------------------------------------------------
  const typewriterElem = document.getElementById('typewriter-text');
  if (typewriterElem) {
    const words = JSON.parse(typewriterElem.getAttribute('data-words') || '[]');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const holdTime = 1800;

    function typeCycle() {
      const currentWord = words[wordIndex] || '';

      if (isDeleting) {
        typewriterElem.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterElem.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeout = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentWord.length) {
        timeout = holdTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timeout = 400;
      }

      setTimeout(typeCycle, timeout);
    }

    if (words.length > 0) {
      setTimeout(typeCycle, 500);
    }
  }

  // -------------------------------------------------------------------------
  // 5. Animated Number Counters for Stats Section
  // -------------------------------------------------------------------------
  const statsSection = document.getElementById('stats');
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  function countUp(element, target, duration = 1600) {
    const start = 0;
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo function
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * (target - start) + start);
      element.textContent = currentVal;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = target;
      }
    }
    requestAnimationFrame(updateCount);
  }

  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'), 10) || 0;
            countUp(num, target);
          });
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  // -------------------------------------------------------------------------
  // 6. Skills Tab Filter & Animated Progress Bars
  // -------------------------------------------------------------------------
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');
  const skillsSection = document.getElementById('skills');

  // Filter skills
  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const category = tab.getAttribute('data-category');

      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // Animate skill bars on scroll
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillCards.forEach(card => card.classList.add('animated'));
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
  }

  // -------------------------------------------------------------------------
  // 7. Projects Filter
  // -------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 250);
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 8. Project Details Modal Data & Controller
  // -------------------------------------------------------------------------
  const projectData = {
    'modal-ai': {
      title: 'Aether AI — Autonomous Analytics & Predictive Engine',
      image: 'assets/project-ai.jpg',
      tags: ['React', 'TypeScript', 'Python', 'FastAPI', 'WebSockets', 'Tailwind'],
      description: 'A cutting-edge deep learning analytics console designed for real-time inference monitoring, automated anomaly detection, and predictive neural network distributions.',
      features: [
        'Sub-50ms live telemetry streaming via bi-directional WebSockets',
        'Dynamic interactive visual graphs with GPU-accelerated canvas charts',
        'Automated alert dispatch when model drift crosses 5% threshold',
        'Role-based permission architecture with enterprise SSO integration'
      ],
      github: 'https://github.com',
      demo: '#'
    },
    'modal-ecommerce': {
      title: 'Aurora Noir — Luxury Headless Commerce Boutique',
      image: 'assets/project-ecommerce.jpg',
      tags: ['Next.js', 'Stripe API', 'Tailwind', 'PostgreSQL', 'Framer Motion'],
      description: 'A bespoke digital storefront engineered for luxury retail fashion and fine jewelry with instant page transitions, zero-flicker cart sync, and global localized currency support.',
      features: [
        'Headless CMS integration with edge-cached dynamic catalog',
        'Stripe Payments with Apple Pay, Google Pay, and localized tax calculation',
        'Optimized Next.js image pipeline scoring 99 on Google PageSpeed',
        'Instant multi-variant switcher with high-resolution zoom viewer'
      ],
      github: 'https://github.com',
      demo: '#'
    },
    'modal-fintech': {
      title: 'Apex — Institutional Crypto & Asset Trading Terminal',
      image: 'assets/project-fintech.jpg',
      tags: ['TypeScript', 'Node.js', 'Chart.js', 'Redis', 'Web3.js'],
      description: 'A multi-asset portfolio dashboard providing real-time candlestick telemetry, order book depth charts, automated rebalancing bots, and a seamless mobile companion interface.',
      features: [
        'Live order book aggregation across 8 liquidity pools',
        'Encrypted local keystore integration with multi-wallet signatures',
        'Sub-second trade execution telemetry with Redis caching tier',
        'Ultra-responsive hybrid layout optimized for desktop and mobile'
      ],
      github: 'https://github.com',
      demo: '#'
    }
  };

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const previewTriggers = document.querySelectorAll('[data-modal]');

  function openModal(modalKey) {
    const data = projectData[modalKey];
    if (!data || !modal || !modalBody) return;

    modalBody.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-project-img">
      <div class="modal-tags">
        ${data.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <h3 class="modal-title">${data.title}</h3>
      <p class="modal-desc">${data.description}</p>
      
      <div class="modal-features">
        <h4>Key Technical Highlights:</h4>
        <ul>
          ${data.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-actions">
        <a href="${data.demo}" class="btn btn-primary btn-sm" onclick="showToast('Launching live interactive sandbox...', 'info'); return false;">
          <span>Launch Live App</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
          <span>View Source Code</span>
        </a>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  previewTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalKey = btn.getAttribute('data-modal');
      openModal(modalKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // -------------------------------------------------------------------------
  // 9. Interactive Contact Form with Validation & Feedback
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('sender-name');
  const emailInput = document.getElementById('sender-email');
  const messageInput = document.getElementById('sender-message');
  const submitBtn = document.getElementById('submit-btn');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    // Clear validation error on input
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.closest('.form-group')?.classList.remove('has-error');
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameInput.closest('.form-group')?.classList.add('has-error');
        isValid = false;
      }

      if (!validateEmail(emailInput.value.trim())) {
        emailInput.closest('.form-group')?.classList.add('has-error');
        isValid = false;
      }

      if (!messageInput.value.trim() || messageInput.value.trim().length < 15) {
        messageInput.closest('.form-group')?.classList.add('has-error');
        isValid = false;
      }

      if (!isValid) {
        showToast('Please fix the highlighted fields in the form', 'info');
        return;
      }

      // Simulate API submission
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        contactForm.reset();
        showToast('🎉 Message sent successfully! Aryan will reply within 24 hours.', 'success');
      }, 1200);
    });
  }

  // -------------------------------------------------------------------------
  // 10. Copy Email & Resume Download Quick Buttons
  // -------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'aryan.sharma.dev@example.com';
      navigator.clipboard.writeText(email)
        .then(() => {
          showToast('📋 Email copied to clipboard: ' + email, 'success');
        })
        .catch(() => {
          showToast('Email: ' + email, 'info');
        });
    });
  }

  const downloadCvBtn = document.getElementById('download-cv-btn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
      showToast('📄 Aryan_Sharma_Resume_2026.pdf ready for download!', 'success');
    });
  }
});

// ---------------------------------------------------------------------------
// Toast Notification Engine
// ---------------------------------------------------------------------------
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✅' : '💡'}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-hide');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}
