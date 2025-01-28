const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let scrollThrottle = 0;
let scrollValue = 0;
let particlesArray;


//get mouse position for desktop
let mouse = {
    x: null, y: null,
    radius: (canvas.height/100) * (canvas.width/85)
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }, { passive: true }
);

// Get touch position for mobile
window.addEventListener('touchmove', function(event) {
    let touch = event.touches[0]; // Obtiene el primer toque
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
        this.color = '#DEE1E4'; // Updated color
    }

    // Draw individual particles
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color; // Use the updated color
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
            this.color = interpolateColor('#BC244A', '#F6F6F6', t); // Interpolate color
        } else {
            this.color = '#E4E7E9'; // Default color
        }
    
        // Repel away from mouse if within radius
        if (distance < mouse.radius + this.size) {
            let angle = Math.atan2(dy, dx);
            let repelForce = 0.75; // Reduced repulsion force
            this.x -= Math.cos(angle) * repelForce;
            this.y -= Math.sin(angle) * repelForce;
        } else {
            // Gradually move back to origin position
            let returnSpeed = 0.1; // Speed of returning to the grid
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
    let numberOfRows = 45; // Número de filas en la cuadrícula
    let numberOfCols = 90; // Número de columnas en la cuadrícula
    let gridWidth = canvas.width / numberOfCols; // Espaciado horizontal
    let gridHeight = canvas.height / numberOfRows; // Espaciado vertical
    let size = Math.min(canvas.width, canvas.height) * 0.002; // Tamaño proporcional al canvas

    for (let row = 0; row < numberOfRows; row++) {
        for (let col = 0; col < numberOfCols; col++) {
            let x = col * gridWidth + gridWidth / 2; // Posición X centrada en la celda
            let y = row * gridHeight + gridHeight / 2; // Posición Y centrada en la celda

            // Decide si la partícula se mueve horizontalmente o verticalmente
            let moveHorizontal = Math.random() > 0.5;
            let directionX = moveHorizontal ? (Math.random() * 0.2) - 0.1 : 0; // Movimiento en X o quieto
            let directionY = moveHorizontal ? 0 : (Math.random() * 0.2) - 0.1; // Movimiento en Y o quieto

            let color = '#8C5523';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }
}



// animation loop
function animate () {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}
// resize event
window.addEventListener('resize',
    function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.height/80))
        init();
    }, { passive: true }
);

//mouse out event
window.addEventListener('mouseout',
    function () {
        mouse.x = undefined;
        mouse.y = undefined;
    }
);

//touch out event
window.addEventListener('touchend', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

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
        duration: 0.25,
        onComplete: () => {
            // Change the word after fade-out
            palabraFrente.innerHTML = palabras[palabraAleatoria];

            // Fade-in the new word
            gsap.to(palabraFrente, {
                opacity: 1,
                duration: 0.1
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
setInterval(crearPalabra, 2400);


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
    slidesPerView: "1.3",
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
        reverseDirection: true,
    },
    simulateTouch: true,
    allowTouchMove: true,
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
            activeGif.style.webkitMaskImage = `radial-gradient(circle at ${x}% ${y}%, black 32%, transparent 32%)`;

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
// Create the custom cursor element
const customCursor = document.createElement("div");
customCursor.classList.add("custom-cursor");
document.body.appendChild(customCursor);

// Select interactive elements
const interactiveElements = document.querySelectorAll(".next-project-btn, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet");

// Mousemove event for cursor behavior
document.addEventListener("mousemove", (e) => {
    let isNearInteractive = false;

    // Check proximity to interactive elements
    interactiveElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const proximityRadius = 300; // Radius for magnetic effect
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        if (distance < proximityRadius) {
            isNearInteractive = true;

            // Magnetic effect: Adjust cursor position closer to the element
            const pullStrength = 1 - distance / proximityRadius;
            const targetX = centerX + (e.clientX - centerX) * pullStrength;
            const targetY = centerY + (e.clientY - centerY) * pullStrength;

            gsap.to(customCursor, {
                x: targetX,
                y: targetY,
                scale: 1.5,
                backgroundColor: "rgba(246, 246, 246, 0.1)",
                duration: 0.2,
                ease: "power2.out",
            });
        }
    });

    if (!isNearInteractive) {
        // Default cursor behavior
        gsap.to(customCursor, {
            x: e.clientX,
            y: e.clientY,
            scale: 1,
            backgroundColor: "#BC244A",
            duration: 0.2,
            ease: "power2.out",
        });
    }
});

// Mouseover for specific element adjustments
document.addEventListener("mouseover", (e) => {
    const target = e.target;

    // Handle different element interactions
    if (target.classList.contains("next-project-btn")) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        gsap.to(customCursor, {
            x: centerX,
            y: centerY,
            scale: 1.25,
            width: "98px",
            backgroundColor: "#BC244A",
            borderRadius: "24px",
            duration: 0.15,
            ease: "power2.out",
        });
    } else if (target.classList.contains("swiper-pagination-bullet")) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        gsap.to(customCursor, {
            x: centerX,
            y: centerY,
            scale: 1.5,
            backgroundColor: "#BC244A",
            borderRadius: "24px",
            duration: 0.15,
            ease: "power2.out",
        });
    } else if (target.tagName === "P" || target.tagName.startsWith("H")) {
        gsap.to(customCursor, {
            scale: 0.5,
            width: "4px",
            height: "58px",
            backgroundColor: "#BC244A",
            borderRadius: "8px",
            duration: 0.2,
            ease: "power2.out",
        });
    }
});

// Reset cursor on mouseout
document.addEventListener("mouseout", () => {
    gsap.to(customCursor, {
        scale: 1,
        width: "40px",
        height: "40px",
        backgroundColor: "#BC244A",
        borderRadius: "12px",
        duration: 0.25,
        ease: "power2.out",
    });
});

// Touch events for mobile devices
document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    if (touch) {
        gsap.to(customCursor, {
            x: touch.clientX,
            y: touch.clientY,
            duration: 0.2,
            ease: "power2.out",
        });
    }
});

document.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    if (touch) {
        customCursor.style.display = "block";
        gsap.to(customCursor, {
            x: touch.clientX,
            y: touch.clientY,
            duration: 0.2,
            ease: "power2.out",
        });
    }
});

document.addEventListener("touchend", () => {
    customCursor.style.display = "none";
});



// Ensure the pointer effect is removed on mouse leave
document.addEventListener("mouseout", () => {
    customCursor.classList.remove("pointer");
});

// Add touch support for the custom cursor
document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    if (touch) {
        customCursor.style.left = `${touch.clientX}px`;
        customCursor.style.top = `${touch.clientY}px`;
    }
});



// Remove the cursor on touch end
// Show or hide the custom cursor during touch events
document.addEventListener("touchstart", (e) => {
    customCursor.style.display = "block"; // Show custom cursor on touch start
    const touch = e.touches[0];
    if (touch) {
        customCursor.style.left = `${touch.clientX}px`;
        customCursor.style.top = `${touch.clientY}px`;
    }
}, { passive: true });

document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    if (touch) {
        customCursor.style.left = `${touch.clientX}px`;
        customCursor.style.top = `${touch.clientY}px`;
    }
}, { passive: true });

document.addEventListener("touchend", () => {
    customCursor.style.display = "none"; // Hide custom cursor on touch end
}, { passive: true });

// Enable touch interactions for the mask effect
document.querySelectorAll(".swiper-slide").forEach((slide) => {
    const staticImg = slide.querySelector(".static-img"); // Static image
    const activeGif = slide.querySelector(".active-gif"); // Active GIF

    // Trigger mask effect during touchmove
    slide.addEventListener("touchmove", (e) => {
        if (!activeGif) return; // Skip if no active GIF

        const touch = e.touches[0];
        const rect = slide.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 75; // X percentage
        const y = ((touch.clientY - rect.top) / rect.height) * 75; // Y percentage

        activeGif.style.maskImage = `radial-gradient(circle at ${x}% ${y}%, black 20%, transparent 21%)`;
        activeGif.style.webkitMaskImage = `radial-gradient(circle at ${x}% ${y}%, black 28%, transparent 28%)`;
        activeGif.style.opacity = "1"; // Show GIF
        staticImg.style.opacity = "1"; // Keep static image in the background
    }, { passive: true });

    // Reset the mask effect on touchend
    slide.addEventListener("touchend", () => {
        if (!activeGif) return; // Skip if no active GIF

        activeGif.style.transition = "mask-image 1s ease-out, -webkit-mask-image 1s ease-out";
        activeGif.style.maskImage = "none"; // Remove mask
        activeGif.style.webkitMaskImage = "none"; // Remove mask
        activeGif.style.opacity = "0"; // Hide GIF
        staticImg.style.opacity = "1"; // Ensure static image remains visible
    });
}, { passive: true });


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


const scrollLimit = 250; // Define the range (0 to 500)

// Function to update body overflow
const toggleOverflow = (enable) => {
    const state = enable ? "auto" : "hidden";
    document.body.style.overflow = state;
    document.documentElement.style.overflow = state;
};

// Function to handle wheel events
const handleWheelScroll = (e) => {
    const direction = Math.sign(e.deltaY); // Determine scroll direction (+1 or -1)
    const scrollTop = window.scrollY; // Get the vertical scroll position
    const scrollHeight = document.documentElement.scrollHeight; // Total scrollable height
    const clientHeight = window.innerHeight; // Viewport height

    // Accumulate scroll value within range
    scrollValue += direction * 10; // Adjust step size (10 in this case)
    scrollValue = Math.max(0, Math.min(scrollValue, scrollLimit)); // Clamp to 0 – scollLimit

/*     if (scrollValue === 0) { */
        toggleOverflow(false); // Lock scrolling when at the top
    if (scrollValue >= scrollLimit || scrollTop>0) {
        toggleOverflow(true); // Unlock scrolling beyond the range
    }
    else if (scrollTop === 0) {
        toggleOverflow(false); // Lock scrolling
    }

    // Debug: Log the current scrollValue
    console.log("Scroll Value:", scrollValue);
    console.log("Scroll Position:", scrollTop);
};

// Add wheel event listener
window.addEventListener("wheel", handleWheelScroll, { passive: false });






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
            "#canvas1",
            { opacity: 0, y: 0 }, // Start invisible and slightly below
            { opacity: 1, y: 0, duration: 2.75, ease: "power4.out", stagger: 0.5 } // Fade and move in
        )
        .fromTo(
            ".icon-button",
            { opacity: 0, y: 0 }, // Start invisible
            { opacity: 1, y: 0, duration: 0.25, ease: "power4.out", stagger: 0.1 },
            "-=1" // Fade and move in
        )
        .fromTo(
            ".main-title",
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.out" },
            "-=1"
        )
        .fromTo(
            ".swiper",
/*             { opacity: 0, x: -300 }, // Start invisible and slightly below
            { opacity: 1, x: 0, duration: 0.85, ease: "power4.out", stagger: 0.25 },
            "=0" // Fade and move in
            ".main-subtitle", */
            { clipPath: "inset(100% 0 0 0)", y: -250},
            { clipPath: "inset(0% 0 0 0)", y:0, duration: 1.2, ease: "power4.out" },
            "-=0"
        )
        .fromTo(
            ".main-subtitle",
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.out" },
            "-=1.20"
        )
        .fromTo(
            ".title",
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "power4.out" },
            "-=1.20" // Overlap animation
        )
        .fromTo(
            ".subtitle",
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "power4.out" },
            "-=1.20" // Overlap animation
        )
        .fromTo(
            ".control-container",
            { opacity: 0, y: 200, x: 0 }, // Start invisible and slightly below
            { opacity: 1, y: -45, x:0, duration: 0.85, ease: "power4.out", stagger: 0.25 },
            "-=2" // Fade and move in
        )
        .fromTo(
            ".about-me-compliment",
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "power4.out" },
            "-=2" // Overlap animation
        )
};