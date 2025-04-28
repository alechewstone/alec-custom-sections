document.addEventListener('DOMContentLoaded', function () {
    const carouselTrack = document.querySelector('.carousel-track');
    const leftArrow = document.querySelector('.carousel-arrow--left');
    const rightArrow = document.querySelector('.carousel-arrow--right');
  
    const scrollAmount = 400;
    let isScrolling = false; // Track if scrolling is in progress
  
    updateArrowVisibility();
  
    leftArrow.addEventListener('click', function (e) {
      e.preventDefault();
      if (isScrolling) return; // Skip if still scrolling
  
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
        updateArrowVisibility(); // Re-check arrows after scroll
      }, 400); // Match scroll timing
    }
  
    carouselTrack.addEventListener('scroll', updateArrowVisibility);
  
    function updateArrowVisibility() {
      const scrollLeft = carouselTrack.scrollLeft;
      const maxScrollLeft = carouselTrack.scrollWidth - carouselTrack.clientWidth;
  
      leftArrow.style.display = scrollLeft <= 0 ? 'none' : 'flex';
      rightArrow.style.display = scrollLeft >= maxScrollLeft - 1 ? 'none' : 'flex';
    }
  });
