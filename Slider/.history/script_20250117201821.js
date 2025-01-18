var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true, // Centra los slides pero permite el efecto
    initialSlide: 2, // Slide inicial
    speed: 400,
    preventClicks: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0, // Sin rotación
        stretch: -120, // Mueve los slides hacia los lados (negativo para derecha)
        depth: 800, // Profundidad para crear perspectiva
        modifier: 1,
        slideShadows: false, // Sin sombras
    },
    breakpoints: {
        768: {
            stretch: -240, // Ajusta la distancia en pantallas más grandes
        },
    },
    on: {
        click(event) {
            swiper.slideTo(this.clickedIndex);
        }
    }
});
