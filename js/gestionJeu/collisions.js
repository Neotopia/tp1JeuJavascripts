function traiteCollisionsBalleAvecBords(b) {
  // COLLISION A DROITE
    if (b.x + b.rayon > canvas.width) {
      // Pour ne pas que l'objet donne l'impression
      // d'aller plus loin que le bord de l'écran, on le remet au point de contact
      b.x = canvas.width - b.rayon; // point de contact
      b.vitesseX = -b.vitesseX;
    } 
  // COLLISION A GAUCHE
    else if (b.x - b.rayon < 0) {
      b.x = b.rayon; // point de contact
      b.vitesseX = -b.vitesseX;
    }
  // COLLLISION BORDS SUPERIEUR ET INFERIEUR
    if (b.y - b.rayon < 0) {
      b.y = b.rayon; // point de contact
      b.vitesseY = -b.vitesseY;
    } else if (b.y + b.rayon > canvas.height) {
      b.y = canvas.height - b.rayon; // point de contact
      b.vitesseY = -b.vitesseY;
    }
  }
  
  function traiteCollisionsJoueurAvecBords() {
  // COLLISION A DROITE  
    if (monstre.x > canvas.width - monstre.l) {
      monstre.x = canvas.width - monstre.l;
      monstre.vitesseX = -monstre.vitesseX;
    } 
  // COLLISION A GAUCHE  
    else if (monstre.x < 0) {
      monstre.x = 0; 
      monstre.vitesseX = -monstre.vitesseX;
    }
  // COLLLISION BORDS SUPERIEUR ET INFERIEUR
    if (monstre.y < 0) {
      monstre.y = 0;
      monstre.vitesseY = -monstre.vitesseY;
    } else if (monstre.y + monstre.h > canvas.height) {
      monstre.y = canvas.height - monstre.h;
      monstre.vitesseY = -monstre.vitesseY;
    }
  }
  

  // Collision between circle-circle
  function circleCollide(x1, y1, r1, x2, y2, r2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return dx * dx + dy * dy < (r1 + r2) * (r1 + r2);
  }

  // Collisions between aligned rectangles
  function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
   
    if ((x1 > (x2 + (w2 - 18))) || ((x1 + w1 - 50) < x2))
       return false; // No horizontal axis projection overlap
    if ((y1 > (y2 + h2 )) || ((y1 + h1 - 25) < y2))
       return false; // No vertical axis projection overlap
    return true; // If previous tests failed, then both axis projections
                 // overlap and the rectangles intersect
  }

  // Collisions between rectangle and circle
  function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
     var testX=cx;
     var testY=cy;
     if (testX < x0) testX=x0;
     if (testX > (x0+w0)) testX=(x0+w0);
     if (testY < y0) testY=y0;
     if (testY > (y0+h0)) testY=(y0+h0);
     return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))< r*r);
  }