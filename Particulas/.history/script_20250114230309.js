const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

//get mouse position
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
        this.color = color;
    }

    //method to draw individual particles
    draw() {
        ctx.beginPath();

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillstyle = '#ffffff';
        ctx.fill();
    }
    //check particle position, check mouse position, move the partivle, draw the particle
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
    
        if (distance < mouse.radius + this.size) {
            // Repel away from mouse with slower force
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
    let numberOfRows = 30; // Número de filas en la cuadrícula
    let numberOfCols = 50; // Número de columnas en la cuadrícula
    let gridWidth = canvas.width / numberOfCols; // Espaciado horizontal
    let gridHeight = canvas.height / numberOfRows; // Espaciado vertical
    let size = Math.min(canvas.width, canvas.height) * 0.003; // Tamaño proporcional al canvas

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


init();
animate();