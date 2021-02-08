
class Ennemies {
  x;
  y;
  img;
  l;
  h;
  target = {};
  vitesse;
  
  constructor(x, y, img, l, h, vitesse) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.h = h;
    this.img = img;
    this.vitesse = vitesse;
  }
  setTarget(x, y) {
    this.target.x = x;
    this.target.y = y;
  }

  distanceToTarget() {
    let dx = this.target.x - this.x;
    let dy = this.target.y - this.y;

    return Math.sqrt(dx * dx + dy * dy);
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x , this.y);
        ctx.drawImage(this.img, 0, 0, this.l, this.h);

    ctx.restore();
  }

  move() {
    // si aucune cible n'est définie, on ne fait rien
    if (this.target.x === undefined) return;

    // on se dirige vers la cible
    // 1 - on calcule l'angle entre la position courante de la balle
    // et la cible
    let dx = this.target.x - this.x;
    let dy = this.target.y - this.y;
    this.angle = Math.atan2(dy, dx);


    if (this.distanceToTarget() < 3) return;

    this.x += this.vitesse * Math.cos(this.angle);
    this.y += this.vitesse * Math.sin(this.angle);
  }
}