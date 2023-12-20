var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var c = canvas.getContext("2d");


var mouse = {
    x:undefined,
    y:undefined
}
let maxRadius = 50;

const colorArray = [
    "#D9D9D9",
    "#736346",
    "#594731",
    "#8C8070",
    "#BFB6AE"
]
    

window.addEventListener("mousemove",animateMouse);
window.addEventListener("resize",resizeWindow);

function resizeWindow(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
}


function animateMouse(event){
    console.log(event);
    mouse.x = event.x ;
    mouse.y = event.y ;
}

class Circle{
  constructor(x,y,dx,dy,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)] ;
  }
   draw(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.fillStyle = this.color;
    c.fill();
    
  }
  update(){
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
        this.dx = -this.dx; // x kordinatı window u gectiğinde örneğin ; 800 de geçsin dx 'i negaitf yaparak spawnlanma nokatısnı 790 yapıyorum
    }
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
        this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    //* interactivity
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
        if(this.radius < maxRadius){
            this.radius += 1;    
        }
    }else if(this.radius > this.minRadius){
        this.radius -= 1;
    }


    this.draw();
  }
}


var circleArray = [];



function init(){
    circleArray = [];
    for(var i=0;i<800;i++){
        var radius = Math.random()*5 + 1;
        var x = Math.random() * (innerWidth - radius*2) + radius; //? çemberin merkezi 
        var y = Math.random() * (innerHeight - radius*2) + radius;
        var dx = (Math.random()-0.5); 
        var dy = (Math.random()-0.5);
        circleArray.push(new Circle(x,y,dx,dy,radius)) //?.push medtodu dizinin sonuna element ekler
        
    }
}


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight); //! clearRect(x,y,width,height) siler canvasın alanı kadar yazıyoruz
    for(var i = 0 ; i  < circleArray.length ; i++){
        circleArray[i].update();
    }
}
animate();
init();