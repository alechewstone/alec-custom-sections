// Accordion Toggle Logic
document.querySelectorAll('.accordion-section__toggle').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const content = document.getElementById(button.getAttribute('aria-controls'));

    // Get the content height
    const contentHeight = content.scrollHeight;

    // Calculate duration: 0.2s per 100px of height, clamped between 0.2s and 0.6s
    let duration = Math.min(Math.max(contentHeight / 500, 0.2), 0.6);

    if (!expanded) {
      content.style.transition = `max-height ${duration}s cubic-bezier(0.2, 0, 0, 1), opacity ${duration}s ease-out`;
      content.classList.add('accordion-section__content--open');
      content.style.maxHeight = contentHeight + 'px';
      content.style.opacity = '1';
    } else {
      // Faster close - still dynamic but quicker
      const closeDuration = 0.1; // consistent quick close
      content.style.transition = `max-height ${closeDuration}s cubic-bezier(0.4, 0, 1, 1), opacity ${closeDuration}s ease-in`;
      content.style.maxHeight = '0';
      content.style.opacity = '0';
      content.classList.remove('accordion-section__content--open');
    }

    button.setAttribute('aria-expanded', !expanded);
  });
});

// Scroll Animation Logic
if (document.querySelector('.scroll-animate-enabled')) {
  const fadeEls = document.querySelectorAll('.scroll-fade-in');
  const speed = document.querySelector('.scroll-animate-enabled')?.dataset.animationSpeed || 600;

  fadeEls.forEach(el => {
    el.style.transitionDuration = `${speed}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => observer.observe(el));
}