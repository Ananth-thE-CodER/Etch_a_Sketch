document.addEventListener("DOMContentLoaded", function(e) {
    let sketch_area = document.getElementsByClassName("sketch-area")
    for (var i=0; i<256; i++) {
        let single_grid_div = document.createElement("div")
        single_grid_div.classList.add("grid-div")
        sketch_area[0].appendChild(single_grid_div)
        sketch_area[0].addEventListener("mouseover", drawOnGrid);
    }
})


function drawOnGrid(e) {
    console.log(e.button)
    if (e.type == 'mouseover' && e.buttons == 1) {
        e.target.style.backgroundColor = 'black'
        console.log(e.button)
    }
}