const grid = document.querySelector('.container');
const clearBtn = document.querySelector('.clear-all-btn');
const rainbowModeBtn = document.querySelector('.rainbow-mode-btn');
const eraser = document.querySelector('.eraser');


let rainbowMode = false;
let eraseMode = false;

// button functionality
clearBtn.addEventListener('click', () => {
    createNewGrid(slider.value); // pass in current number of pixels
});

rainbowModeBtn.addEventListener('click', () => {
    rainbowMode = !rainbowMode;
    rainbowModeBtn.classList.toggle('on');
});

eraser.addEventListener('click', () => {
    eraseMode = !eraseMode;
    eraser.classList.toggle('on');
});

function createGrid(canvasWidth, canvasHeight) {
    for (let i = 0; i < canvasWidth; i++) {
        const row = document.createElement('div');
        row.style.display = 'flex';
        for (let j = 0; j < canvasHeight; j++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.style.height = `${grid.clientHeight / canvasHeight}px`;
            pixel.style.width = `${grid.clientWidth / canvasWidth}px`;
            pixel.addEventListener('mouseover', changeColor);
            row.appendChild(pixel);
        }
        grid.appendChild(row);
    }    
}

function createNewGrid(numPixels) {
    grid.innerHTML = '';
    const canvasWidth = canvasHeight = numPixels;
    createGrid(canvasWidth, canvasHeight);
}

function updatePixelValue(e) {
    const numPixels = slider.value;
    sliderOutput.textContent = `Grid size: ${numPixels} x ${numPixels}`;
    createNewGrid(numPixels);
}

let mouseDown = false;
document.addEventListener('mousedown', () => mouseDown = true);
document.addEventListener('mouseup', () => mouseDown = false);
grid.addEventListener('mouseleave', () => mouseDown = false);

function getRandomColor(){
    const R = Math.round(Math.random() * 256);
    const G = Math.round(Math.random() * 256);
    const B = Math.round(Math.random() * 256);
    return `rgb(${R}, ${G}, ${B})`;
}

function changeColor(e) {
    if (!mouseDown) return;

    let backgroundColor = '';
    if (rainbowMode) {
        backgroundColor = getRandomColor();
    } else if (eraseMode) {
        backgroundColor = '#ffffff';
    } else {
        backgroundColor = 'black';
    } 
    this.style.backgroundColor = backgroundColor;
}

// change pixel density based on slider
const slider = document.querySelector('.slider');
const sliderOutput = document.querySelector('.slider-output');
window.addEventListener('load', updatePixelValue);
slider.addEventListener('mouseup', updatePixelValue);
sliderOutput.textContent = `Pixels: ${slider.value}`;