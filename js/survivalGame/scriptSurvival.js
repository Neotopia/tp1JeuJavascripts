//import monstre from 'Balle.js';  --oblige de marque export default classe balle, 
//change aussi import de script dans index
window.onload = init;

let canvas;
let ctx;
let niveauCourant= 1;
let scoreCourant = 0;
let etatJeu = "MenuPrincipal";
let status = "survival";

let assets;
let ennemie;

//stocker les objets graphiques du jeu, ennemis, etc.
let tableauDesBalles = [];
let tableauDesEnnemies = [];

    
//programme principal
function init(){
    console.log(
        "Page chargée : DOM Ready : toutes les ressources de la page sont chargés"
    );
    loadAssets(startGame);
    
    //loadAssets(startGame);
}

function startGame(assetsLoaded) {
//function startGame(assetsLoaded) {
    //on recupere grace a la selector API un pointeur sur le canvas
    // ca a rien renvoyé sans le main,
    canvas = document.querySelector("#myCanvas");

    //on ajoute des écouteurs souris/clavier sur le canvas
    canvas.onmousedown = traiteMouseDown; // c'est des poineurs sur les fonction, les () c'est quand on execute les fct
    canvas.onmouseup = traiteMouseUp;
    canvas.onmousemove = traiteMouseMove;

    // canvas.addEventListener("mousedown", traiteMouseDown)
    //le canvas ne peut detecter les touches que si il a focus (voir mooc)
    //plus simple de mettre l'ecouteur sur le doc (la page)
    document.onkeydown = traiteKeyDown;
    document.onkeyup = traiteKeyUp;

    //pour dessiner, on a besoin de son "contexte graphique", un objet qui 
    //va permettre de dessiner, ou chabger les propriété du canvas
    //largeur du trait, couleur, repère etc...)

    ctx = canvas.getContext("2d");
    assets = assetsLoaded;

    //console.log(monstre.donneTonNom);
    creerEnnemie();
    creerDesBalles(niveauCourant + 1);
    

    requestAnimationFrame(animationLoop);
    //setInterval(changeCouleur, 1000) //appelle la fonction changeCouleur touteles 1000 ms
    
}


function creerDesBalles(nb){
  let tabCouleur = ["red", "green", "yellow"];

  for (let i=0; i<nb; i++){
    let x = 30 + Math.random() * canvas.width;
    let y = 30 + Math.random() * canvas.height;
    let rayon = 5 + Math.random() * 30;
    let indexCouleur = Math.floor(Math.random() * tabCouleur.lenght);
    let couleur = tabCouleur [indexCouleur];
    let vx = -5 + Math.random() * 10;
    let vy = -5 + Math.random() * 10;

    let b = new Balle(x, y, rayon, couleur, vx, vy);

     // on ajoute la balle au tableau
    tableauDesBalles.push(b);
  }

};

function creerEnnemie(){
  ennemie = new Poissons(0, 0, assets["gentle"], 80, 80, 1);
  tableauDesEnnemies.push(ennemie);
}

function afficheInfoJeu(){
  ctx.save();
  ctx.fillStyle = "orange";
  ctx.font = "30pt Calibri";
  ctx.fillText("Niveau : " + niveauCourant, 400, 40);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "red";
  ctx.strokeText("Niveau : " + niveauCourant, 400, 40);

  ctx.fillStyle = "white";
  ctx.font = "20pt Calibri";
  ctx.fillText("Score : " + scoreCourant, 50, 40);

  //ctx.fillText(etatJeu, 300, 100);
  ctx.restore();
}

function animationLoop(){
    // 1 on efface le canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);
    afficheInfoJeu(); // scores, niveau etc.

    switch (etatJeu) {
      case "MenuPrincipal":
        afficheMenuPrincipal();
        break;
      case "JeuEnCours":
        updateJeu();
        break;
      case "EcranChangementNiveau":
        afficheEcranChangementNiveau();
        break;
      case "GameOver":
        afficheEcranGameOver();
        niveauCourant = 1;
    }
    
  // 5 On demande au navigateur de rappeler la fonction
  // animationLoop dans 1/60ème de seconde
    requestAnimationFrame(animationLoop);
}

function afficheMenuPrincipal(){
    ctx.save();
    ctx.translate(0, 100);
    ctx.fillStyle = "green";
    ctx.font = "30pt Calibri";
    ctx.fillText("MENU PRINCIPAL", 100, 20);

    ctx.fillText("Cliquez pour démarrer", 65, 60);

    ctx.restore();
}

function afficheEcranChangementNiveau() {
  ctx.save();
  ctx.translate(0, 100);
  ctx.fillStyle = "green";
  ctx.font = "30pt Calibri";
  ctx.fillText("Changement niveau", 100, 20);

  ctx.fillText("Cliquez pour niveau suivant", 65, 60);

  ctx.restore();
}

function afficheEcranGameOver() {
  ctx.save();
  ctx.translate(-70, 150);
  ctx.fillStyle = 'white';
  ctx.font="70pt Calibri";
  ctx.fillText("Game Over :(", 100, 20);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.strokeText("Game Over :(", 100, 20);
 
  ctx.restore();
}

function niveauSuivant() {
  console.log("NIVEAU SUIVANT");
  niveauCourant ++ ;
  creerDesBalles(niveauCourant + 5);
  etatJeu = "JeuEnCours";
}

function updateJeu() {
  monstre.draw(ctx);

  updateBalles();
  // 3 on déplace les objets
  monstre.move();
  //deplacerLesBalles();

  // 4 on peut faire autre chose (par ex: detecter des collisions,
  // ou prendre en compte le clavier, la souris, la manette de jeu)
  traiteCollisionsJoueurAvecBords();


}

function traiteCollisionBalleAvecMonstre(b) {
    if (
      circRectsOverlap(
        monstre.x,
        monstre.y,
        monstre.l,
        monstre.h,
        b.x,
        b.y,
        b.rayon
      )
    ) {
      console.log("COLLISION....");
      // on cherche l'index de la balle dans le tableau des balles
      let index = tableauDesBalles.indexOf(b);
  
      // pour supprimer un élément : on utilise la méthode splice(index, nbElementsASupprimer) sur le tableau
      tableauDesBalles.splice(index, 1);

      scoreCourant+=10;
      
      if (tableauDesBalles.length == 0) {
        etatJeu = "EcranChangementNiveau";
      }
      //b.couleur = "pink";
    }
  }

  function updateBalles() {
    // utilisation d'un itérateur sur le tableau
    tableauDesBalles.forEach((b) => {
      b.draw(ctx);
      traiteCollisionsBalleAvecBords(b);
      traiteCollisionBalleAvecMonstre(b);
      b.move();
    });
  }






/*function changeCouleur () {
this.xoeil = 450 + Math.random() * 5 ;
}*/