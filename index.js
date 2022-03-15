
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
    updateGrid(numPixels);
}


function toggleOn(e) {
    this.toggle = 'active';
    // console.log(this);
}

function draw(e) {
    if (e.target && e.target.classList[0] == 'pixel') {
        if (this.toggle == 'active' || e.type == 'click') { 
            e.target.style.backgroundColor = 'black';
        }
    }
}

function toggleOff(e) {
    console.log(this);
    if (e.type == 'mouseleave' && e.target !== this) {
        return;
    }
    this.toggle = 'inactive';
}

// intial output
createGrid(16, 16);

// change pixel density based on slider
let slider = document.querySelector('.slider');
let sliderOutput = document.querySelector('.slider-output');
slider.addEventListener('mouseup', updatePixelValue);
sliderOutput.textContent = `Pixels: ${slider.value}`;

// draw on grid
let pixels = document.querySelectorAll('.pixel');
let container = document.querySelector('.container');
container.addEventListener('mousedown', toggleOn);
container.addEventListener('mouseover', draw);
container.addEventListener('mouseleave', toggleOff); // mouseleave instead of mouseout prevents bubbling to its children
container.addEventListener('mouseup', toggleOff);
container.addEventListener('click', draw);
