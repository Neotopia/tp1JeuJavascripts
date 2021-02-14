window.onload = init;

let canvas;
let ctx;
let niveauCourant= 1;
let scoreCourant = 0;
let etatJeu = "MenuPrincipal";

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
}

function startGame(assetsLoaded) {
    //on recupere grace a la selector API un pointeur sur le canvas
    canvas = document.querySelector("#myCanvas");

    //on ajoute des écouteurs souris/clavier sur le canvas
    canvas.onmousedown = traiteMouseDown; 
    canvas.onmouseup = traiteMouseUp;
    canvas.onmousemove = traiteMouseMove;

    document.onkeydown = traiteKeyDown;
    document.onkeyup = traiteKeyUp;

    //pour dessiner, on a besoin de son "contexte graphique", un objet qui 
    //va permettre de dessiner, ou charger les propriété du canvas
    //largeur du trait, couleur, repère etc...)

    ctx = canvas.getContext("2d"); 
    assets = assetsLoaded;

    assets.xmas.play();
    // Initialisation des objets
    creerBalles(5);
    creerEnnemies(1);

    // Lancer l'animation
    requestAnimationFrame(animationLoop);   
}


function creerBalles(nb){
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

function creerEnnemies(nb){
  ennemie = new Ennemies(0, 0, assets["dog"], 80, 80, 1);
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

  ctx.restore();
}

function animationLoop(){
    // On efface le canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);

    // On affiche les informations
    afficheInfoJeu(); // scores, niveau etc.

    // Gestion de l'affichage en fonction de l'état du jeu
    switch (etatJeu) {

      case "MenuPrincipal":
        afficheMenuPrincipal();
        niveauCourant = 1;
        ennemie.vitesse = 1;
        scoreCourant = 0;
        break;

      case "JeuEnCours":
        updateJeu();
        break;

      case "EcranChangementNiveau":
        if (niveauCourant == 3 ){
          console.log("YOU WIN");
          etatJeu = "End";
        }else{
          afficheEcranChangementNiveau();
        }   
        break;

      case "GameOver":
        afficheEcranGameOver();
        ennemie.x = 0;
        ennemie.y = 0;
        break;

      case "End":
       afficheEcranEnd();
       break;
    }
    
  // On demande au navigateur de rappeler la fonction animationLoop 
  // dans 1/60ème de seconde
    requestAnimationFrame(animationLoop);
}

function afficheMenuPrincipal(){
    ctx.save();
    ctx.translate(0, 150);
    ctx.fillStyle = "yellow";
    ctx.font = "40pt Calibri";
    ctx.fillText("MENU PRINCIPAL", 120, 20);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "darkGreen";
    ctx.strokeText("MENU PRINCIPAL", 120, 20);
    ctx.fillStyle = "white";
    ctx.font = "40pt Calibri";
    ctx.fillText("Cliquez pour démarrer", 65, 90);

    ctx.restore();
}

function afficheEcranChangementNiveau() {

    ctx.save();
    ctx.translate(0, 100);
    ctx.fillStyle = "green";
    ctx.font = "50pt Calibri";
    ctx.fillText("Changement niveau", 100, 20);

    ctx.fillText("Cliquez pour niveau suivant", 65, 60);

    ctx.restore(); 
}

function afficheEcranGameOver() {
  ctx.save();
  ctx.translate(-20, 150);
  ctx.fillStyle = 'white';
  ctx.font="70pt Calibri";
  ctx.fillText("Game Over", 100, 20);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.strokeText("Game Over", 100, 20);

  ctx.translate(60, 150);
  ctx.fillStyle = 'white';
  ctx.font="55pt Arial";
  ctx.fillText("Too Bad", 100, 20);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.strokeText("Too Bad", 100, 20);
 
  ctx.restore();
}
function afficheMenuPrincipal(){
    ctx.save();
    ctx.translate(0, 150);
    ctx.fillStyle = "yellow";
    ctx.font = "40pt Calibri";
    ctx.fillText("MENU PRINCIPAL", 120, 20);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "darkGreen";
    ctx.strokeText("MENU PRINCIPAL", 120, 20);
    ctx.fillStyle = "white";
    ctx.font = "40pt Calibri";
    ctx.fillText("Cliquez pour démarrer", 65, 90);

    ctx.restore();
}

function afficheEcranChangementNiveau() {

    ctx.save();
    ctx.translate(0, 150);
    ctx.fillStyle = "white";
    ctx.font = "40pt Calibri";
    ctx.fillText("Changement niveau", 100, 20);

    ctx.font = "30pt Calibri";
    ctx.fillText("Cliquez pour niveau suivant", 85, 100);

    ctx.restore(); 
}

function afficheEcranGameOver() {
  ctx.save();
  ctx.translate(-20, 150);
  ctx.fillStyle = 'white';
  ctx.font="70pt Calibri";
  ctx.fillText("Game Over", 100, 20);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.strokeText("Game Over", 100, 20);

  ctx.translate(60, 150);
  ctx.fillStyle = 'white';
  ctx.font="55pt Arial";
  ctx.fillText("Too Bad", 100, 20);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.strokeText("Too Bad", 100, 20);
 
  ctx.restore();
}

function afficheEcranGameOver() {
  ctx.save();
  ctx.translate(-20, 150);
  ctx.fillStyle = 'white';
  ctx.font="70pt Calibri";
  ctx.fillText("Game Over", 100, 20);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.strokeText("Game Over", 100, 20);

  ctx.translate(70, 130);
  ctx.fillStyle = 'white';
  ctx.font="55pt Arial";
  ctx.fillText("Too Bad", 100, 20);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.strokeText("Too Bad", 100, 20);

  ctx.restore();
}

function afficheEcranEnd() {
  
  ctx.save();
  ctx.translate(-70, 150);
  ctx.fillStyle = 'orange';
  ctx.font="70pt Calibri";
  ctx.fillText("YOU WIN", 200, 20);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "red";
  ctx.strokeText("YOU WIN", 200, 20);

  ctx.fillStyle = 'white';
  ctx.font="30pt Calibri";
  ctx.fillText("Mais...", 300, 100);
  ctx.font="30pt Calibri";
  ctx.fillText("Promenons encore le chien !", 125, 140);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  
 
  ctx.restore();
}

function niveauSuivant() {
  console.log("NIVEAU SUIVANT");
  niveauCourant++;
  creerBalles(niveauCourant + 5);
  ennemie.vitesse = ennemie.vitesse + 0.4;
  ennemie.x = 0;
  ennemie.y = 0;
  
 etatJeu = "JeuEnCours";
}

function updateJeu() {
  // On dessine notre monstre
  monstre.draw(ctx);

  // On instancie nos objets
  updateBalles();
  updateEnnemies();

  // 3 on déplace les objets
  monstre.move();
  //deplacerLesBalles();

  // On detecte les collisions,
  traiteCollisionsJoueurAvecBords();
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

function updateEnnemies() {
  // utilisation d'un itérateur sur le tableau
  tableauDesEnnemies.forEach((ennemie) => {
    ennemie.draw(ctx);
 
    traiteCollisionsJoueurAvecEnnemies(ennemie);
    ennemie.move();
  });
}

function traiteCollisionsJoueurAvecEnnemies(ennemie){
  if (
    rectsOverlap(
    monstre.x,
    monstre.y,
    monstre.l,
    monstre.h,
    ennemie.x ,
    ennemie.y,
    ennemie.l,
    ennemie.h
    )
  ){
    console.log("COLLISION AVEC L'ENNEMIE");
    assets.bark.play();
    etatJeu = "GameOver";
    }


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
      assets.plop.play();
  
      // pour supprimer un élément : on utilise la méthode splice(index, nbElementsASupprimer) sur le tableau
      tableauDesBalles.splice(index, 1);

      scoreCourant+=10;

      // Niveau fini
      if (tableauDesBalles.length == 0) {
        etatJeu = "EcranChangementNiveau";
      }
  
    }
  }
