
function createGrid(canvasWidth, canvasHeight) {
    let container = document.querySelector('.container');
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


function updatePixelValue(e) {
    let numPixels = this.value;
    sliderOutput.textContent = `Pixels: ${numPixels}`;
    let height = width = Math.sqrt(numPixels);
    createGrid(height, width);
}

let slider = document.querySelector('.slider');
let sliderOutput = document.querySelector('.slider-output');

sliderOutput.textContent = slider.value;
createGrid(16, 16);

slider.addEventListener('mouseup', updatePixelValue);
