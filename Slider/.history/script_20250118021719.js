var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true, // Centers slides
    initialSlide: 1, // Sets the initial slide
    speed: 320,
    preventClicks: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0, // No rotation
        stretch: -110, // Adjusts slide spacing
        depth: 855, // Perspective depth
        modifier: 1,
        slideShadows: false, // No shadows
    },
    breakpoints: {
        768: {
            stretch: -240, // Adjusts stretch for larger screens
        },
    },
    on: {
        click(event) {
            swiper.slideTo(this.clickedIndex); // Navigate to the clicked slide
        }
    },
    pagination: {
        el: ".swiper-pagination", // Selector for the pagination element
        clickable: true, // Makes the dots clickable
    },
});

// Add click events for the navigation buttons
document.querySelector(".swiper-button-prev").addEventListener("click", function () {
    swiper.slidePrev(); // Navigate to the previous slide
});

document.querySelector(".swiper-button-next").addEventListener("click", function () {
    swiper.slideNext(); // Navigate to the next slide
});
