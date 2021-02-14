window.onload = init;

class Star{
    constructor(x,y,dx,dy,width){
        this.initX = x;
        this.initY = y;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.width = width;
    }
}

let canvas;
let ctx;

let stars = [new Star(0,0,6,4,1), new Star(200,0,6,4,2),new Star(0,100,6,4,1),
    new Star(0,0,6,4,1), new Star(200,0,6,4,2),new Star(500,0,6,4,3),
    new Star(300,0,6,4,1), new Star(350,0,6,4,2),new Star(0,130,6,4,1),
    new Star(0,200,6,4,3), new Star(500,0,6,4,2),new Star(0,330,6,4,1),
    new Star(0,280,6,4,1), new Star(200,250,6,4,2),new Star(0,90,6,4,1),
    new Star(70,0,12,8,4), new Star(0,40,9,6,2),new Star(0,60,6,4,1)]


function init(){

    console.log("charger");
    canvas = document.querySelector("#myCanvas");

    ctx = canvas.getContext('2d');
    w = canvas.width; 
    h = canvas.height; 
    canvas.onmousedown = gameSelect;
    writeGames();


    document.addEventListener('click',loadMusic)

    requestAnimationFrame(animationLoop);
}

function loadMusic(){

    let musique = new Howl({
        src: "assets/audio/nyanCat.mp3",
        buffer: true,
        loop: true,
        autoplay: false,
        volume: 0.6
      });
    musique.play();

}

function animationLoop(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    writeGames();

    lesEtoilesFilantes();
    requestAnimationFrame(animationLoop);
}

function writeGames(){
    ctx.save();

    ctx.fillStyle = "Pink"
    ctx.font = "38px Calibri";
    ctx.fillText("Selectionnez le jeu:", 140, 140);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "Purple";
    ctx.strokeText("Selectionnez le jeu:", 140, 140);

    ctx.fillStyle = "Purple"
    ctx.font = "26px Calibri";
    ctx.fillText(" - Les croquettes - ", 240, 180);
    //ctx.fillText("- La poursuite ! -", 240, 240);
    ctx.restore();
}


function gameSelect(event){
    if(event.x > 70 && event.x < 400 && event.y > 50 && event.y < 400){
        console.log("Croquettes");
        setTimeout(function(){ document.location.href = "indexCroquettes.html";}, 200);                
    } 
    
    /*else if (event.x > 170 && event.x < 400 && event.y > 192 && event.y < 257){
        console.log("La poursuite !");
        setTimeout(function(){ document.location.href = "indexSurvivalGame.html";}, 200);
    } */
    
    else {
        console.log("Selectionner sur le texte");
    }

}

function lesEtoilesFilantes(){
    stars.forEach(star => {
        drawAStar(star);
        updateAStar(star);
    });

}

function drawAStar(star){
    ctx.save();
  
    ctx.beginPath();
    ctx.moveTo(star.x,star.y);
    ctx.lineTo(star.x+star.dx, star.y+star.dy);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = star.width;
    ctx.stroke();
    ctx.restore();
}

function updateAStar(star){
    star.x += star.dx;
    star.y += star.dy;
    if(star.x > w || star.y > h){
        star.x = star.initX;
        star.y = star.initY;
    }
}