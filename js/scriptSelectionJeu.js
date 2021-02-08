window.onload = init;

let canvas;
let ctx;


function init(){
    console.log("charger");
    
    canvas = document.querySelector("#myCanvas");
    canvas.addEventListener('click', gameSelect,false);


  
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
    ctx.font = "26px Calibri";
    ctx.fillText(" - Les croquettes - ", 160, 180);
    ctx.fillText("- SurvivalGame -", 160, 240);
    ctx.restore();
}


function gameSelect(event){
    if(event.x > 70 && event.x < 400 && event.y > 100 && event.y < 180){
        console.log("Croquettes");

        setTimeout(function(){ document.location.href = "indexCroquettes.html";}, 200);                
    } else if (event.x > 170 && event.x < 400 && event.y > 192 && event.y < 257){
        console.log("Survival Game");

        setTimeout(function(){ document.location.href = "indexSurvivalGame.html";}, 200);
    } else {
        console.log("Veuillez selectionner");
    }

}