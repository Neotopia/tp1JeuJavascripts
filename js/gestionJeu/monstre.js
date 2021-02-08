let monstre = {
    x: 100,
    y: 100,
    l: 80,
    h : 40,
    scale: 1,
    incScale: 0,
    angle: 0,
    incAngle: 0,
    vitesseX: 0,
    vitesseY: 0,
    boundingBox:{
        x:0,
        y:0,
        l:40,
        h:20,
    },
    /*drawBoundingBox: function(ctx){
        ctx.save(), 
        this.boundingBox.x = this.x,
        this.boundingBox.y = this.y,
        ctx.lineWidth=10,
        ctx.strokeStyle = "red",
        ctx.strokeRect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.l, this.boundingBox.h),
        ctx.restore(),

    },*/
    donneTonNom: function(){
        return "Je m'appelle Paul, je suis x= " + this.x + " y= " + this.y;
    },
    draw: function (ctx) {
    //bonne pratique: sauver le context courant
    //couleur courante, taille du trait etc avant
    //de dessiner ou de modifier qqch dans le contexte
    ctx.save();
    //drawBoundingBox(ctx);
    ctx.translate(this.x, this.y);

    ctx.translate(this.l / 2, this.h / 2);
    ctx.scale(this.scale, this.scale);
    ctx.rotate(this.angle);
    ctx.translate(-this.l / 2, -this.h / 2);
    //ctx.rotate(0.2);
    
    
    //tete
    ctx.fillStyle ="white"
    ctx.fillRect(0, 0, 40, 30);

    //yeux
    ctx.fillStyle ="#00BFFF"
    ctx.fillRect(30, 5, 5, 10);
    ctx.fillStyle ="#00BFFF"
    ctx.fillRect(10, 5, 5, 10);

    //oreilles
    
    ctx.beginPath();
    ctx.bezierCurveTo(2, 2, 0, -20 ,20,0);
    ctx.bezierCurveTo(20, 2, 30,-20 ,38,0);
    ctx.fillStyle = "lightBlue";
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#0000ff";
    ctx.stroke();
    
    //pupilles droite
    ctx.beginPath();   
    //cx, cy, rayon, angle depart, angle arrivée en radian, 
    //sens inverse des aiguille d'une montre car y sens inverse
    ctx.arc(33, 10, 2, 0, Math.PI*2, true);
    ctx.fillStyle = "white";
    ctx.fill();          
    ctx.lineWidth = 1;
    //on donne l'ordre d'affihcier le chemin
    ctx.stroke(); //en fil de fer
    //ctx.fillStyle = "white"; -- en forme pleine
    //ctx.fill();    

    //pupilles gauche
    ctx.beginPath();   
    ctx.arc(13, 10, 2, 0, Math.PI*2, true);
    ctx.fillStyle = "white";
    ctx.fill();          
    ctx.lineWidth = 1;
    ctx.stroke();

    //moustache droite
    ctx.beginPath();  
    ctx.moveTo(40, 10);
    ctx.lineTo(50, 5);
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();  
    ctx.moveTo(40, 15);
    ctx.lineTo(50, 14);
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();  
    ctx.moveTo(40, 20);
    ctx.lineTo(50, 23);
    ctx.lineWidth = 3;
    ctx.stroke();

    //moustache gauche
    ctx.beginPath();  
    ctx.moveTo(-10, 5);
    ctx.lineTo(0, 10);
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();  
    ctx.moveTo(-10, 14);
    ctx.lineTo(0, 15);
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();  
    ctx.moveTo(-10, 23);
    ctx.lineTo(0, 20);
    ctx.lineWidth = 3;
    ctx.stroke();

    // corps
    ctx.restore();
    },
    setPos :function (x,y){
        this.x = x - this.l/2
        this.y = y - this.h/2

    },
    move: function(){
        this.x += this.vitesseX;
        this.y += this.vitesseY;
        this.angle += this.incAngle;
        this.scale += this.incScale;
        if (this.scale > 2) this.incScale = -this.incScale;
        if (this.scale < 1) this.incScale = -this.incScale;
    },
};