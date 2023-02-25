let DEFAULT_GRID_SIZE = 16;
let GRID_STATE_CHANGED = false
document.addEventListener("DOMContentLoaded", function(e) {
    createGrid(DEFAULT_GRID_SIZE);

    // Change Grid Event
    let button = document.getElementsByClassName("button-div");
    button[0].addEventListener("click", promptChangeGrid);

    // Reset Grid Event
    let resetButton = this.documentElement.getElementsByClassName("reset-button");
    resetButton.addEventListener("click", resetGrid);
})


function drawOnGrid(e) {
    if (e.type == 'mouseover' && e.buttons == 1) {
        e.target.style.backgroundColor = 'black';
        console.log(e.button);
        GRID_STATE_CHANGED = true;
    }
}

function promptChangeGrid(e) {
    let gridSize = prompt("Please enter a new value for your grid..The value should be between 16 and 100.")
    if (gridSize != null && gridSize >= 16 && gridSize <= 100) {
        DEFAULT_GRID_SIZE = gridSize;
        createGrid(DEFAULT_GRID_SIZE);
    }
}

function createGrid(size = 16) {
    let sketch_area = document.getElementById("sketch-area");
    sketch_area.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    sketch_area.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    let realSize = size * size;
    resetGrid();
    sketch_area.style.setProperty('--grid-size', size);
    for (var i=0; i<realSize; i++) {
        let single_grid_div = document.createElement("div");
        single_grid_div.classList.add("grid-div");
        let gridCellSize = 500 / (parseInt(`${size}`) + 0.1);
        single_grid_div.style.width = gridCellSize + 'px';
        single_grid_div.style.height = gridCellSize + 'px';
        sketch_area.appendChild(single_grid_div);
        sketch_area.addEventListener("mouseover", drawOnGrid);
    }
    let widthText = document.getElementsByClassName("grid-width");
    let heightText = document.getElementsByClassName("grid-height");
    widthText[0].innerText = size;
    heightText[0].innerText = size;
}

function resetGrid(e) {
    let sketch_area = document.getElementById("sketch-area");
    sketch_area.innerHTML = '';
    // createGrid(DEFAULT_GRID_SIZE);
}