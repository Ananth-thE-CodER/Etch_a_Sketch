document.addEventListener("DOMContentLoaded", function(e) {
    let sketch_area = document.getElementsByClassName("sketch-area")
    for (var i=0; i<256; i++) {
        let single_grid_div = document.createElement("div")
        single_grid_div.classList.add("grid-div")
        sketch_area[0].appendChild(single_grid_div)
    }
})