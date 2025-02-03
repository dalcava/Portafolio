/* control-script.js */

let scrollThrottle = 0;
let scrollValue = 0;
let particlesArray;
let animationFrameId; // ID de requestAnimationFrame

// ===============================
// Creación del cursor personalizado
// ===============================
const customCursor = document.createElement("div");
customCursor.classList.add("custom-cursor");
document.body.appendChild(customCursor);

const interactiveElements = document.querySelectorAll(
  ".next-project-btn, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .Lightbulb, .menu, .icon-buttons"
);

const proximityRadius = 300; // Ajusta este valor según convenga

// Función para actualizar los estilos del cursor
function updateCursorStyles(styles) {
  Object.assign(customCursor.style, styles);
}

// Efecto magnético del cursor: se mueve hacia el elemento interactivo más cercano
document.addEventListener("mousemove", (e) => {
  let closestElement = null;
  let closestDistance = proximityRadius;

  interactiveElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );
    if (distance < closestDistance) {
      closestDistance = distance;
      closestElement = element;
    }
  });

  if (closestElement) {
    const rect = closestElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const pullStrength = Math.min(0.2, 1 - closestDistance / proximityRadius);
    const targetX = centerX + (e.clientX - centerX) * pullStrength;
    const targetY = centerY + (e.clientY - centerY) * pullStrength;

    updateCursorStyles({
      left: `${targetX}px`,
      top: `${targetY}px`,
      transform: `translate(-50%, -50%) scale(1.5)`,
      backgroundColor: "rgba(246, 246, 246, 0.1)",
      transition: "transform 0.2s ease-out, background-color 0.3s ease",
    });
  } else {
    updateCursorStyles({
      left: `${e.clientX}px`,
      top: `${e.clientY}px`,
      transform: `translate(-50%, -50%) scale(1)`,
      backgroundColor: "#077E69",
      transition: "transform 0.2s ease-out, background-color 0.3s ease",
    });
  }
});

// Ajusta la apariencia del cursor según el elemento sobre el que se encuentre
document.addEventListener("mouseover", (e) => {
  const target = e.target;
  const isPointer = getComputedStyle(target).cursor === "pointer";
  if (isPointer) {
    customCursor.classList.add("pointer");
  } else {
    customCursor.classList.remove("pointer");
  }
});

document.addEventListener("mousemove", (e) => {
  const target = e.target;
  if (!customCursor) return;

  // Actualiza la posición del cursor
  customCursor.style.left = `${e.clientX}px`;
  customCursor.style.top = `${e.clientY}px`;

  if (window.getComputedStyle(target).cursor === "pointer") {
    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    customCursor.style.transform = `translate(-50%, -50%) scale(3.5)`;
    customCursor.style.left = `${centerX}px`;
    customCursor.style.top = `${centerY}px`;
    customCursor.style.backgroundColor = "#077E69";
    customCursor.style.borderRadius = "24px";
    customCursor.style.transition =
      "transform 0.15s ease-out, background-color 0.3s ease, border-radius 0.3s ease";
    customCursor.style.zIndex = "2";
  } else if (
    window.getComputedStyle(target).cursor === "text" ||
    ["P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6"].includes(target.tagName)
  ) {
    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    customCursor.style.transform = `translate(-50%, -50%)`;
    customCursor.style.width = "4px";
    customCursor.style.height = "58px";
    customCursor.style.backgroundColor = "rgba(7, 126, 105, 0.15)";
    customCursor.style.borderRadius = "8px";
    customCursor.style.transition =
      "transform 0.15s ease-out, width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-radius 0.3s ease";
    customCursor.style.zIndex = "1";
    customCursor.style.border = "1px solid rgba(7, 126, 105, 0.5)";
  } else {
    customCursor.style.transform = `translate(-50%, -50%) scale(1)`;
    customCursor.style.backgroundColor = "rgba(7, 126, 105, 0.15)";
    customCursor.style.borderRadius = "50%";
    customCursor.style.width = "16px";
    customCursor.style.height = "16px";
    customCursor.style.zIndex = "1000";
    customCursor.style.transition =
      "transform 0.25s ease-out, width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-radius 0.3s ease, z-index 0.3s ease";
    customCursor.style.border = "1px solid rgba(7, 126, 105, 0.5)";
  }
});

// Remueve la clase "pointer" al salir del elemento
document.addEventListener("mouseout", () => {
  customCursor.classList.remove("pointer");
});

// Soporte táctil para el cursor
document.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  if (touch) {
    customCursor.style.left = `${touch.clientX}px`;
    customCursor.style.top = `${touch.clientY}px`;
  }
});

// ===============================
// Sticky Header: ocultar el header al hacer scroll hacia abajo y mostrarlo al subir
// Se ejecuta una vez que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('.header-section');
  
    let lastScrollTop = 0;
    const header = document.getElementById("header");
    
    window.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop) {
        // Si se hace scroll hacia abajo, ocultamos el header deslizando hacia arriba
        header.style.top = "-60px"; // Ajusta este valor según la altura de tu header
      } else {
        // Si se hace scroll hacia arriba, mostramos el header
        header.style.top = "0";
      }
      
      lastScrollTop = scrollTop;
    });
  });
  

// ===============================
// Animaciones al cargar la página con GSAP
window.onload = () => {
  scrollValue = 0;
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;

  const icono = document.querySelector(".icon-button");
  if (icono) {
    icono.classList.add("brillo");
  }

  // Si existe la función crearPalabra, se invoca (asegúrate de tenerla definida en algún lugar)
  if (typeof crearPalabra === "function") {
    crearPalabra();
  }

  // GSAP Timeline para secuencia de animación
  const timeline = gsap.timeline();
  timeline
    .fromTo(
      "body",
      { clipPath: "inset(100% 0 0 0)" },
      { clipPath: "inset(0% 0 0 0)", duration: 0.5, ease: "power4.out" }
    )
    .fromTo(
      ".hero",
      { clipPath: "inset(100% 0 0 0)", borderRadius: "0px" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.2,
        ease: "power4.out",
        borderRadius: "32px",
        duration: 1
      },
      "-=2"
    )
    .fromTo(
      ".personal-photo",
      { opacity: 0, y: 0 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power4.out", stagger: 0.1 },
      "=0"
    )
    .fromTo(
      ".icon-button",
      { opacity: 0, y: 0 },
      { opacity: 1, y: 0, duration: 0.25, ease: "power4.out", stagger: 0.1 },
      "-=0"
    )
    .fromTo(
      ".tag-btn",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.75, ease: "power4.out", stagger: 0.1 },
      "-=.35"
    )
    .fromTo(
      ".hero-image",
      { clipPath: "inset(100% 0 0 0)", y: -250 },
      { clipPath: "inset(0% 0 0 0)", y: 0, duration: 1.2, ease: "power4.out" },
      "-=.35"
    )
    .fromTo(
      ".main-title",
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1.25, ease: "power4.out" },
      "-=.75"
    )
    .fromTo(
      ".main-subtitle",
      { clipPath: "inset(100% 0 0 0)" },
      { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "power4.out" },
      "-=1.25"
    );
};
