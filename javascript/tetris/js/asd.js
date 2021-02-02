
var pixel = [];

function startGame() {

	myGameArea.start();
	updateGameArea();
		updateGameAreaASCII();

	

	var y = 3, x = 6, rot = 0, fallSpeed = 1000;
	var piece = callPiece(10, x, y, rot);

	int1 = setInterval(function() {
		updateGameArea();
		updateGameAreaASCII();

			if (!najebem(y)){

				makeFrozen(y);
				checkLines(y);
				updateGameArea();
		updateGameAreaASCII();


				if(!checkTopLine()){
					clearInterval(int1)
					clearInterval(int2)
				} else {
					y = 3, x = 6, rot = 0;
					piece = callPiece(piece, x, y, rot)
				}

		console.log("konec");
			} else {
	    		moveDown(y);
	    		y++;
			}
	}, fallSpeed);

	window.addEventListener("keydown", function(event) {
  		if (event.defaultPrevented) {
 	 		return; // Do nothing if event already handled
		}

		switch(event.code) {

	    case "KeyS":
	    case "ArrowDown":
	      	if (!najebem(y)){
				makeFrozen(y);
				checkLines(y);

				if(!checkTopLine()){
					clearInterval(int1)
				} else {
					y = 3, x = 6, rot = 0;	
					piece = callPiece(piece, x, y, rot)
				}
			} else {
				moveDown(y);
				y++;
			}
	        break;
	    case "KeyW":
	    case "ArrowUp":
	    	rot++;
			rotate(piece, x, y, rot);
	    	break;
	    case "KeyA":
	    case "ArrowLeft":
	    	if(moveLeft(y)){
				x--;
			}
	      break;
	    case "KeyD":
	    case "ArrowRight":
	    	if(moveRight(y)){
				x++;
			}
	    	break;
	    case "Space":
	      while(najebem(y)){
					moveDown(y);
					y++;
				}
	
				makeFrozen(y);
				checkLines(y-1);
	
				if(!checkTopLine()){
					clearInterval(int1)
				} else {
					y = 3, x = 6, rot = 0;
					piece = callPiece(piece, x, y, rot)
				}
	    	break;  
 		}
 
		updateGameArea();
		updateGameAreaASCII();

		event.preventDefault();
	}, true);

}

var myGameArea = {
    canvas : document.createElement("canvas"),

    start : function() {
        this.canvas.width = 360; //360
        this.canvas.height = 720; //720
        this.canvas.style = "border:2px solid #000000;";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        window.addEventListener('keydown', eventListener1);
		window.addEventListener('keyup', eventListener2); 

        for (var i=0;i<14;i++) {
		    pixel[i] = [];
		}

		for (var i = 0; i < 14; i++) { 
		    for (var j = 0; j < 24; j++) { //[stlpec][riadok]
		    	if(i == 1 || i == 12 || j == 23)
		    		pixel[i][j] = 1;
		    	else
					pixel[i][j] = 0;
		    } 
		}  
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {
	myGameArea.clear();
   	ctx = myGameArea.context;
   	ctx.fillStyle = "blue";

	for(i = 2; i < 12; i++){
		for(j = 3; j < 23; j++){
			if(pixel[i][j] == 1 || pixel[i][j] == 2)
				ctx.fillRect((36*(i-2))+2,(36*(j-3))+2,32,32);

		}
	}
}

function updateGameAreaASCII() {
	var salala = [];

	for(j = 3; j < 23; j++){
		for(i = 2; i < 12; i++){
			if(pixel[i][j] == 1 || pixel[i][j] == 2)
				salala += 'X';
			else
				salala += '.'
		}
		salala += '<br/>'
	}
	document.getElementById("plocha").innerHTML = salala;
}

var eventListener1 = function (e) {
		e.preventDefault();
		myGameArea.keys = (myGameArea.keys || []);
		myGameArea.keys[e.keyCode] = (e.type == "keydown");
};
	
var eventListener2 = function (e) {
		myGameArea.keys[e.keyCode] = (e.type == "keydown");
};
