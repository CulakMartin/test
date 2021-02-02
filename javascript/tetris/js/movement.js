function rotate(piece, x, y, rot){

	switch(piece) {
	case 0: // kocka sa neotaca
		break;
	case 1:
		if(checkStick(x, y, rot)){
			clearPiece(y);
			drawStick(x, y, rot);
		}
		break;
	case 2:
		if(checkL1(x, y, rot)){
			clearPiece(y);
			drawL1(x, y, rot);
		}
		break;
	case 3:
		if(checkL2(x, y, rot)){
			clearPiece(y);
			drawL2(x, y, rot);
		}
		break;
	case 4:
		if(checkT(x, y, rot)){
			clearPiece(y);
			drawT(x, y, rot);
		}
		break;
	case 5:
		if(checkS1(x, y, rot)){
			clearPiece(y);
			drawS1(x, y, rot);
		}
		break;
	case 6:
		if(checkS2(x, y, rot)){
			clearPiece(y);
			drawS2(x, y, rot);
		}
		break;
	}
}

function callPiece(piece, x, y, rot){
	var rnd = Math.floor(Math.random() * 7);

	while(rnd == piece){
		rnd = Math.floor(Math.random() * 7);
	}

	switch(rnd) {
	case 0:
		drawCube(x, y, rot);
		break;
	case 1:
		drawStick(x, y, rot);
		break;
	case 2:
		drawL1(x, y, rot);
		break;
	case 3:
		drawL2(x, y, rot);
		break;
	case 4:
		drawT(x, y, rot);
		break;
	case 5:
		drawS1(x, y, rot);
		break;
	case 6:
		drawS2(x, y, rot);
		break;
	}
	return rnd;
}

function moveRight(n){
	for(j = n; j >= n - 3; j--){
        for(i = 13; i >= 0 ; i--){
        	if(pixel[i][j] == 2 && pixel[i+1][j] == 1)
        		return false;
        }
    }

	for(j = n; j >= n - 3; j--){
        for(i = 13; i >=0 ; i--){
        	if(pixel[i][j] == 2){
        		pixel[i][j] = 0;
        		pixel[i+1][j] = 2;
        	}
        }
    }

	return true;
}

function moveLeft(n){
	for(j = n; j >= n - 3; j--){
        for(i = 0; i < 14; i++){
        	if(pixel[i][j] == 2 && pixel[i-1][j] == 1)
        		return false;
        }
    }

	for(j = n; j >= n - 3; j--){
        for(i = 0; i < 14; i++){
        	if(pixel[i][j] == 2){
        		pixel[i][j] = 0;
        		pixel[i-1][j] = 2;
        	}
        }
    }
    return true;
}

function clearPiece(n){
	for(j = n; j >= n - 3; j--){
        for(i = 0; i < 14; i++){
        	if(pixel[i][j] == 2){
        		pixel[i][j] = 0;
        	}
        }
    }
}

function checkLines(n){
	var score = 0;
	var i, isFull;

	for(j = 22; j >= n - 3; j--){
		i = 2;
    	isFull = true;

        while(isFull && i < 12){
        	if(pixel[i][j] == 0)
        		isFull = false;

        	i++;
        }

    	if(isFull){
			score++;
			removeLine(j);
			j++;

    	}
    }
    return score;
}

function removeLine (n) {

	for (var y = n; y > 2; y--){
		for (var x = 2; x < 12; x++) { 
			pixel[x][y] = pixel[x][y-1];
	   	}
	}
}

function makeFrozen(n){
	for(j = n; j >= n - 3; j--){
        for(i = 0; i < 14; i++){
        	if(pixel[i][j] == 2){
        		pixel[i][j] = 1;
        	}
        }
    }
}

function moveDown(n) {
    for(j = n; j >= n - 3; j--){
        for(i = 0; i < 13; i++){
        	if(pixel[i][j] == 2){
        		pixel[i][j] = 0;
        		pixel[i][j+1] = 2;
        	}
        }
    }

	return;
}

function najebem(n) {
	for(j = n - 3; j <= n; j++){
		for(i=0; i<13; i++)
        	if(pixel[i][j + 1] == 1 && pixel[i][j] == 2)
        		return false;
	}
	return true;
}

function checkTopLine() {
	for(i = 2; i < 12; i++)
		if (pixel[i][3] == 1)
			return false;

	return true;	
}