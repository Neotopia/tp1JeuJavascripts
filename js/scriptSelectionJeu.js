window.onload = init;

let canvas;
let ctx;
let audio = new Audio('assets/audio/nyanCat.mp3');

function init(){
    console.log("charger");
    
    canvas = document.querySelector("#myCanvas");
    canvas.addEventListener('click', gameSelect,false);
    
    audio.play();

  
    ctx = canvas.getContext('2d');
    writeGames();

    //document.addEventListener('click',loadMusic)

    requestAnimationFrame(animationLoop);
}

function animationLoop(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    writeGames();
   
    requestAnimationFrame(animationLoop);
}

function writeGames(){
    ctx.save();

    ctx.fillStyle = "Pink"
    ctx.font = "38px Calibri";
    ctx.fillText("Selectionnez votre jeu:", 140, 140);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "Purple";
    ctx.strokeText("Selectionnez votre jeu:", 140, 140);

    ctx.fillStyle = "Purple"
    ctx.font = "26px Calibri";
    ctx.fillText(" - Les croquettes - ", 240, 180);
    ctx.fillText("- La poursuite ! -", 240, 240);
    ctx.restore();
}


function gameSelect(event){
    if(event.x > 70 && event.x < 400 && event.y > 140 && event.y < 200){
        console.log("Croquettes");
        setTimeout(function(){ document.location.href = "indexCroquettes.html";}, 200);                
    } 
    
    else if (event.x > 170 && event.x < 400 && event.y > 192 && event.y < 257){
        console.log("La poursuite !");
        setTimeout(function(){ document.location.href = "indexSurvivalGame.html";}, 200);
    } 
    
    else {
        console.log("Selectionner sur le texte");
    }

}