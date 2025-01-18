var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true, // Centra los slides pero permite el efecto
    initialSlide: 1, // Slide inicial
    speed: 320,
    preventClicks: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0, // Sin rotación
        stretch: -110, // Mueve los slides hacia los lados (negativo para derecha)
        depth: 855, // Profundidad para crear perspectiva
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
            swiper.slideTo(this.clickedIndex); // Desliza al slide que se haga clic
        }
    },
    pagination: {
        el: ".swiper-pagination", // Usa el selector con punto (.)
        clickable: true, // Asegura que los dots sean clickeables
    },    
});
