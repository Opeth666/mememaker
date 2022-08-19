const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("clear");
const eraserBtn = document.getElementById("eraser");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;

function onMove(event) {

    if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function onMouseDown() {
    isPainting = true;
}
function onMouseUp() {
    isPainting = false;
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    console.log(event.target.value)
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = event.target.dataset.color;
    ctx.fillStyle = event.target.dataset.color;
    color.value = colorValue;
}

function onModeClick(){
    if(isFilling) {
        isFilling = false;
        modeBtn.innerText = "그리기모드 작동중";
    } else {
        isFilling = true;
        modeBtn.innerText = "채우기모드 작동중";
    }
}

let filledColor = "white";

function onCanvasClick(){
    if(isFilling) {
        ctx.fillRect(0,0,CANVAS_HEIGHT, CANVAS_WIDTH)
        filledColor = ctx.fillStyle;
    }
}

function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT)
}
function onEraserClick(){
    ctx.strokeStyle = filledColor;
    isFilling = false;
    modeBtn.innerText = "그리기모드 작동중"
}

function onFileChange(event){
    console.dir(event.target);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        fileInput.value = null;
    }

}

function onDoubleClick(event){
    const text = textInput.value;
    if (text !=="") {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "48px serif"
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();
    }
}

function onSaveClick(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}


canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
document.addEventListener("mouseleave", onMouseUp);
canvas.addEventListener("mousedown", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change",onColorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click",onModeClick);
destroyBtn.addEventListener("click",onDestroyClick);
eraserBtn.addEventListener("click",onEraserClick);
fileInput.addEventListener("change",onFileChange);
saveBtn.addEventListener("click",onSaveClick);