function initCarousel(sectionSelector, trackSelector, leftArrowSelector, rightArrowSelector, scrollAmount = 400) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  const carouselTrack = section.querySelector(trackSelector);
  const leftArrow = section.querySelector(leftArrowSelector);
  const rightArrow = section.querySelector(rightArrowSelector);

  if (!carouselTrack || !leftArrow || !rightArrow) return;

  let isScrolling = false;

  updateArrowVisibility();

  leftArrow.addEventListener('click', function (e) {
      e.preventDefault();
      if (isScrolling) return;

      isScrolling = true;
      carouselTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });

      lockScrollTemporarily();
  });

  rightArrow.addEventListener('click', function (e) {
      e.preventDefault();
      if (isScrolling) return;

      isScrolling = true;
      carouselTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      lockScrollTemporarily();
  });

  function lockScrollTemporarily() {
      setTimeout(() => {
          isScrolling = false;
          updateArrowVisibility();
      }, 400);
  }

  carouselTrack.addEventListener('scroll', updateArrowVisibility);

  function updateArrowVisibility() {
    const scrollLeft = carouselTrack.scrollLeft;
    const maxScrollLeft = carouselTrack.scrollWidth - carouselTrack.clientWidth;

    // Fade effect instead of display toggle
    if (scrollLeft <= 0) {
        leftArrow.style.opacity = '0';
        leftArrow.style.pointerEvents = 'none';
    } else {
        leftArrow.style.opacity = '1';
        leftArrow.style.pointerEvents = 'auto';
    }

    if (scrollLeft >= maxScrollLeft - 1) {
        rightArrow.style.opacity = '0';
        rightArrow.style.pointerEvents = 'none';
    } else {
        rightArrow.style.opacity = '1';
        rightArrow.style.pointerEvents = 'auto';
    }
}
}

function initScrollFadeIn(sectionSelector) {
  document.querySelectorAll(sectionSelector).forEach(section => {
    const fadeItems = section.querySelectorAll('.scroll-fade-in');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fadeItems.forEach((item, index) => {
            item.classList.add('visible');

            if (section.classList.contains('sequential-fade')) {
              item.style.transitionDelay = `${index * 100}ms`; // Adjust delay here if needed
            } else {
              item.style.transitionDelay = '0ms';
            }
          });

          fadeItems.forEach(item => observer.unobserve(item));
        }
      });
    }, {
      threshold: 0.1
    });

    fadeItems.forEach(item => observer.observe(item));
  });
}

document.addEventListener('DOMContentLoaded', function () {
// Featured Collections Grid
initCarousel('.mobile-carousel', '[data-carousel]', '.mobile-carousel .carousel-arrow--left', '.mobile-carousel .carousel-arrow--right', 400);

// Collection Carousel
initCarousel('.carousel-section', '.carousel-section__track', '.carousel-section .carousel-arrow--left', '.carousel-section .carousel-arrow--right', 400);

// Scroll Fade-ins
  initScrollFadeIn('.carousel-section'); // Applies to each carousel-section with scroll-fade-in items
});