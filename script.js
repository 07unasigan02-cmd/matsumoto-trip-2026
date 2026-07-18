document.addEventListener('DOMContentLoaded', () => {

const carousels = document.querySelectorAll('[data-carousel]');

carousels.forEach((carousel) => {

const slides = carousel.querySelectorAll('.carousel-slide');
const prevButton = carousel.querySelector('.carousel-button-prev');
const nextButton = carousel.querySelector('.carousel-button-next');
const currentCounter = carousel.querySelector('.carousel-current');

let currentIndex = 0;
let startX = 0;
let endX = 0;

function showSlide(index) {

  currentIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle(
      'is-active',
      slideIndex === currentIndex
    );
  });

  currentCounter.textContent = currentIndex + 1;
}

prevButton.addEventListener('click', () => {
  showSlide(currentIndex - 1);
});

nextButton.addEventListener('click', () => {
  showSlide(currentIndex + 1);
});

carousel.addEventListener('touchstart', (event) => {
  startX = event.touches[0].clientX;
}, { passive: true });

carousel.addEventListener('touchend', (event) => {

  endX = event.changedTouches[0].clientX;

  const swipeDistance = endX - startX;

  if (Math.abs(swipeDistance) < 50) {
    return;
  }

  if (swipeDistance < 0) {
    showSlide(currentIndex + 1);
  } else {
    showSlide(currentIndex - 1);
  }

}, { passive: true });

});

});