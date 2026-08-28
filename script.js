document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav panel toggle
  const navToggle = document.querySelector('.nav-toggle');
  const mobilePanel = document.querySelector('.mobile-panel');

  if (navToggle && mobilePanel) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobilePanel.classList.toggle('open');
      navToggle.textContent = mobilePanel.classList.contains('open') ? '✕' : '≡';
    });

    // Close mobile panel when clicking any link inside it
    mobilePanel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobilePanel.classList.remove('open');
        navToggle.textContent = '≡';
      });
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobilePanel.contains(e.target) && !navToggle.contains(e.target)) {
        mobilePanel.classList.remove('open');
        navToggle.textContent = '≡';
      } // Corrected closing brace
    });
  }

  // Active nav link highlight
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-panel a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Scroll reveal animation
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    if (btn && answer) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            const otherAns = other.querySelector('.faq-a');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });
        item.classList.toggle('open', !isOpen);
        answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
      });
    }
  });

  // Contact form handler
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      if (status) {
        status.textContent = 'Message queued — connect a form backend to send for real.';
      }
    });
  }

});