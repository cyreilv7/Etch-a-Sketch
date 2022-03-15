
function createGrid(canvasWidth, canvasHeight) {
    let container = document.getElementById('grid');
    for (let i = 0; i < canvasWidth; i++) {
        let row = document.createElement('div');
        row.style.display = 'flex';
        for (let j = 0; j < canvasHeight; j++) {
            let pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.style.height = `${container.clientHeight / canvasHeight}px`;
            pixel.style.width = `${container.clientWidth / canvasWidth}px`;
            row.appendChild(pixel);
        }
        container.appendChild(row);
    }    
}

function updateGrid(numPixels) {
    let container = document.getElementById('grid');
    container.innerHTML = '';
    let canvasWidth = canvasHeight = Math.round(Math.sqrt(numPixels));
    createGrid(canvasWidth, canvasHeight);
}

function updatePixelValue(e) {
    let numPixels = this.value;
    sliderOutput.textContent = `Pixels: ${numPixels}`;
    let height = width = Math.sqrt(numPixels);
    updateGrid(numPixels);
}

let slider = document.querySelector('.slider');
let sliderOutput = document.querySelector('.slider-output');

sliderOutput.textContent = slider.value;
createGrid(16, 16);

slider.addEventListener('mouseup', updatePixelValue);
