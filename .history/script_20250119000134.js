const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

//get mouse position for desktop
let mouse = {
    x: null, y: null,
    radius: (canvas.height/120) * (canvas.width/120)
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

// Get touch position for mobile
window.addEventListener('touchmove', function(event) {
    let touch = event.touches[0]; // Obtiene el primer toque
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
});

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
            this.color = interpolateColor('#BC244A', '#DEE1E4', t);
        } else {
            this.color = '#DEE1E4'; // Default color
        }
    
        // Repel away from mouse if within radius
        if (distance < mouse.radius + this.size) {
            let angle = Math.atan2(dy, dx);
            let repelForce = 0.5; // Reduced repulsion force
            this.x -= Math.cos(angle) * repelForce;
            this.y -= Math.sin(angle) * repelForce;
        } else {
            // Gradually move back to origin position
            let returnSpeed = 0.05; // Speed of returning to the grid
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
    }
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
//------------------------------- Aquí empieza swiper ----------------------------------------------------- 
//---------------------------------------------------------------------------------------------------------

var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true, // Centers slides
    initialSlide: 1, // Sets the initial slide
    speed: 600,
    preventClicks: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0, // No rotation
        stretch: -170, // Adjusts slide spacing
        depth: 855, // Perspective depth
        modifier: 1,
        slideShadows: false, // No shadows
    },
    breakpoints: {
        768: {
            stretch: -240, // Adjusts stretch for larger screens
        },
    },
    pagination: {
        el: ".swiper-pagination", // Selector for the pagination element
        clickable: true, // Makes the dots clickable
    },
    navigation: {
        nextEl: ".swiper-button-next", // Right arrow button
        prevEl: ".swiper-button-prev", // Left arrow button
    },
    autoplay: {
        delay: 12000, // Moves every 8 seconds
        disableOnInteraction: false, // Prevents autoplay from stopping after interaction
        reverseDirection: true, // Makes autoplay go in reverse
    },
    on: {
        slideChangeTransitionStart: function () {
            // Reset all slides to show static images
            document.querySelectorAll(".swiper-slide").forEach(slide => {
                const staticImg = slide.querySelector(".static-img");
                const activeGif = slide.querySelector(".active-gif");

                if (staticImg) staticImg.style.opacity = "1";
                if (activeGif) activeGif.style.opacity = "0";
            });
        },
    },
});

// Listen for changes to the active slide
swiper.on('slideChangeTransitionStart', () => {
    const activeIndex = swiper.activeIndex;

    // Adjust the position of all slides based on the active slide
    document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
        const image = slide.querySelector('.imagen-contenida');
        if (!image) return;

        // Calculate the percentage offset for the image
        const offset = (index - activeIndex) * 15; // 50% speed
        image.style.transition = 'transform 0.6s ease-out'; // Smooth transition
        image.style.transform = `translateX(${offset}%)`; // Offset the image
    });
});

// Ensure the images reset when transitioning back
swiper.on('slideChangeTransitionEnd', () => {
    document.querySelectorAll('.swiper-slide .imagen-contenida').forEach((image) => {
        image.style.transition = ''; // Clear transition after the effect
    });
});


// Handle Play/Pause Button Click
const playPauseButton = document.querySelector(".swiper-pause");
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
});

// Add click events for navigation buttons to reset autoplay
document.querySelector(".swiper-button-prev").addEventListener("click", function () {
    swiper.slideTo(swiper.activeIndex - 0); // Retrocede un slide manualmente
    swiper.autoplay.start(); // Reinicia el temporizador de autoplay
});

document.querySelectorAll(".swiper-slide").forEach((slide) => {
    const staticImg = slide.querySelector(".static-img"); // Static image
    const activeGif = slide.querySelector(".active-gif"); // Active GIF

    let timeout;

    // Apply the deformation effect on mousemove
    slide.addEventListener("mousemove", (e) => {
        if (!activeGif) return; // Skip if there's no active GIF

        // Clear any existing timeout
        clearTimeout(timeout);

        const rect = slide.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 75; // Mouse X percentage
        const y = ((e.clientY - rect.top) / rect.height) * 75; // Mouse Y percentage

        // Adjust circle size and position with sharp edges
        activeGif.style.maskImage = `radial-gradient(circle at ${x}% ${y}%, black 20%, transparent 21%)`;
        activeGif.style.webkitMaskImage = `radial-gradient(circle at ${x}% ${y}%, black 28%, transparent 28%)`;

        // Ensure the GIF is visible, and the static image stays visible in the background
        activeGif.style.opacity = "1";
        staticImg.style.opacity = "1";
    });

    // Reset the mask and visibility on mouse leave
    slide.addEventListener("mouseleave", () => {
        if (!activeGif) return; // Skip if there's no active GIF

        timeout = setTimeout(() => {
            // Reset the mask and hide the GIF
            activeGif.style.transition = "mask-image 1s ease-out, -webkit-mask-image 1s ease-out"; // Smooth reset
            activeGif.style.maskImage = "none";
            activeGif.style.webkitMaskImage = "none";
            activeGif.style.opacity = "0"; // Hide the GIF
            staticImg.style.opacity = "1"; // Ensure the static image remains visible
        }, 500); // Reset after 0.5 seconds
    });

    // Smooth mask application on mouse enter
    slide.addEventListener("mouseenter", () => {
        if (!activeGif) return; // Skip if there's no active GIF

        activeGif.style.transition = "mask-image 0.5s ease-out, -webkit-mask-image 0.5s ease-out";
    });
});


// Create the custom cursor element
const customCursor = document.createElement("div");
customCursor.classList.add("custom-cursor");
document.body.appendChild(customCursor);

// Update the position of the custom cursor
document.addEventListener("mousemove", (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
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
});

document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    if (touch) {
        customCursor.style.left = `${touch.clientX}px`;
        customCursor.style.top = `${touch.clientY}px`;
    }
});

document.addEventListener("touchend", () => {
    customCursor.style.display = "none"; // Hide custom cursor on touch end
});

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
    });

    // Reset the mask effect on touchend
    slide.addEventListener("touchend", () => {
        if (!activeGif) return; // Skip if no active GIF

        activeGif.style.transition = "mask-image 1s ease-out, -webkit-mask-image 1s ease-out";
        activeGif.style.maskImage = "none"; // Remove mask
        activeGif.style.webkitMaskImage = "none"; // Remove mask
        activeGif.style.opacity = "0"; // Hide GIF
        staticImg.style.opacity = "1"; // Ensure static image remains visible
    });
});


init();
animate();