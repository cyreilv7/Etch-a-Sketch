// other page elements
const grid = document.querySelector('.grid');
const slider = document.querySelector('.slider');
const sliderOutput = document.querySelector('.slider-output');

// toggles
const colorSelector = document.querySelector('.color-selector');
const drawBtn = document.querySelector('draw-btn');
const rainbowModeBtn = document.querySelector('.rainbow-mode-btn');
const eraser = document.querySelector('.eraser');
const gridlineToggleBtn = document.querySelector('.gridline-toggle');
const clearBtn = document.querySelector('.clear-all-btn');


// on page load
window.addEventListener('load', updatePixelValue);
colorSelector.value = 'black';
slider.value = 16;

// toggle states
let currentColor = 'black';
let currentMode = 'defaultMode';
toggles = [drawBtn, rainbowModeBtn, eraser]
let gridlineOff = false;

// button functionalities
colorSelector.addEventListener('input', selectColor);
colorSelector.addEventListener('input', changeDrawBtnBackground);
    if (e.target === drawBtn) {
        changeDrawBtnBackground();
    currentMode = mode;
}

// change pixel density
slider.addEventListener('mouseup', updatePixelValue);
sliderOutput.textContent = `Pixels: ${slider.value}`;

// functions
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
            pixel.addEventListener('mousedown', changeColor);
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

function selectColor(e) {
    currentColor = this.value;
}

function hexToDecimal(hex) {
    return parseInt(hex, 16);
}

function getComplimentaryColor(hexString) {
    compR = 255 - hexToDecimal(hexString.slice(1,3));
    compG = 255 - hexToDecimal(hexString.slice(3,5));
    compB = 255 - hexToDecimal(hexString.slice(5,7));
    return `rgb(${compR}, ${compG}, ${compB})`;
}

function changeDrawBtnBackground() {
    drawBtn.style.backgroundColor = colorSelector.value;
    drawBtn.style.color = getComplimentaryColor(colorSelector.value);
}

function getRandomRGB(e) {
    const R = Math.round(Math.random() * 256);
    const G = Math.round(Math.random() * 256);
    const B = Math.round(Math.random() * 256);
    if (R === 0 && G === 0 && B === 0) return getRandomColor();
    return `rgb(${R}, ${G}, ${B})`;
}

function changeColor(e) {
    if (!mouseDown && e.type === 'mouseover') return;

    let backgroundColor = '';
    if (rainbowMode) {
        backgroundColor = getRandomColor();
    } else if (eraseMode) {
        backgroundColor = '#ffffff';
    } else if (defaultMode) {
        backgroundColor = currentColor;
    } 
    this.style.backgroundColor = backgroundColor;
}

function toggleGridlines(e) {
    gridlineOff = !gridlineOff;
    const pixels = document.querySelectorAll('.pixel');
    if (gridlineOff) {
        pixels.forEach(pixel => {
            pixel.style.border = 'none';
        });
    } else {
        pixels.forEach(pixel => {
            pixel.style.removeProperty('border');
        });
    }
}
