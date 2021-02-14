class Ennemies {
    x;
    y;
    img;
    l;
    h;
    vitesseX =0;
    vitesseY =0;
    
    constructor(x, y, img, l, h, vitesse) {
      this.x = x;
      this.y = y;
      this.l = l;
      this.h = h;
      this.img = img;
      if(vitesseX) this.vitesseX = vitesseX;
      if(vitesseY) this.vitesseY = vitesseY;  
    }

    
    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y );
          ctx.drawImage(this.img, 0, 0, this.l, this.h);
  
      ctx.restore();
    }
  
    move() {
      // si aucune cible n'est définie, on ne fait rien
      this.x += this.vitesseX;
      this.y += this.vitesseY;
    }
  }