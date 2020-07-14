//All Drawing related Activities
//Defined constants
const canv = document.getElementById('canvas1') ;
const cntx = canv.getContext('2d');
const video = document.querySelector('#testv');
const toolbox = document.getElementById('toolbox');
const sidein = document.getElementById('sidepanelin');
const sideout = document.getElementById('sidepanelout');
//document.onload=alert("This web application is optimized for Mozilla Firefox");

document.onload=initi()

function initi() {
  resize();
  canv.addEventListener("touchstart", start_draw);
  canv.addEventListener("touchend", stop_draw);
  canv.addEventListener("touchmove", selec);
  canv.addEventListener("mousedown", start_draw);
  canv.addEventListener("mouseup", stop_draw);
  canv.addEventListener("mousemove", selec);
  canv.addEventListener("pointerdown", start_draw);
  canv.addEventListener("pointerup", stop_draw);
  canv.addEventListener("pointermove", selec);
  //window.addEventListener("resize", resize_info);
  document.getElementById("boardcolor").addEventListener("input", board_color);
  start_pencil();
  board_color();
  toggle();
  initi2(); //initializing function from second js
}

function board_color() {
  canv.style.backgroundColor = document.getElementById("boardcolor").value;
}

function resize() {
    canv.width = window.innerWidth-22;
    canv.height = window.innerHeight-22;
}

function resize_info() {
  if(confirm("Resizing will lead to loss of data.Do you want to resize?")) {
    resize();
  }
}

function toggle() {
    if (toolbox.style.width=='0px') {
      toolbox.style.visibility='visible';
      toolbox.style.width='250px';
      sidein.style.visibility='hidden';
    }
    else  {
      toolbox.style.visibility='hidden';
      toolbox.style.width='0px';
      sidein.style.visibility='visible';
    }
    toolbox.height=canv.height;
}

var loc ={x:0 , y:0};

function locator(event) {
  if(event.touches){
    loc.x = event.touches[0].clientX - canv.offsetLeft;
    loc.y = event.touches[0].clientY - canv.offsetTop;
    event.preventDefault();
  }
  else{
   loc.x = event.clientX - canv.offsetLeft;
   loc.y = event.clientY - canv.offsetTop;
  }
}
//eraser varable
var eras = false;

function selec(event) {
  event.preventDefault();
  if(!eras){draw(event);}
  else if(eras){erase(event);}
  else{alert("An error has occoured please refresh the page");}
}

//drawing
var strok = false;
function start_draw(event) {
  event.preventDefault();
  locator(event);
  strok =true;
}

function stop_draw(event) {
  event.preventDefault();
  strok=false;
}

function draw(event) {
  if (!strok){return;}
  event.preventDefault();
  cntx.beginPath();
  cntx.lineCap = 'round';
  cntx.lineWidth = document.getElementById('strokewidth').value;
  cntx.strokeStyle = document.getElementById('strokecolor').value;
  cntx.moveTo(loc.x,loc.y);
  locator(event);
  //document.getElementById('toolscontainer').innerHTML = "X:" + loc.x +"   Y:" + loc.y ; //for testing
  cntx.lineTo(loc.x,loc.y);
  cntx.stroke();
}

function clear_page() {
  cntx.clearRect(0,0,canv.width,canv.height);
  //cntx.fillstyle=document.getElementById("boardcolor").value;
  //cntx.fillRect(0, 0, canv.width, canv.height);
}

//Erasing
var eras = false;
function start_eraser() {
  eras = true;
  document.getElementById('eraser').style.color = 'white';
  document.getElementById('eraser').style.backgroundColor = 'black';
  document.getElementById('pencil').style.color = 'black';
  document.getElementById('pencil').style.backgroundColor = 'white';
}

function erase() {
  if (!strok){return;}
  cntx.clearRect((loc.x - ((5*document.getElementById('strokewidth').value)/2)),(loc.y - ((5*document.getElementById('strokewidth').value)/2)),(5*document.getElementById('strokewidth').value),(5*document.getElementById('strokewidth').value))
  locator(event);
}

//Toggle basck to pencil
function start_pencil() {
  eras=false;
  document.getElementById('eraser').style.color = 'black';
  document.getElementById('eraser').style.backgroundColor = 'white';
  document.getElementById('pencil').style.color = 'white';
  document.getElementById('pencil').style.backgroundColor = 'black';
}
