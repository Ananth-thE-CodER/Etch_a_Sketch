let DEFAULT_GRID_SIZE = 16;
let CURRENT_COLOR = 'rgba(0, 0, 0, 0.1)'
document.addEventListener("DOMContentLoaded", function(e) {
    createGrid(DEFAULT_GRID_SIZE);

    // Change Grid Event
    let button = document.getElementsByClassName("button-div");
    button[0].addEventListener("click", promptChangeGrid);

    // Reset Grid Event
    let resetButton = this.documentElement.getElementsByClassName("reset-button");
    resetButton[0].addEventListener("click", resetGrid);

    //Initialize color picker
    initColorPicker();

    var canvas = document.getElementById('colorpickerCanvas');
    canvas.addEventListener("click", getSelectedColor);
    // canvas.onclick = function(e) {
    //     console.log();
    //     var imgData = canvasContext.getImageData((e.offsetX / canvas.clientWidth) * canvas.width, (e.offsetY / canvas.clientHeight) * canvas.height, 1, 1);
    //     var rgba = imgData.data;
    //     var color = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3] + ")";
    //     return color;
    // }
})


function drawOnGrid(e) {
    if (e.type == 'mouseover' && e.buttons == 1) {
        if (e.target.classList.contains('drawn')) {
            let color = e.target.style.backgroundColor;
            let colorComponents = getColorComponents(color);
            if (colorComponents && colorComponents.A) {
                let alpha = parseFloat(`${colorComponents.A}`);
                let newAlpha = alpha + 0.1;
                e.target.style.backgroundColor = `${colorComponents.R}` + ', ' + `${colorComponents.G}` + ', ' + `${colorComponents.B}` + ', ' + `${newAlpha}` + ')';
            }
            else {
                e.target.style.backgroundColor = `${colorComponents.R}` + ', ' + `${colorComponents.G}` + ', ' + parseFloat(`${colorComponents.B}`) + ', ' + '1' + ')';
            }
        }
        else {
            e.target.style.backgroundColor = CURRENT_COLOR
        }
        e.target.classList.add('drawn')
    }
}

function initColorPicker() {
    var canvas = document.getElementById('colorpickerCanvas');
    // var canvasContext = canvas.getContext('2d');
  
    let gradient = canvas.getContext('2d').createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#ff0000');
    gradient.addColorStop(1 / 6, '#ffff00');
    gradient.addColorStop((1 / 6) * 2, '#00ff00');
    gradient.addColorStop((1 / 6) * 3, '#00ffff');
    gradient.addColorStop((1 / 6) * 4, '#0000ff');
    gradient.addColorStop((1 / 6) * 5, '#ff00ff');
    gradient.addColorStop(1, '#ff0000');
    canvas.getContext('2d').fillStyle = gradient;
    canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);
  
    gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    canvas.getContext('2d').fillStyle = gradient;
    canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);
  
    gradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
    canvas.getContext('2d').fillStyle = gradient;
    canvas.getContext('2d').fillRect(0, 0, canvas.width, canvas.height);
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
    sketch_area.innerHTML = '';
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
    let drawnCells = Array.from(document.getElementsByClassName('drawn'));
    drawnCells.forEach(cell => {
        cell.classList.remove('drawn');
        cell.style.backgroundColor = 'aliceblue';
    });

}

function getColorComponents(str) {
    if (str) {
        let strArray = str.split(',')
        if (strArray.length == 3) {
            return {
                'R': strArray[0],
                'G': strArray[1],
                'B': strArray[2],
            }
        }
        if (strArray.length == 4) {
            return {
                'R': strArray[0],
                'G': strArray[1],
                'B': strArray[2],
                'A': strArray[3],
            }
        }
        return false;
    }
    return false;
}

function getSelectedColor(e) {
    let canvas = document.getElementById('colorpickerCanvas');
    let canvasContext = canvas.getContext('2d');
    let imgData = canvasContext.getImageData((e.offsetX / canvas.clientWidth) * canvas.width, (e.offsetY / canvas.clientHeight) * canvas.height, 1, 1);
    let rgba = imgData.data;
    let color = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + 0.1 + ")";
    let div_color = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + 1 + ")";
    CURRENT_COLOR = color;
    currentColorDiv = document.getElementsByClassName("current-color");
    currentColorDiv[0].style.backgroundColor = div_color;
}