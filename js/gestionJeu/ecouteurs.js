let mousePos = {};

function traiteMouseDown(event) {
  //console.log("Souris clickée dans le canvas bouton " + event.button);

  // Gestion des etats des jeux
  switch (etatJeu) {
    case "MenuPrincipal":
      etatJeu = "JeuEnCours";
      break;
    case "EcranChangementNiveau":
      niveauSuivant();
      let spanNiveau = document.querySelector("#niveau");
      spanNiveau.innerHTML = "<i>" + niveauCourant + "</i>";
      break;
    case "GameOver":
      etatJeu = "MenuPrincipal"
      break;

    case "End":
      niveauSuivant();
      break;   
    }

}


function traiteMouseUp(event) {
    //console.log("Souris relâchée dans le canvas bouton " + event.button);

}

function traiteMouseMove(event) {
  // Gestion du déplacement du monstre dans le canvas en fonction de la souris
  var rect = canvas.getBoundingClientRect();

  mousePos.x = event.clientX - rect.left;
  mousePos.y = event.clientY - rect.top;
    
  monstre.setPos(mousePos.x, mousePos.y);
  
  if(status != "survival"){
    tableauDesEnnemies.forEach((ennemie) => {
    ennemie.setTarget(mousePos.x, mousePos.y);
    });
  }
}

function traiteKeyDown(event) {
  // Gestion du déplacement du monstre dans le canvas en fonction du clavier
  switch (event.key) {
    case "ArrowLeft":
      monstre.vitesseX = -5;
      break;
    case "ArrowRight":
      monstre.vitesseX = 5;
      break;
    case "ArrowUp":
      monstre.vitesseY = -5;
      break;
    case "ArrowDown":
      monstre.vitesseY = 5;
      break;
  }
}

function traiteKeyUp(event) {
  switch (event.key) {
    case "ArrowLeft":
    case "ArrowRight":
      monstre.vitesseX = 0;
      break;
    case "ArrowUp":
    case "ArrowDown":
      monstre.vitesseY = 0;
      break;
  }
}