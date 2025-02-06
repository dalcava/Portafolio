import React, { useEffect } from "react";
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "../styles/global.css";

function SwiperGallery() {
  useEffect(() => {
    Swiper.use([Navigation, Pagination, Autoplay]);
    new Swiper(".swiper", {
      loop: true,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }, []);

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        {/* Slide 1 */}
        <div className="swiper-slide">
          <div className="image-container static-img">
            <img
              src="../../../Slider/Recursos/Kinetic rush-static.webp"
              alt="Static Image 1"
              className="imagen-contenida"
            />
            <div className="grid">
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
            </div>
          </div>
          <img
            src="../../../Slider/Recursos/Kinetic rush-active.gif"
            alt="Active GIF 1"
            className="active-gif"
          />
          <div className="title">
            <span>Nombre del proyecto</span>
          </div>
          <div className="subtitle">
            <span>Subtítulo del proyecto</span>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="swiper-slide">
          <div className="image-container static-img">
            <img
              src="../../../Slider/Recursos/Control-static.webp"
              alt="Static Image 2"
              className="imagen-contenida"
            />
            <div className="grid">
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
            </div>
          </div>
          <img
            src="../../../Slider/Recursos/Control-active.gif"
            alt="Active GIF 2"
            className="active-gif"
          />
          <div className="title">
            <span>Nombre del proyecto</span>
          </div>
          <div className="subtitle">
            <span>Subtítulo del proyecto</span>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="swiper-slide">
          <div className="image-container static-img">
            <img
              src="../../../Slider/Recursos/Portada.webp"
              alt="Static Image 3"
              className="imagen-contenida"
            />
            <div className="grid">
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
            </div>
          </div>
          <img
            src="../../../Slider/Recursos/AvalPay-Active.gif"
            alt="Active GIF 3"
            className="active-gif"
          />
          <div className="title">
            <span>Nombre del proyecto</span>
          </div>
          <div className="subtitle">
            <span>Subtítulo del proyecto</span>
          </div>
        </div>

        {/* Slide 4 */}
        <div className="swiper-slide">
          <div className="image-container static-img">
            <img
              src="../../../Slider/Recursos/Duraznos intro.gif"
              alt="Static Image 4"
              className="imagen-contenida"
            />
            <div className="grid">
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
            </div>
          </div>
          <img
            src="../../../Slider/Recursos/Duraznos active.gif"
            alt="Active GIF 4"
            className="active-gif"
          />
          <div className="title">
            <span>Nombre del proyecto</span>
          </div>
          <div className="subtitle">
            <span>Subtítulo del proyecto</span>
          </div>
        </div>

        {/* Slide 5 */}
        <div className="swiper-slide">
          <div className="image-container static-img">
            <img
              src="../../../Slider/Recursos/CR.webp"
              alt="Static Image 5"
              className="imagen-contenida"
            />
            <div className="grid">
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
              <div className="grid-collumn"></div>
            </div>
          </div>
          <img
            src="../../../Slider/Recursos/AvalPay-Active.gif"
            alt="Active GIF 5"
            className="active-gif"
          />
          <div className="title">
            <span>Nombre del proyecto</span>
          </div>
          <div className="subtitle">
            <span>Subtítulo del proyecto</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="swiper-button-prev">
        <img
          src="../../../Slider/Recursos/arrow-left.svg"
          alt="Previous"
          className="new-icon"
        />
      </div>
      <div className="swiper-button-next">
        <img
          src="../../../Slider/Recursos/arrow-right.svg"
          alt="Next"
          className="new-icon"
        />
      </div>

      {/* Pagination */}
      <div className="swiper-pagination"></div>
    </div>
  );
}

export default SwiperGallery;
