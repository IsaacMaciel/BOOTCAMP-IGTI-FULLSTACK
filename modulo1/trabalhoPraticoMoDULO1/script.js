window.addEventListener("load",start);

function start() {
    textRed.value = redInput.value;
    textGreen.value = greenInput.value;
    textBlue.value = blueInput.value;
    rgb(red,blue,green);

}

let textRed = document.querySelector('#redText');
textRed.addEventListener('change',changeValueRed)
let textGreen = document.querySelector('#greenText');
let textBlue = document.querySelector('#blueText');


let red = 128;
let blue = 128;
let green = 128;




let redInput = document.querySelector('#red');
redInput.addEventListener('change',changeValueRed)

function changeValueRed(e) {
    textRed.value = e.target.value;
    red = e.target.value;
    rgb(red,green,blue);
}

let greenInput = document.querySelector('#green');
greenInput.addEventListener('change',changeValueGreen)

function changeValueGreen(e) {
    
    textGreen.value = e.target.value;
    green = e.target.value;
    rgb(red,green,blue);

}

let blueInput = document.querySelector('#blue');
blueInput.addEventListener('change',changeValueBlue)

function changeValueBlue(e) {
    textBlue.value = e.target.value;
    blue = e.target.value;
    rgb(red,green,blue);

}

;

function rgb(red,green,blue) {
    let divRgb = document.querySelector('.rgb');
    divRgb.style.backgroundColor = `rgb(${red},${green},${blue})`

}
