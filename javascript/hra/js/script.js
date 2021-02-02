
var piece = [];
var greenScore = 0;
var blueScore = 0;
var bounces = 0;
var isPaused = false;
var bRight = 39;
var bLeft = 37;
var gRight = 68;
var gLeft = 65;

function startGame() {

	piece[0] = new component(100, 20, "blue", 300, 0, 0, 0, 0);
	piece[1] = new component(100, 20, "green", 300, 580, 0, 0, 1);
	piece[2] = new component(30, 30, "red", 335, 200 , 0, 0, 2);

	var g = document.createElement('div');
	g.setAttribute("id", "score");
	document.body.appendChild(g);

	g = document.createElement('div');
	g.setAttribute("id", "buttons");
	document.body.appendChild(g);
	document.getElementById('buttons').innerHTML = '<button type="button" onclick="restartGame()">Continue</button>' + 
	'<br><br><button type="button" onclick="drawMenu(), clearGame()">Back</button>'; 


	myGameArea.start();
	updateGameArea();
	isPaused = true;
}

var myGameArea = {


	canvas : document.createElement("canvas"),
	start : function() {

		this.canvas.width = 700;
		this.canvas.height = 600;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(function() {
			if(!isPaused){
				updateGameArea();   
			}
			else{
				ctx.fillStyle = '#ff9900';
				ctx.fillRect(200,200,300,200);
				ctx.closePath();
				ctx.font = '20pt Kremlin Pro Web';
				ctx.fillStyle = 'black';
				ctx.fillText('Press continue', 275, 310);
				ctx.closePath();

			}
		}, 20);
		
		window.addEventListener('keydown', eventListener1);
		window.addEventListener('keyup', eventListener2); 
	},
	stop : function() {
		clearInterval(this.interval);
	},    
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	delete : function(){
		this.canvas.setAttribute('id', 'div1');
		document.getElementById('div1').outerHTML = '';
		clearInterval(this.interval);

		window.removeEventListener('keydown', eventListener1);
		window.removeEventListener('keyup', eventListener2);
	}
}

var eventListener1 = function (e) {
		e.preventDefault();
		myGameArea.keys = (myGameArea.keys || []);
		myGameArea.keys[e.keyCode] = (e.type == "keydown");
};
	
var eventListener2 = function (e) {
		myGameArea.keys[e.keyCode] = (e.type == "keydown");
};

function component(width, height, color, x, y, xspeed, yspeed, number) {
	this.number = number;
	this.clr = color;
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;    
	this.speedX = xspeed;
	this.speedY = yspeed;    

	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	this.newPos = function() {
		this.y += this.speedY;
		this.x += this.speedX;
		this.hitWall();
		if(this.number == 2)
			this.hitEachOther();
	}

	this.hitEachOther = function() {
		var i;
		var len = piece.length;

		for (i=0; i<len; i++) {
			druhy = piece[i]; 
			if(this.number != i){                
				if((this.y+this.height) > druhy.y  &&  this.y < druhy.y  &&  (this.x+this.width) > druhy.x  &&  this.x < (druhy.x+druhy.width-3)){ 
					this.y = (druhy.y - this.height); //zeleny
					this.speedY = -this.speedY;

					var cubeCenter = this.x + (this.width/2);
					var blockCenter = druhy.x + (druhy.width/2);
					var offset = cubeCenter - blockCenter;
					this.speedX = (offset/5);

					bounces++;
					if(druhy.width > 40)
						platformNarrower();
				}
				if(this.y < (druhy.y+druhy.height)  &&  this.y>druhy.y  &&  (this.x+this.width) > druhy.x  &&  this.x < (druhy.x+druhy.width-3)){ 
					this.y = (druhy.y + druhy.height); //modry
					this.speedY = -this.speedY;

					var cubeCenter = this.x + (this.width/2);
					var blockCenter = druhy.x + (druhy.width/2);
					var offset = cubeCenter - blockCenter;
					this.speedX = (offset/5);

					bounces++;
					if(druhy.width > 40)
						platformNarrower();
				}
				if((this.x+this.width) > druhy.x  &&  this.x < druhy.x  &&  (this.y+this.height-3) > druhy.y  &&  this.y < (druhy.y+druhy.height)){ 
					this.x = (druhy.x - this.width); //zlava
					this.speedX = -this.speedX;
				}
				if(this.x < (druhy.x+druhy.width)  &&  this.x > druhy.x  &&  (this.y+this.height-3) > druhy.y  &&  this.y < (druhy.y+druhy.height)){ 
					this.x = (druhy.x + druhy.width); //zprava
					this.speedX = -this.speedX;
				}
			}
		} 
	}

	this.hitWall = function() {
		var absoluteBottom = myGameArea.canvas.height - this.height;
		var absoluteRight = myGameArea.canvas.width - this.width;

		if (this.y > absoluteBottom) { //spodna stena
			this.y = absoluteBottom;
			this.speedY = 0;
			blueScore++;
			isPaused = true;

			document.getElementById('buttons').innerHTML = '<button type="button" onclick="restartGame()">Continue</button>' + 
			'<br><br><button type="button" onclick="drawMenu(), clearGame()">Back</button>'; 

		} else if (this.y < 0) { //vrchna stena
			this.y = 0;
			this.speedY = 0;
			greenScore++;
			isPaused = true;

			document.getElementById('buttons').innerHTML = '<button type="button" onclick="restartGame()">Continue</button>' + 
			'<br><br><button type="button" onclick="drawMenu(), clearGame()">Back</button>'; 

		} else if (this.x < 0) { // lava stena
			this.x = 0;
			this.speedX = -this.speedX;
		} else if (this.x > absoluteRight) { //prava stena
			this.x = absoluteRight;
			this.speedX = -this.speedX;
		}
	}
}

function platformNarrower() {
	if (bounces == 10) {
		piece[0].width = 80;
		piece[1].width = 80;
	} else if (bounces == 20) {
		piece[0].width = 60;
		piece[1].width = 60;
	} else if (bounces == 30) {
		piece[0].width = 40;
		piece[1].width = 40; 
	}
}

function restartGame() {
	isPaused = false;

	if ((Math.random()*2) < 1) {
		var yStart = 40;
		var ySpeed = 8;
	} else {
		var yStart = 530;
		var ySpeed = -8;
	}

	var rng = Math.random()*20;
		rng -= 10;

	piece[0].x = 300;
	piece[1].x = 300;

	bounces = 0;
	piece[0].width = 100;
	piece[1].width = 100;

	piece[2].x = 335;
	piece[2].y = yStart;
	piece[2].speedX = rng;
	piece[2].speedY = ySpeed;
	myGameArea.keys = false;

	document.getElementById('buttons').innerHTML =
	'<br><br><button type="button" onclick="drawMenu(), clearGame()">Back</button>'; 
}

function updateGameArea() {
	myGameArea.clear();
	
	piece[0].speedX = 0;
	piece[1].speedX = 0;

	if (myGameArea.keys && myGameArea.keys[bLeft]) {piece[0].speedX = -12;}
	if (myGameArea.keys && myGameArea.keys[bRight]) {piece[0].speedX = 12;}
	if (myGameArea.keys && myGameArea.keys[gLeft]) {piece[1].speedX = -12;}
	if (myGameArea.keys && myGameArea.keys[gRight]) {piece[1].speedX = 12;}
  
	piece[0].newPos();
	piece[0].update();
	piece[1].newPos();
	piece[1].update();
	piece[2].newPos();
	piece[2].update();

	document.getElementById('score').innerHTML = 'Blue Score: ' + blueScore + ' Green Score: ' + greenScore; 
}

function drawKeySelector() {
	document.getElementById('keySelector').innerHTML = 
	'Blue Left: <input type="text" onkeypress="return keySelector(event, 2)" /><div id="score2"></div>' +
	'Blue Right: <input type="text" onkeypress="return keySelector(event, 1)" /><div id="score1"></div>' +
	'Green Left: <input type="text" onkeypress="return keySelector(event, 4)" /><div id="score4"></div>' +
	'Green Right: <input type="text" onkeypress="return keySelector(event, 3)" /><div id="score3"></div>' +
	'<button type="button" onclick="hideKeySelector()">Hide</button>'; 
}

function hideKeySelector() {
	document.getElementById('keySelector').innerHTML = '<button type="button" onclick="drawKeySelector()">Select Keys</button>';
}

function keySelector(e, id){
	var keynum;

	if(window.event) {//cez tento to ide
	  keynum = e.keyCode;
	} else if(e.which){                   
	  keynum = e.which;
	}

	switch(parseInt(id)){
	case 1:
		document.getElementById('score1').innerHTML = String.fromCharCode(keynum) + ' ' + keynum;
		bRight = keynum - 32;
		break;
	case 2:
		document.getElementById('score2').innerHTML = String.fromCharCode(keynum) + ' ' + keynum;
		bLeft = keynum - 32;
		break;
	case 3:
		document.getElementById('score3').innerHTML = String.fromCharCode(keynum) + ' ' + keynum;
		gRight = keynum - 32;
		break;
	case 4:
		document.getElementById('score4').innerHTML = String.fromCharCode(keynum) + ' ' + keynum;
		gLeft = keynum - 32;
		break;
	default:
		alert('Key selector error');
	}
}

function drawCredits() {
	document.getElementById('credits').innerHTML = 'Author: Martin Culak <br>' +
		'<button type="button" onclick="hideCredits()">Hide credits</button>';
}

function hideCredits() {
	document.getElementById('credits').innerHTML = '<button type="button" onclick="drawCredits()">Credits</button>';
}

function clearGame() {
	document.getElementById('buttons').outerHTML = '';
	document.getElementById('score').outerHTML = '';
	myGameArea.delete();
}

function drawMenu() {
	document.getElementById('menu').innerHTML =
	'<br><div id="startGame"><button type="button" onclick="startGame(), hideMenu()">Start Game</button></div>' +
	'<br><div id="keySelector"><button type="button" onclick="drawKeySelector()">Select Keys</button></div>' +
	'<br><div id="credits"><button type="button" onclick="drawCredits()">Credits</button></div>';
}

function hideMenu() {
	document.getElementById('menu').innerHTML = '';
}
