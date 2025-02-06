import React from "react";
import Hero from "../components/Hero";
import SwiperGallery from "../components/SwiperGallery";
import "../styles/global.css"; // Ensure this line is present


function Home() {
  return (
    <div className="background">
      {/* Hero Section */}
      <div className="hero">
        <div className="white-overlay"></div>
        <canvas id="canvas1"></canvas>
        <div className="blur-layer"></div>

        {/* Swiper Gallery */}
        <div className="boolean-container">
          <SwiperGallery />
        </div>

        {/* Title Section */}
        <div className="tittle-section">
          <div className="tittle-content">
            <div className="main-text masked-element">
              <div className="blob-container">
                <svg
                  className="green-blob"
                  viewBox="0 0 500 500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="var(--Verde-claro)"
                    d="M200,80C290,90 340,210 300,320C260,430 140,420 100,320C60,220 110,90 200,80Z"
                    id="blob-path"
                  />
                </svg>
              </div>
              <h2 className="main-subtitle">
                <span id="nombreI"></span>
              </h2>
              <h1 className="main-title">David López</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
