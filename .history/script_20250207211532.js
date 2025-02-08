const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let scrollThrottle = 0;
let scrollValue = 0;
let particlesArray;
let animationFrameId; // We'll store requestAnimationFrame's ID here

//get mouse position for desktop
let mouse = {
    x: null, y: null,
    radius: (canvas.height/30) * (canvas.width/85)
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
}, { passive: true });

// Get touch position for mobile
window.addEventListener('touchmove', function(event) {
    let touch = event.touches[0]; // first touch
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
}, { passive: true });

function interpolateColor(color1, color2, t) {
    // Convert hex to RGB
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);

    // Interpolate each channel
    const r = Math.round(c1.r + (c2.r - c1.r) * t);
    const g = Math.round(c1.g + (c2.g - c1.g) * t);
    const b = Math.round(c1.b + (c2.b - c1.b) * t);

    // Convert back to hex
    return rgbToHex(r, g, b);
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

// create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.originX = x; // Store initial X position
        this.originY = y; // Store initial Y position
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = 'rgba(246, 246, 246, 0.50)'; // Updated color
    }

    // Draw individual particles
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Update particle position
    update() {
        // Check canvas boundaries
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
    
        // Check distance to mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
    
        // Calculate gradient color
        if (distance < mouse.radius) {
            let t = distance / mouse.radius; // Normalize distance (0 near the mouse, 1 at the edge)
            this.color = interpolateColor('#D1D1D6', '#09A186', t); 
        } else {
            this.color = '#f6f6f6'; // Default color
        }
    
        // Repel away from mouse if within radius
        if (distance < mouse.radius + this.size) {
            let angle = Math.atan2(dy, dx);
            let repelForce = 1.5; // Reduced repulsion force
            this.x -= Math.cos(angle) * repelForce;
            this.y -= Math.sin(angle) * repelForce;
        } else {
            // Gradually move back to origin position
            let returnSpeed = 0.1; 
            this.x += (this.originX - this.x) * returnSpeed;
            this.y += (this.originY - this.y) * returnSpeed;
        }
    
        // Draw the particle
        this.draw();
    }    
    
}

//create particle array
function init() {
    particlesArray = [];
    let numberOfRows = 180; 
    let numberOfCols = 24; 
    let gridWidth = canvas.width / numberOfCols; 
    let gridHeight = canvas.height / numberOfRows; 
    let size = Math.min(canvas.width, canvas.height) * 0.001; 

    for (let row = 0; row < numberOfRows; row++) {
        for (let col = 0; col < numberOfCols; col++) {
            let x = col * gridWidth + gridWidth / 2; 
            let y = row * gridHeight + gridHeight / 2; 

            // Decide if the particle moves horizontally or vertically
            let moveHorizontal = Math.random() > 0.5;
            let directionX = moveHorizontal ? (Math.random() * 0.2) - 0.1 : 0; 
            let directionY = moveHorizontal ? 0 : (Math.random() * 0.2) - 0.1; 

            let color = '#f6f6f6';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }
}

// animation loop
function animate() {
    animationFrameId = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

// Resize event
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.radius = ((canvas.height/120) * (canvas.height/120));

    checkCanvasSize();  // <-- added
}, { passive: true });

// Mouse out event
window.addEventListener('mouseout', function () {
    mouse.x = undefined;
    mouse.y = undefined;
});

// Touch out event
window.addEventListener('touchend', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

/*
 * If < 550px, hide the canvas and cancel the animation. 
 * If >= 550px, show the canvas, init, and start the animation.
 */
function checkCanvasSize() {
    if (window.innerWidth < 601) {
        // Stop drawing and hide the canvas
        cancelAnimationFrame(animationFrameId);
        canvas.style.display = 'none';
    } else {
        // Show the canvas, re-initialize, and re-start animation
        canvas.style.display = 'block';
        init();
        animate();
    }
}

// On initial load, check canvas size
checkCanvasSize();


//---------------------------------------------------------------------------------------------------------
//------------------------------- Función subtítulo ------------------------------------------------------- 
//---------------------------------------------------------------------------------------------------------
var palabraFrente = document.querySelector("#nombreI");

function crearPalabra() {
    let palabras = [
        "UI/UX Designer", "Experience Architect", "3D Artist", "Animator", 
        "Motion Designer", "Digital Illustrator", "3D Modeler", "Impostor", 
        "Interaction Designer", "Prototyper", "Interface Creator", "Visual Storyteller", 
        "Graphic Designer", "Product Designer", "Obsessive Compulsive", "VFX Artist", 
        "User", "Digital Experience Manager", "Experience Illustrator", 
        "Motion Graphics Designer", "Visual Concept Developer", "Parametric Designer", 
        "Responsive Design Specialist", "Loves Cats"
    ];

    let palabraAleatoria = aleatorio(0, palabras.length - 1);

    // Fade-out the text
    gsap.to(palabraFrente, {
        opacity: 0,
        y: -50,
        duration: 0,
        onComplete: () => {
            // Change the word after fade-out
            palabraFrente.innerHTML = palabras[palabraAleatoria];

            // Fade-in the new word
            gsap.to(palabraFrente, {
                opacity: 1,
                y: 0,
                duration: 0.0
            });
        }
    });
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Start the word creation process
crearPalabra();

// Interval every 2.4 seconds
setInterval(crearPalabra, 1600);


//---------------------------------------------------------------------------------------------------------
//------------------------------- Aquí empieza swiper ----------------------------------------------------- 
//---------------------------------------------------------------------------------------------------------

// Initialize Swiper


// Swiper initialization
var swiper = new Swiper(".swiper", {
  effect: "slide",
  grabCursor: true,
  centeredSlides: true,
  initialSlide: 1,
  speed: 800,
  preventClicks: true,
  loop: true,
  /* 
    Start with your smallest desired slidesPerView 
    as the default for widths under 500px. 
  */
  slidesPerView: "1", 
  spaceBetween: 4,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
    reverseDirection: false,
  },

  simulateTouch: true,
  allowTouchMove: true,

  // Breakpoints are min-width based:
  breakpoints: {
    551: {
      // >= 500px
      slidesPerView: "1",
    },
    701: {
      // >= 500px
      slidesPerView: "1",
    },
    1001: {
      // >= 1000px
      slidesPerView: "1",
    },
    1201: {
      // >= 1200px
      slidesPerView: "1.1",
    },
    1441: {
      // >= 1440px
      slidesPerView: "1.373",
    },
    1921: {
      // >= 1440px
      slidesPerView: "1.23",
    },

  },
});

//--------------------------------------- Initialize slide transforms to prevent leftover styles --------------------------------

function updateSlidePositions(smooth = true) {
    const activeIndex = swiper.activeIndex;
  
    document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
      const image = slide.querySelector('.imagen-contenida');
      if (!image) return;
  
      // Hint the browser for optimal 2D transform performance
      image.style.willChange = 'transform, clip-path, filter';
  
      // For the active or non-adjacent slides, center the image and remove extra effects.
      if (
        slide.classList.contains('swiper-slide-active') ||
        (!slide.classList.contains('swiper-slide-prev') && !slide.classList.contains('swiper-slide-next'))
      ) {
        gsap.to(image, {
          duration: smooth ? 1 : 0,
          ease: 'power3.out',
          x: 0, // Center the image
          clipPath: 'inset(0% 0% 0% 0%)' // No clipping
        });
      } else {
        // For adjacent slides (prev or next):
        // - Calculate a small base offset.
        // - Add a very subtle parallax offset based on the slide's progress.
        const baseOffset = (index - activeIndex) * -2.5;
        const parallaxOffset = (slide.progress || 0) * 1; // A slight parallax effect
        const finalOffset = baseOffset + parallaxOffset;
  
        gsap.to(image, {
          duration: smooth ? 1 : 0,
          ease: 'power3.out',
          x: `${finalOffset}%`, // Combine base offset with subtle parallax
          clipPath: 'inset(5% 5% 5% 5%)' // Soft clipping for a refined look
        });
      }
    });
  }
  
  // Update positions during key Swiper events for continuous, smooth motion:
  swiper.on('slideChangeTransitionStart', () => updateSlidePositions(true));
  swiper.on('slideChangeTransitionEnd', () => updateSlidePositions(true));
  
  // Continuously update while dragging for real-time fluidity.
  swiper.on('sliderMove', () => {
    requestAnimationFrame(() => updateSlidePositions(false));
  });
  
  // Ensure a final smooth correction shortly after touch/drag ends.
  let correctionTimeout;
  swiper.on('touchEnd', () => {
    clearTimeout(correctionTimeout);
    correctionTimeout = setTimeout(() => updateSlidePositions(true), 100);
  });
  
  // Optionally, use a MutationObserver to catch any class changes and reapply transitions.
  const observer = new MutationObserver(() => updateSlidePositions(true));
  document.querySelectorAll('.swiper-slide').forEach((slide) => {
    observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
  });
  
    

// Add click events for navigation buttons to reset autoplay
document.querySelector(".swiper-button-prev").addEventListener("click", function () {
    swiper.slideTo(swiper.activeIndex - 0); // Retrocede un slide manualmente
    swiper.autoplay.start(); // Reinicia el temporizador de autoplay
});

document.querySelectorAll(".swiper-slide").forEach((slide) => {
  const staticImg = slide.querySelector(".static-img"); // Static image container
  const activeGif = slide.querySelector(".active-gif"); // Active GIF

  if (!activeGif || !staticImg) return; // Ensure both elements exist

  let lastX = 100;
  let lastY = 100;
  let isInside = false;

  function removeEffect() {
      activeGif.style.maskImage = "none";
      activeGif.style.webkitMaskImage = "none";
      activeGif.style.opacity = "0"; // Hide the GIF
      staticImg.style.opacity = "1"; // Show static image
      staticImg.style.filter = "brightness(1)"; // Reset brightness
  }

  window.addEventListener("mousemove", (e) => {
      if (slide.classList.contains("swiper-slide-prev")) {
          removeEffect();
          return;
      }

      const rect = slide.getBoundingClientRect();
      const isCursorInsideSlide =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

      if (isCursorInsideSlide) {
          isInside = true;

          let offsetX = e.clientX - rect.left - 250;
          let offsetXPercentage = (offsetX / rect.width) * 100;
          lastX = Math.min(100, Math.max(0, offsetXPercentage));
          lastY = ((e.clientY - rect.top) / rect.height) * 100;

          activeGif.style.maskImage = `radial-gradient(circle at ${lastX}% ${lastY}%, black 24%, transparent 48%)`;
          activeGif.style.webkitMaskImage = `radial-gradient(circle at ${lastX}% ${lastY}%, black 24%, transparent 48%)`;

          activeGif.style.opacity = "1";
          staticImg.style.opacity = "1";
          staticImg.style.filter = "brightness(0.5) saturate(0.5)"; // Dim the static image
      }
  });

  slide.addEventListener("mouseleave", () => {
      if (slide.classList.contains("swiper-slide-prev")) {
          removeEffect();
          return;
      }

      isInside = false;
      let scale = 36.5;
      let interval = setInterval(() => {
          if (isInside || scale <= 0) {
              clearInterval(interval);
              removeEffect();
          } else {
              scale -= 24;
              activeGif.style.maskImage = `radial-gradient(circle at ${lastX}% ${lastY}%, black ${scale}%, transparent ${scale + 1}%)`;
              activeGif.style.webkitMaskImage = `radial-gradient(circle at ${lastX}% ${lastY}%, black ${scale}%, transparent ${scale + 1}%)`;
          }
      }, 30);
  });

  const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
          if (mutation.type === "attributes" && slide.classList.contains("swiper-slide-prev")) {
              removeEffect();
          }
      });
  });

  observer.observe(slide, { attributes: true, attributeFilter: ["class"] });
});







//---------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------ Create the custom cursor element------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------

const customCursor = document.createElement("div");
customCursor.classList.add("custom-cursor");
document.body.appendChild(customCursor);

const interactiveElements = document.querySelectorAll(
  ".next-project-btn, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .Lightbulb, .menu, .icon-buttons"
);

const proximityRadius = 300; // Adjust as needed

// Utility function to update cursor styles
function updateCursorStyles(styles) {
  Object.assign(customCursor.style, styles);
}


// Add or remove the pointer effect based on hovered elements
document.addEventListener("mouseover", (e) => {
    const target = e.target;

    // Check if the element has a pointer cursor
    const isPointer = getComputedStyle(target).cursor === "pointer";

    if (isPointer) {
        customCursor.classList.add("pointer"); // Add pointer effect
    } else {
        customCursor.classList.remove("pointer"); // Remove pointer effect
    }
});

document.addEventListener("mousemove", (e) => {
    const target = e.target;

    if (!customCursor) return;

    // Update cursor position
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;

    // Check if the target is "Next Project" button
    // Check if the target is a pagination bullet
    if (target.classList.contains("swiper-pagination-bullet")) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Adjust cursor position and appearance
        customCursor.style.left = `${centerX}px`;
        customCursor.style.top = `${centerY}px`;
        customCursor.style.transform = `translate(-50%, -50%) scale(1.5)`;
        customCursor.style.backgroundColor = "var(--blanco)";
        customCursor.style.borderRadius = "24px";
        customCursor.style.transition = "transform 0.15s ease-out, width 0.1s ease, background-color 0.3s ease, border-radius 0.3s ease";
        customCursor.style.zIndex = "1";
        customCursor.style.scale = "1.25";
        
    }
    // Check if the target is a swiper slide
    else if (target.classList.contains("active-gif") || target.classList.contains("imagen-contenida")) {    
      customCursor.style.width = "64px";
      customCursor.style.height = "64px";
      customCursor.style.backgroundImage = "url('./Slider/Recursos/Eye.svg')";
      customCursor.style.backgroundRepeat = "no-repeat";
      customCursor.style.backgroundPosition = "center";
      customCursor.style.opacity = "1";
      customCursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      customCursor.style.border = "none";
      customCursor.style.backgroundColor = "var(--Transparente)";
    }
    // Check if the element has a pointer cursor
    else if (window.getComputedStyle(target).cursor === "pointer") {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Adjust cursor appearance for pointer elements
        customCursor.style.transform = `translate(-50%, -50%) scale(3.5)`;
        customCursor.style.left = `${centerX}px`;
        customCursor.style.top = `${centerY}px`;
        customCursor.style.backgroundColor = "var(--blanco)";
        customCursor.style.borderRadius = "24px";
        customCursor.style.transition = "transform 0.15s ease-out, background-color 0.3s ease, border-radius 0.3s ease";
        customCursor.style.zIndex = "2";
    } 
    else if (
        window.getComputedStyle(target).cursor === "text" || // Check if the cursor is set to "text"
        ["P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6"].includes(target.tagName) // Check for text elements
    ) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
    
        // Adjust cursor appearance for text elements
        customCursor.style.transform = `translate(-50%, -50%)`; // Slightly smaller for text
        customCursor.style.width = "4px";
        customCursor.style.height = "58px";
        customCursor.style.backgroundColor = "rgba(7, 126, 105, 0.15)"; // Different color for text
        customCursor.style.borderRadius = "8px"; // Slightly rounded for text
        customCursor.style.transition = "transform 0.15s ease-out, width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-radius 0.3s ease";
        customCursor.style.zIndex = "1"; // Ensure it appears above background
        customCursor.style.border = "1px solid var(--blanco)";
    }
    
    else {
        // Reset the cursor for non-interactive elements
        customCursor.style.transform = `translate(-50%, -50%) scale(1)`;
        customCursor.style.backgroundColor = "var(--blanco)"; // Default color
        customCursor.style.borderRadius = "50%"; // Default shape
        customCursor.style.width = "16px";
        customCursor.style.height = "16px";
        customCursor.style.zIndex = "1000";
        customCursor.style.transition = "transform 0.25s ease-out, width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-radius 0.3s ease, z-index 0.3s ease";
        customCursor.style.scale = "1";        
        customCursor.style.border = "1px solid var(--blanco)";
        customCursor.style.backgroundImage = "none";
        
    }
});


// Ensure the pointer effect is removed on mouse leave
document.addEventListener("mouseout", () => {
    customCursor.classList.remove("pointer");
});

gsap.registerPlugin(MorphSVGPlugin);

function morphCursor(to) {
    gsap.to("#cursorIcon", {
        duration: 0.3, // Smooth transition time
        morphSVG: to,  // Target SVG Path
        ease: "power1.inOut"
    });
}

// Detect hover states and apply morphing
document.addEventListener("mousemove", (e) => {
    const target = e.target;

    // Eye shape when hovering over images
    if (target.classList.contains("active-gif") || target.classList.contains("imagen-contenida")) {
        morphCursor("#eyePath");
    } 
    // Scroll shape when interacting with swiper navigation
    else if (target.classList.contains("swiper-button-next") || target.classList.contains("swiper-button-prev")) {
        morphCursor("#scrollPath");
    }
});



init();
animate();



/* ----------------------------------------------scroll animation ------------------------------------------------------------- */
gsap.registerPlugin(ScrollTrigger);

let isAnimating = false;

// Function to navigate Swiper slides with a smooth transition
const navigateSwiper = (direction) => {
  if (direction > 0) {
    swiper.slideNext(); // Scroll down → Next slide
  } else if (direction < 0) {
    swiper.slidePrev(); // Scroll up → Previous slide
  }
  isAnimating = true;
  // Use GSAP.delayedCall for a smooth delay before allowing another interaction
  gsap.delayedCall(0, () => {
    isAnimating = false;
  });
};

// Scroll Event Listener with improved throttling for silky smooth slide navigation
window.addEventListener("wheel", (e) => {
  const now = Date.now();
  if (now - scrollThrottle < 0) return; // Adjust this delay as needed
  scrollThrottle = now;
  const direction = Math.sign(e.deltaY);
  navigateSwiper(direction);
});

// --------------------------------------------- Transition on Click -----------------------------------------------------
// This section handles the page transition when a user clicks on any target element.
// The animation clones the clicked image, animates it fullscreen, applies a clip-path
// effect to reveal a white overlay, and finally redirects to the new URL.
document.querySelectorAll(".image-container, .imagen-contenida, .active-gif").forEach((element) => {
  // Al hacer clic en el elemento, en lugar de varios gsap.to aislados, crea un timeline:
element.addEventListener("click", function () {
    const slide = this.closest(".swiper-slide");
    const nextPage = slide.getAttribute("data-url");
    if (!nextPage) return;
    
    const image = slide.querySelector(".imagen-contenida");
    if (!image) return;
    
    const rect = image.getBoundingClientRect();
    const clone = image.cloneNode(true);
    document.body.appendChild(clone);
    
    const whiteOverlay = document.createElement("div");
    whiteOverlay.classList.add("white-overlay");
    document.body.appendChild(whiteOverlay);
    
    // Configura el clon en su posición inicial
    gsap.set(clone, {
      position: "fixed",
      top: rect.top + "px",
      left: rect.left + "px",
      width: rect.width + "px",
      height: rect.height + "px",
      zIndex: 1000,
      objectFit: "cover",
      borderRadius: "16px",
      clipPath: "inset(0% 0% 0% 0%)"
    });
    
    // Crea un timeline para encadenar las animaciones
    const tl = gsap.timeline({
      onComplete: () => {
        window.location.href = nextPage;
      }
    });
    
    tl.to(clone, {
      top: "0px",
      left: "0px",
      width: "100vw",
      height: "100vh",
      duration: 0.8,
      ease: "power2.inOut",
      borderRadius: "16px"
    })
    .to(clone, {
      clipPath: "inset(100% 0% 0% 0%)",
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.5") // Se solapa parte de la animación
    .to(whiteOverlay, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut"
    }, "-=0.8"); // Solapa la animación del overlay con la del clon
  });  
});

// --- Personal Photo Navigation ---
// Clicking on the element with the ".projects" class navigates to the URL in its data-url attribute.
document.addEventListener("DOMContentLoaded", () => {
  const personalPhoto = document.querySelector('.projects');
  if (personalPhoto) {
    personalPhoto.addEventListener('click', function () {
      const url = personalPhoto.getAttribute('data-url');
      console.log("Navigating to:", url);
      if (url) {
        window.location.href = url;
      } else {
        console.error("No data-url found!");
      }
    });
  }
});

// --- Smooth Header Animation on Scroll ---
// As the user scrolls, the header slides up or down smoothly.
// This uses GSAP tweens with a natural ease.
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector('.header-section');
  let lastScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScroll && currentScroll > header.offsetHeight) {
      gsap.to(header, { y: "-100%", duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(header, { y: "0%", duration: 0.3, ease: "power2.out" });
    }
    lastScroll = currentScroll <= 0 ? 0 : currentScroll;
  });
});


  /* -------------------------------------------------green-blob---------------------------------------------------
  ------------------------------------------------------------------------------------------------------------------ */

  document.addEventListener("DOMContentLoaded", function () {
    const greenBlob = document.querySelector(".green-blob");

    greenBlob.addEventListener("mousemove", (e) => {
        const rect = greenBlob.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(greenBlob, {
            scaleX: 1.15 - Math.abs(x) * 0.3, // Slight stretch
            scaleY: 1.15 - Math.abs(y) * 0.3, // Slight squish
            duration: 0.2,
            ease: "power2.out"
        });
    });

    greenBlob.addEventListener("mouseleave", () => {
        gsap.to(greenBlob, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.6)" // Smooth bounce-back
        });
    });
});




/* -------------------------------------------------Window on load---------------------------------------------------
------------------------------------------------------------------------------------------------------------------ */
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
  
    const tl = gsap.timeline({
      onComplete: () => {
        loadingScreen.style.display = 'none';
      }
    });
  
    tl.to(loadingScreen, {
      // Se desplaza hacia abajo con una aceleración suave
      y: '100%',
      rotation: 0,        // Rotación sutil para dinamismo
      ease: "power4.in",   // Aceleración elegante
      duration: 1.2,
    })
    .to(loadingScreen, {
      // Se aplica un squash & stretch al impacto
      scaleX: 1,
      scaleY: 1.15,
      ease: "power2.out",
      duration: 0.2
    }, "-=0.3") // Se solapa ligeramente para que el efecto se sienta natural
    .to(loadingScreen, {
      // Se restaura la escala y se elimina la rotación con un rebote sutil
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      ease: "elastic.out(1, 0.35)",
      duration: 0.5
    });
  });
  
  
  


window.onload = () => {
    scrollValue = 0;
    window.scrollTo(0, 0); // Reset scroll to top
    document.documentElement.scrollTop = 0;
  
    // Add the "brillo" class to the icono element (if it exists)
    const icono = document.querySelector(".icon-button");
    if (icono) {
        icono.classList.add("brillo");
    }

    // Call the crearPalabra function
    if (typeof crearPalabra === "function") {
        crearPalabra();
    }



    //-------------- GSAP Timeline for Sequence -----------------
    const timeline = gsap.timeline();

    timeline

        .fromTo(
            ".hero",
            { clipPath: "inset(100% 0 0 0)", borderRadius: "0px"},  // Initial state
            { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.out", borderRadius: "32px", duration: 1 }, // Final state with duration
            "=0.45"
        )
        .fromTo(
            "#canvas1",
            { borderRadius: "0px", clipPath: "inset(0 0 0 100%)"},  // Initial state
            { borderRadius: "4px 32px 4px 32px", duration: 1, clipPath: "inset(0 0 0 0%)", duration: 0.5, ease: "power4.out", stagger: 0.5 } // Final state with duration
        )
        .fromTo(
            ".blur-layer",
            { opacity: 0, y: 0 }, // Start invisible and slightly below
            { opacity: 0.1, y: 0, duration: 2.5, ease: "power4.out", stagger: 0.5 } // Fade and move in
        )
        .fromTo(
            ".personal-photo",
            { opacity: 0, y: 0 }, // Start invisible
            { opacity: 1, y: 0, duration: 0.4, ease: "power4.out", stagger: 0.1 },
            "-=1" // Fade and move in
        )
        .fromTo(
            ".icon-button",
            { opacity: 0, y: 0 }, // Start invisible
            { opacity: 1, y: 0, duration: 0.15, ease: "power4.out", stagger: 0.1 },
            "-=1" // Fade and move in
        )
        .fromTo(
            ".main-title",
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power4.out" },
            "-=1"
        )
        .fromTo(
            ".swiper",
/*             { opacity: 0, x: -300 }, // Start invisible and slightly below
            { opacity: 1, x: 0, duration: 0.85, ease: "power4.out", stagger: 0.25 },
            "=0" // Fade and move in
            ".main-subtitle", */
            { clipPath: "inset(100% 0 0 0)", y: 500},
            { clipPath: "inset(0% 0 0 0)", y:0, duration: 1, ease: "elastic.out(1, 0.9)" },
            "-=0"
        )
        .fromTo(
            ".control-container",
            { opacity: 0, y: 200, x: 0 }, // Start invisible and slightly below
            { opacity: 1, y: -45, x:0, duration: 1.1, ease: "elastic.out(1, 0.85)", stagger: 0.25 },
            "-=.9" // Fade and move in
        )
        .fromTo(
            ".green-blob",
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power4.out" },
            "-=0.5"
        )
        .fromTo(
            ".main-subtitle",
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power4.out" },
            "-=0.65"
        )
        .fromTo(
            ".title",
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power4.out" },
            "-=0.2" // Overlap animation
        )
        .fromTo(
            ".subtitle",
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power4.out" },
            "-=1.2" // Overlap animation
        )
        .fromTo(
            ".about-me-compliment",
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "power4.out" },
            "-=2" // Overlap animation
        )
};