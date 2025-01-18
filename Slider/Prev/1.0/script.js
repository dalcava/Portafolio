var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true, // Centers slides
    initialSlide: 1, // Sets the initial slide
    speed: 600,
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
    pagination: {
        el: ".swiper-pagination", // Selector for the pagination element
        clickable: true, // Makes the dots clickable
    },
    navigation: {
        nextEl: ".swiper-button-next", // Right arrow button
        prevEl: ".swiper-button-prev", // Left arrow button
    },
    autoplay: {
        delay: 8000, // Moves every 8 seconds
        disableOnInteraction: false, // Prevents autoplay from stopping after interaction
        reverseDirection: true, // Makes autoplay go in reverse
    },
    on: {
        slideChangeTransitionStart: function () {
            document.querySelectorAll(".swiper-slide").forEach(slide => {
                // Reset all slides to show static images
                const staticImg = slide.querySelector(".static-img");
                const activeGif = slide.querySelector(".active-gif");

                if (staticImg) staticImg.style.opacity = "1";
                if (activeGif) activeGif.style.opacity = "0";
            });
        },
        slideChangeTransitionEnd: function () {
            const activeSlide = document.querySelector(".swiper-slide-active");
            const staticImg = activeSlide.querySelector(".static-img");
            const activeGif = activeSlide.querySelector(".active-gif");

            // Delay the transition to the GIF
            if (staticImg && activeGif) {
                setTimeout(() => {
                    staticImg.style.opacity = "0"; // Fade out static image
                    activeGif.style.opacity = "1"; // Fade in GIF
                }, 500); // Delay by 1 second
            }
        },
    },
});

// Add click events for navigation buttons to reset autoplay
document.querySelector(".swiper-button-prev").addEventListener("click", function () {
    swiper.slidePrev(); // Navigate to the previous slide
    swiper.autoplay.start(); // Reset autoplay timer
});

document.querySelector(".swiper-button-next").addEventListener("click", function () {
    swiper.slideNext(); // Navigate to the next slide
    swiper.autoplay.start(); // Reset autoplay timer
});

// Add event listener for pagination dots
document.querySelector(".swiper-pagination").addEventListener("click", function () {
    swiper.autoplay.start(); // Reset autoplay timer
});
