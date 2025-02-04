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
            this.color = interpolateColor('#077E69', '#F6F6F6', t); 
        } else {
            this.color = '#D1D1D6'; // Default color
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
  grabCursor: false,
  centeredSlides: true,
  initialSlide: 1,
  speed: 500,
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

// Initialize transforms to prevent leftover styles
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.swiper-slide .imagen-contenida').forEach((image) => {
        image.style.transform = 'translateX(0%)';
        image.style.transition = 'none';
    });
});

// Slide change transition handling
swiper.on('slideChangeTransitionStart', () => {
    const activeIndex = swiper.activeIndex;

    document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
        const image = slide.querySelector('.imagen-contenida');
        if (!image) return;

        if (index === activeIndex) {
            image.style.transition = 'transform 0.35s ease-out';
            image.style.transform = 'translateX(0%)'; // Always center the active slide
        } else {
            const offset = (index - activeIndex) * -45; // Calculate offset
            image.style.transition = 'transform 0.6s ease-out'; // Smooth transition
            image.style.transform = `translateX(${offset}%)`; // Apply offset
        }
    });
});

// Reset image position on slide grab
swiper.on('sliderMove', () => {
    document.querySelectorAll('.swiper-slide .imagen-contenida').forEach((image) => {
        image.style.transition = 'none'; // Disable transition during grab
    });
});

// Ensure proper reset on transition end
swiper.on('slideChangeTransitionEnd', () => {
    const activeIndex = swiper.activeIndex;

    document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
        const image = slide.querySelector('.imagen-contenida');
        if (!image) return;

        if (index === activeIndex) {
            // Reset the active slide to the center position
            image.style.transition = 'transform 0.6s ease-out';
            image.style.transform = 'translateX(0%)';
        } else {
            // Ensure inactive slides have the correct offset
            const offset = (index - activeIndex) * -45;
            image.style.transition = 'transform 0.1s ease-out';
            image.style.transform = `translateX(${offset}%)`;
        }
    });
});

// Handle Play/Pause Button Click
/* const playPauseButton = document.querySelector(".swiper-pause");
let isPlaying = false; // State to track if the GIF is playing

playPauseButton.addEventListener("click", () => {
    isPlaying = !isPlaying; // Toggle play state

    const activeSlide = document.querySelector(".swiper-slide-active");
    const staticImg = activeSlide.querySelector(".static-img");
    const activeGif = activeSlide.querySelector(".active-gif");

    if (staticImg && activeGif) {
        if (isPlaying) {
            // Play GIF
            staticImg.style.opacity = "0"; // Hide static image
            activeGif.style.opacity = "1"; // Show GIF
        } else {
            // Pause GIF (show static image)
            staticImg.style.opacity = "1"; // Show static image
            activeGif.style.opacity = "0"; // Hide GIF
        }
    }
});  */

// Add click events for navigation buttons to reset autoplay
document.querySelector(".swiper-button-prev").addEventListener("click", function () {
    swiper.slideTo(swiper.activeIndex - 0); // Retrocede un slide manualmente
    swiper.autoplay.start(); // Reinicia el temporizador de autoplay
});

document.querySelectorAll(".swiper-slide").forEach((slide) => {
    const staticImg = slide.querySelector(".static-img"); // Static image
    const activeGif = slide.querySelector(".active-gif"); // Active GIF

    if (!activeGif || !staticImg) return; // Ensure both elements exist

    // Listen for mouse movement globally
    window.addEventListener("mousemove", (e) => {
        const rect = slide.getBoundingClientRect();
        const isCursorInsideSlide =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

        if (isCursorInsideSlide) {
            const x = ((e.clientX - rect.left) / rect.width) * 100 - 20; // Mouse X percentage
            const y = ((e.clientY - rect.top) / rect.height) * 75 + 5; // Mouse Y percentage

            // Adjust circle size and position with sharp edges
            activeGif.style.maskImage = `radial-gradient(circle at ${x}% ${y}%, black 20%, transparent 21%)`;
            activeGif.style.webkitMaskImage = `radial-gradient(circle at ${x}% ${y}%, black 36%, transparent 37%)`;

            // Ensure the GIF is visible, and the static image stays visible in the background
            activeGif.style.opacity = "1";
            staticImg.style.opacity = "1";
        }
    });

    // Reset the mask on slide leave
    slide.addEventListener("mouseleave", () => {
        if (!activeGif) return;

        // Smooth reset transition
        activeGif.style.transition = "mask-image 1s ease-out, -webkit-mask-image 1s ease-out";
        activeGif.style.maskImage = "none";
        activeGif.style.webkitMaskImage = "none";
        activeGif.style.opacity = "0"; // Hide the GIF
        staticImg.style.opacity = "1"; // Show static image
    });
});


// Create the custom cursor element
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

// Event listener for mouse movement
document.addEventListener("mousemove", (e) => {
  let closestElement = null;
  let closestDistance = proximityRadius;

  // Find the closest interactive element
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

    // Magnetic effect
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
    // Default cursor behavior
    updateCursorStyles({
      left: `${e.clientX}px`,
      top: `${e.clientY}px`,
      transform: `translate(-50%, -50%) scale(1)`,
      backgroundColor: "#077E69",
      transition: "transform 0.2s ease-out, background-color 0.3s ease",
    });
  }
});

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
        customCursor.style.backgroundColor = "#077E69";
        customCursor.style.borderRadius = "24px";
        customCursor.style.transition = "transform 0.15s ease-out, width 0.1s ease, background-color 0.3s ease, border-radius 0.3s ease";
        customCursor.style.zIndex = "2";
        customCursor.style.scale = "1.2";
        
    }
    // Check if the target is a swiper slide
    else if (target.classList.contains("active-gif" || "imagen-contenida")) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Adjust cursor position and appearance
        customCursor.style.backgroundColor = "rgba(7, 126, 105, 0.0)";
        customCursor.style.borderRadius = "50%";
        customCursor.style.border = "1px solid rgba(7, 126, 105, 0.5)";
        customCursor.style.transition = "transform 0.15s ease-out, width 0.1s ease, background-color 0.3s ease, border-radius 0.3s ease";
        customCursor.style.scale = "2";
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
        customCursor.style.backgroundColor = "#077E69";
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
        customCursor.style.border = "1px solid rgba(7, 126, 105, 0.5)";
    }
    
    else {
        // Reset the cursor for non-interactive elements
        customCursor.style.transform = `translate(-50%, -50%) scale(1)`;
        customCursor.style.backgroundColor = "rgba(7, 126, 105, 1)"; // Default color
        customCursor.style.borderRadius = "50%"; // Default shape
        customCursor.style.width = "16px";
        customCursor.style.height = "16px";
        customCursor.style.zIndex = "1000";
        customCursor.style.transition = "transform 0.25s ease-out, width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-radius 0.3s ease, z-index 0.3s ease";
        customCursor.style.scale = "1";        
        customCursor.style.border = "1px solid rgba(7, 126, 105, 1)";
    }
});


// Ensure the pointer effect is removed on mouse leave
document.addEventListener("mouseout", () => {
    customCursor.classList.remove("pointer");
});


init();
animate();



/* ----------------------------------------------scroll animation ------------------------------------------------------------- */
gsap.registerPlugin(ScrollTrigger);

let isAnimating = false;

// Function to navigate Swiper slides
const navigateSwiper = (direction) => {


    if (direction > 0) {
        swiper.slideNext(); // Scroll down → Next slide
    } else if (direction < 0) {
        swiper.slidePrev(); // Scroll up → Previous slide
    }

    // Allow animations to complete before the next interaction
    setTimeout(() => (isAnimating = false), 1200); // Increased duration for slower interaction
};

// Scroll Event Listener with Throttling
window.addEventListener("wheel", (e) => {
    const now = Date.now();
    if (now - scrollThrottle < 200) return; // Adjust the time delay here
    scrollThrottle = now;

    const direction = Math.sign(e.deltaY); // Determine scroll direction
    navigateSwiper(direction);
});

document.querySelectorAll(".image-container, .imagen-contenida, .active-gif").forEach(element => {
    element.addEventListener("click", function () {
        // Find the closest swiper-slide and get its data-url
        const slide = this.closest(".swiper-slide");
        const nextPage = slide.getAttribute("data-url");

        if (!nextPage) return; // Prevent errors if no URL is set

        // Find the static image to animate
        const image = slide.querySelector(".imagen-contenida");
        if (!image) return;

        // Get image position
        const rect = image.getBoundingClientRect();

        // Clone the clicked image
        const clone = image.cloneNode(true);
        document.body.appendChild(clone);

        // Create the white transition overlay
        const whiteOverlay = document.createElement("div");
        whiteOverlay.classList.add("white-overlay");
        document.body.appendChild(whiteOverlay);

        // Set clone's initial position
        gsap.set(clone, {
            position: "fixed",
            top: rect.top + "px",
            left: rect.left + "px",
            width: rect.width + "px",
            height: rect.height + "px",
            zIndex: 1000,
            objectFit: "cover",
            borderRadius: "16px",
            clipPath: "inset(0% 0% 0% 0%)" // Initially fully visible
        });

        // Animate the clone to fullscreen
        gsap.to(clone, {
            top: "0px",
            left: "0px",
            width: "100vw",
            height: "100vh",
            duration: 0.8,
            ease: "power2.inOut",
            borderRadius: "16px"
        });

        // Animate the clip-path to reveal the white background
        gsap.to(clone, {
            clipPath: "inset(100% 0% 0% 0%)", // Moves up, revealing white
            duration: 0.8,
            delay: 0.5, // Wait for the fullscreen effect
            ease: "power2.inOut",
            onComplete: () => {
                window.location.href = nextPage; // Redirect after animation
            }
        });

        // Animate the white background to stay after transition
        gsap.to(whiteOverlay, {
            opacity: 1,
            duration: 0.5,
            delay: 0,
            ease: "power2.inOut"
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const personalPhoto = document.querySelector('.projects');

    if (personalPhoto) {
        personalPhoto.addEventListener('click', function() {
            const url = personalPhoto.getAttribute('data-url');
            console.log("Navigating to:", url); // Debugging message

            if (url) {
                window.location.href = url;
            } else {
                console.error("No data-url found!");
            }
        });
    } else {
        console.error("Element .personal-photo not found!");
    }
});


// Asegúrate de que GSAP esté cargado y que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('.header-section');
    let lastScroll = window.pageYOffset || document.documentElement.scrollTop;
  
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      // Si se ha hecho scroll hacia abajo y se ha superado la altura del header...
      if (currentScroll > lastScroll && currentScroll > header.offsetHeight) {
        // Oculta el header (se desliza hacia arriba)
        gsap.to(header, { y: "-100%", duration: 0.3, ease: "power2.out" });
      } else {
        // Si se hace scroll hacia arriba, muéstralo
        gsap.to(header, { y: "0%", duration: 0.3, ease: "power2.out" });
      }
      lastScroll = currentScroll <= 0 ? 0 : currentScroll; // Asegura que no se vuelva negativo
    });
  });
  


/* -------------------------------------------------Window on load---------------------------------------------------
------------------------------------------------------------------------------------------------------------------ */

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
            "body",
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 0.5, ease: "power4.out"},
            
        )
        .fromTo(
            ".hero",
            { clipPath: "inset(100% 0 0 0)", borderRadius: "0px"},  // Initial state
            { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.out", borderRadius: "32px", duration: 1 }, // Final state with duration
            "-=2"
        )
        .fromTo(
            "#canvas1",
            { borderRadius: "0px", clipPath: "inset(0 0 0 100%)"},  // Initial state
            { borderRadius: "4px 32px 4px 32px", duration: 1, clipPath: "inset(0 0 0 0%)", duration: 0.5, ease: "power4.out", stagger: 0.5 } // Final state with duration
        )
        .fromTo(
            ".blur-layer",
            { opacity: 0, y: 0 }, // Start invisible and slightly below
            { opacity: 0.5, y: 0, duration: 2.5, ease: "power4.out", stagger: 0.5 } // Fade and move in
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