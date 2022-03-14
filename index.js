let container = document.querySelector('.container');

let canvasWidth = 16;
let canvasHeight = 16;

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

