var piece = [];

function startGame() {
    piece[0] = new component(50, 50, "blue", 20, 50, -3, 0);
    piece[1] = new component(30, 30, "red", 240, 100, 1, 1);
    piece[2] = new component(30, 30, "red", 140, 200, 3, 2);
    // piece[3] = new component(80, 80, "green", 400, 20, -2, 3);
    // piece[4] = new component(30, 30, "red", 0, 200, -1, 4);

    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 16);        
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, xacc, number) {
    this.number = number;
    this.clr = color;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.speedX = xacc;
    this.speedY = 0;    
    this.gravity = 0.1;
    this.bounce = 1;

    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.newPos = function() {
        this.speedY += this.gravity;
        this.y += this.speedY;
        this.x += this.speedX;
        this.hitEachOther();
        this.hitWall();
    }

    this.hitEachOther = function() {
        var i;
        var len = piece.length;

        for (i=0; i<len; i++) {
            druhy = piece[i]; 
            if(this.number != i){                
                if((this.y+this.height) > druhy.y  &&  this.y < druhy.y  &&  (this.x+this.width-3) > druhy.x  &&  this.x < (druhy.x+druhy.width-3)){ 
                    this.y = (druhy.y - this.height); //zospodu
                    colision(this.number, druhy.number, 'y');
                }
                if(this.y < (druhy.y+druhy.height)  &&  this.y>druhy.y  &&  (this.x+this.width-3) > druhy.x  &&  this.x < (druhy.x+druhy.width-3)){ 
                    this.y = (druhy.y + druhy.height); //zvrchu
                    colision(this.number, druhy.number, 'y');
                }
                if((this.x+this.width) > druhy.x  &&  this.x < druhy.x  &&  (this.y+this.height) > druhy.y  &&  this.y < (druhy.y+druhy.height)){ 
                    this.x = (druhy.x - this.width); //zlava
                    colision(this.number, druhy.number, 'x');
                }
                if(this.x < (druhy.x+druhy.width)  &&  this.x > druhy.x  &&  (this.y+this.height) > druhy.y  &&  this.y < (druhy.y+druhy.height)){ 
                    this.x = (druhy.x + druhy.width); //zprava
                    colision(this.number, druhy.number, 'x');
                }
            }
        } 
    }

    this.hitWall = function() {
        var absoluteBottom = myGameArea.canvas.height - this.height;
        if (this.y > absoluteBottom) { //spodna stena
            this.y = absoluteBottom;
            this.speedY = -(this.speedY * this.bounce);
        }
        if (this.y < 0) { //vrchna stena
            this.y = 0;
            this.speedY = -(this.speedY * this.bounce);
        }
        if (this.x < 0) { // lava stena
            this.x = 0;
            this.speedX = -(this.speedX * this.bounce);
        }    
        var absoluteRight = myGameArea.canvas.width - this.width;
        if (this.x > absoluteRight) { //prava stena
            this.x = absoluteRight;
            this.speedX = -(this.speedX * this.bounce);
        }
    }
}

function colision(i, n, os){
        var m1 = piece[i].width * piece[i].height;
        var m2 = piece[n].width * piece[n].height;

    switch(os){
        case'x': {
            var v1 = piece[i].speedX;
            var v2 = piece[n].speedX;

            piece[i].speedX = (((m1-m2)/(m1+m2))*v1) + (((2*m2)/(m1+m2))*v2);
            piece[n].speedX = (((2*m1)/(m1+m2))*v1) + (((m2-m1)/(m1+m2))*v2);

            break;
        }
        case'y': {
            var v1 = piece[i].speedY;
            var v2 = piece[n].speedY;

            piece[i].speedY = (((m1-m2)/(m1+m2))*v1) + (((2*m2)/(m1+m2))*v2);
            piece[n].speedY = (((2*m1)/(m1+m2))*v1) + (((m2-m1)/(m1+m2))*v2);

            break;
        }
        default:
            alert('Colision error');

    }
}

function updateGameArea() {
    myGameArea.clear();
    var i;
    var len = piece.length;

    document.getElementById("parameters").innerHTML =
    ' canvas: ' + myGameArea.canvas.width + 'x' + myGameArea.canvas.height + '<br><br>'; 

    for(i=0; i<len; i++){
        piece[i].newPos();
        piece[i].update();

        document.getElementById("parameters").innerHTML +=
        'color: ' + piece[i].clr + '<br>' +
        'x.left: ' + parseInt(piece[i].x) + ' y.top: ' + parseInt(piece[i].y) + '<br>' +
        ' x.right: ' + parseInt(piece[i].x + piece[i].width) + 
        ' y.bottom: ' + parseInt(piece[i].y + piece[i].height) + '<br>' +
        ' speedX: ' + parseFloat(piece[i].speedX).toFixed(2) + 
        ' speedY: ' + parseFloat(piece[i].speedY).toFixed(2) +
        '<br><br>';
    }
}