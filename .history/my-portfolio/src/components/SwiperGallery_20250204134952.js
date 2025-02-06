import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/global.css";

const slides = [
  {
    staticImg: "/Recursos/Kinetic rush-static.webp",
    activeGif: "/Recursos/Kinetic rush-active.gif",
    title: "Nombre del proyecto",
    subtitle: "Subtítulo del proyecto",
  },
  {
    staticImg: "/Recursos/Control-static.webp",
    activeGif: "/Recursos/Control-active.gif",
    title: "Nombre del proyecto",
    subtitle: "Subtítulo del proyecto",
  },
  {
    staticImg: "/Recursos/Portada.webp",
    activeGif: "/Recursos/AvalPay-Active.gif",
    title: "Nombre del proyecto",
    subtitle: "Subtítulo del proyecto",
  },
  {
    staticImg: "/Recursos/Duraznos intro.gif",
    activeGif: "/Recursos/Duraznos active.gif",
    title: "Nombre del proyecto",
    subtitle: "Subtítulo del proyecto",
  },
  {
    staticImg: "/Recursos/CR.webp",
    activeGif: "/Recursos/AvalPay-Active.gif",
    title: "Nombre del proyecto",
    subtitle: "Subtítulo del proyecto",
  },
];

function SwiperGallery() {
  return (
    <Swiper
      loop={true}
      autoplay={{ delay: 8000, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination, Autoplay]}
      className="swiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="swiper-slide">
          <div className="image-container static-img">
            <img src={slide.staticImg} alt={`Static Image ${index + 1}`} className="imagen-contenida" />
            <div className="grid">
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
            </div>
          </div>
          <img src={slide.activeGif} alt={`Active GIF ${index + 1}`} className="active-gif" />
          <div className="title">
            <span>{slide.title}</span>
          </div>
          <div className="subtitle">
            <span>{slide.subtitle}</span>
          </div>
        </SwiperSlide>
      ))}

      {/* Navigation Buttons */}
      <div className="swiper-button-prev">
        <img src="/Recursos/arrow-left.svg" alt="Previous" className="new-icon" />
      </div>
      <div className="swiper-button-next">
        <img src="/Recursos/arrow-right.svg" alt="Next" className="new-icon" />
      </div>

      {/* Pagination Dots */}
      <div className="swiper-pagination"></div>
    </Swiper>
  );
}

export default SwiperGallery;
