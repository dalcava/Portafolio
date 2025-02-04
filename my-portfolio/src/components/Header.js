import React from "react";
import "./Header.css"; // Optional, if you want styles

function Header() {
  return (
    <header className="header-section">
      <div className="personal-photo">
        <img src="/Recursos/personal-photo.svg" alt="Personal" />
      </div>
      <div className="header-content">
        <div className="icon-buttons">
          <div className="navigation-buttons">
            <div className="icon-button menu projects">
              <span>Works</span>
            </div>
            <div className="icon-button menu contact">
              <span>Contact</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
