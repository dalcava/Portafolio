// control-script.js

// ===============================
// CURSOR PERSONALIZADO
// ===============================
let scrollThrottle = 0;
let scrollValue = 0;
let particlesArray;
let animationFrameId; // ID de requestAnimationFrame

// Crea el cursor personalizado y lo añade al DOM
const customCursor = document.createElement("div");
customCursor.classList.add("custom-cursor");
document.body.appendChild(customCursor);

// Selecciona los elementos interactivos (ajusta los selectores según tus necesidades)
const interactiveElements = document.querySelectorAll(
  ".next-project-btn, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .Lightbulb, .menu, .icon-buttons"
);

const proximityRadius = 300; // Valor para el efecto magnético

// Función para actualizar estilos del cursor
function updateCursorStyles(styles) {
  Object.assign(customCursor.style, styles);
}

// Efecto magnético: mueve el cursor hacia el elemento interactivo más cercano
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
      transition: "transform 0.2s ease-out, background-color 0.3s ease"
    });
  } else {
    updateCursorStyles({
      left: `${e.clientX}px`,
      top: `${e.clientY}px`,
      transform: `translate(-50%, -50%) scale(1)`,
      backgroundColor: "#077E69",
      transition: "transform 0.2s ease-out, background-color 0.3s ease"
    });
  }
});

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

document.addEventListener("mouseout", () => {
  customCursor.classList.remove("pointer");
});

document.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  if (touch) {
    customCursor.style.left = `${touch.clientX}px`;
    customCursor.style.top = `${touch.clientY}px`;
  }
});

// ===============================
// STICKY HEADER: cambiar de absolute a fixed y ocultar/mostrar al hacer scroll
// ===============================

function initHeaderScroll() {
    let lastScroll = 0;
    const header = document.getElementById("header");
    
    if (!header) {
        console.error("Header no encontrado");
        return;
    }

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll === 0) {
            // Si estamos en la parte superior, aseguramos que el header sea visible
            header.classList.remove("hide");
            header.classList.add("start");
        } else if (currentScroll > lastScroll) {
            // Si bajamos, ocultamos el header
            if (!header.classList.contains("hide")) {
                header.classList.add("hide");
                header.classList.remove("start");
            }
        } else if (currentScroll < lastScroll) {
            // Si subimos, mostramos el header
            if (header.classList.contains("hide")) {
                header.classList.remove("hide");
            }
        }

        lastScroll = currentScroll;
    });
}

// Asegurar que el header se carga antes de inicializar el comportamiento
document.addEventListener("DOMContentLoaded", () => {
    fetch("../../header.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
            
            // Esperamos a que el header esté en el DOM antes de iniciar la función
            setTimeout(() => {
                initHeaderScroll();
            }, 50);
        })
        .catch(error => console.error("Error cargando el header:", error));
});





// ===============================
// ANIMACIONES DE ENTRADA CON GSAP
// ===============================
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  
  gsap.to(loadingScreen, {
    y: '100%',      // Mueve el contenedor hacia abajo
    duration: .5,  // Duración de la animación
    ease: "out", // Easing bouncy para el efecto de rebote
    onComplete: () => {
      loadingScreen.style.display = 'none';
    }
  });
});

window.onload = () => {
  scrollValue = 0;
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;

  const icono = document.querySelector(".icon-button");
  if (icono) {
    icono.classList.add("brillo");
  }

  if (typeof crearPalabra === "function") {
    crearPalabra();
  }

  const timeline = gsap.timeline();
  timeline
  
  .fromTo(
    "#header",
    { clipPath: "inset(0 100% 0 0)" },
    { clipPath: "inset(0 0 0 0)", duration: 0.5, ease: "power4.out" },
    "-=0.5"  // Ajusta el solape según prefieras
  )
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
    .to(".control-content", {
      opacity: 1,
      duration: 0.5,
      ease: "power4.out"
      // Opcional: si usaste un transform en el estado inicial, agrégalo aquí
      // transform: "translateY(0)"
    })
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
    )
    // Finalmente, haz aparecer el contenedor de control
};


