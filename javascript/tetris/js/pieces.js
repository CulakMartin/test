function drawCube(x, y, rot){
	pixel[x][y] = 2;
 	pixel[x][y-1] = 2;
	pixel[x+1][y] = 2;
	pixel[x+1][y-1] = 2;
}

function drawStick(x, y, rot){
	if (rot % 2 == 0 ) {
		pixel[x+1][y] = 2;
	 	pixel[x+1][y-1] = 2;
		pixel[x+1][y-2] = 2;
		pixel[x+1][y-3] = 2;
	} else {
		pixel[x][y-2] = 2;
		pixel[x+1][y-2] = 2;
		pixel[x+2][y-2] = 2;
		pixel[x+3][y-2] = 2;
	}

}

function checkStick(x, y, rot){
	if (rot % 2 == 0 ) {
		if (pixel[x+1][y] == 1 || pixel[x+1][y-1] == 1 || pixel[x+1][y-2] == 1 || pixel[x+1][y-3] == 1)
	 		return false;
	} else {
		if (pixel[x][y-2] == 1 || pixel[x+1][y-2] == 1 || pixel[x+2][y-2] == 1 || pixel[x+3][y-2] == 1)
			return false;
	}
	return true;
}

function drawL1(x, y, rot){
	
	if (rot % 4 == 0){
		pixel[x] [y - 2] = 2;
		pixel[x] [y - 1] = 2;
		pixel[x + 1] [y - 1] = 2;
 		pixel[x + 2] [y - 1] = 2;
	} else if (rot % 4 == 1){
		pixel[x] [y] = 2;
		pixel[x + 1] [y] = 2;
		pixel[x + 1] [y - 1] = 2;
 		pixel[x + 1] [y - 2] = 2;
	} else if (rot % 4 == 2){
		pixel[x] [y - 2] = 2;
		pixel[x + 1] [y - 2] = 2;
 		pixel[x + 2] [y - 2] = 2;
		pixel[x + 2] [y - 1] = 2;
	} else {
		pixel[x] [y] = 2;
		pixel[x] [y - 1] = 2;
 		pixel[x] [y - 2] = 2;
		pixel[x + 1] [y - 2] = 2;
	}
}

function checkL1(x, y, rot){
	
	if (rot % 4 == 0){
		if (pixel[x][y-2] == 1 || pixel[x][y-1] == 1 || pixel[x+1][y-1] == 1 || pixel[x+2][y-1] == 1)
			return false;
	} else if (rot % 4 == 1){
		if (pixel[x][y] == 1 || pixel[x+1] [y] == 1 || pixel[x+1] [y-1] == 1 || pixel[x+1][y-2] == 1)
			return false;
	} else if (rot % 4 == 2){
		if (pixel[x][y-2] == 1 || pixel[x+1][y-2] == 1 || pixel[x+2][y-2] == 1 || pixel[x+2][y-1] == 1)
			return false;
	} else {
		if (pixel[x][y] == 1 || pixel[x][y-1] == 1 || pixel[x][y-2] == 1 || pixel[x+1][y-2] == 1)
			return false;
	}
	return true;
}

function drawL2(x, y, rot){
	if (rot % 4 == 0){
		pixel[x][y-1] = 2;
		pixel[x+1][y-1] = 2;
		pixel[x+2][y-1] = 2;
 		pixel[x+2][y-2] = 2;
	} else if (rot % 4 == 1){
		pixel[x][y-2] = 2;
 		pixel[x+1][y-2] = 2;
		pixel[x+1][y-1] = 2;
		pixel[x+1][y] = 2;
	} else if (rot % 4 == 2){
		pixel[x][y-1] = 2;
		pixel[x][y-2] = 2;
		pixel[x+1][y-2] = 2;
 		pixel[x+2][y-2] = 2;
	} else {
 		pixel[x][y-2] = 2;
		pixel[x][y-1] = 2;
		pixel[x][y] = 2;
		pixel[x+1][y] = 2;
	}
}

function checkL2(x, y, rot){
	
	if (rot % 4 == 0){
		if (pixel[x][y-1] == 1 || pixel[x+1][y-1] == 1 || pixel[x+2][y-1] == 1 || pixel[x+2][y-2] == 1)
			return false;
	} else if (rot % 4 == 1){
		if (pixel[x][y-2] == 1 || pixel[x+1][y-2] == 1 || pixel[x+1][y-1] == 1 || pixel[x+1][y] == 1)
			return false;
	} else if (rot % 4 == 2){
		if (pixel[x][y-1] == 1 || pixel[x][y-2] == 1 || pixel[x+1][y-2] == 1 || pixel[x+2][y-2] == 1)
			return false;
	} else {
		if (pixel[x][y-2] == 1 || pixel[x][y-1] == 1 || pixel[x][y] == 1 || pixel[x+1][y] == 1)
			return false;
	}
	return true;
}

function drawT(x, y, rot){
	if (rot % 4 == 0){
		pixel[x][y-1] = 2;
		pixel[x+1][y-1] = 2;
		pixel[x+1][y-2] = 2;
 		pixel[x+2][y-1] = 2;
	} else if (rot % 4 == 1){
		pixel[x][y-1] = 2;
 		pixel[x+1][y] = 2;
		pixel[x+1][y-1] = 2;
		pixel[x+1][y-2] = 2;
	} else if (rot % 4 == 2){
		pixel[x][y-1] = 2;
		pixel[x+1][y] = 2;
		pixel[x+1][y-1] = 2;
 		pixel[x+2][y-1] = 2;
	} else {
		pixel[x+1][y] = 2;
		pixel[x+1][y-1] = 2;
 		pixel[x+1][y-2] = 2;
		pixel[x+2][y-1] = 2;
	}
}

function checkT(x, y, rot){
	
	if (rot % 4 == 0){
		if (pixel[x][y-1] == 1 || pixel[x+1][y-1] == 1 || pixel[x+1][y-2] == 1 || pixel[x+2][y-1] == 1)
			return false;
	} else if (rot % 4 == 1){
		if (pixel[x][y-1] == 1 || pixel[x+1][y] == 1 || pixel[x+1][y-1] == 1 || pixel[x+1][y-2] == 1)
			return false;
	} else if (rot % 4 == 2){
		if (pixel[x][y-1] == 1 || pixel[x+1][y] == 1 || pixel[x+1][y-1] == 1 || pixel[x+2][y-1] == 1)
			return false;
	} else {
		if (pixel[x+1][y] == 1 || pixel[x+1][y-1] == 1 || pixel[x+1][y-2] == 1 || pixel[x+2][y-1] == 1)
			return false;
	}
	return true;
}

function drawS1 (x, y, rot){
	if (rot % 2 == 0 ){
		pixel[x][y-2] = 2;
		pixel[x+1][y-2] = 2;
		pixel[x+1][y-1] = 2;
 		pixel[x+2][y-1] = 2;
	} else {
		pixel[x][y] = 2;
		pixel[x][y-1] = 2;
 		pixel[x+1][y-1] = 2;
		pixel[x+1][y-2] = 2;

	}
}

function checkS1 (x, y, rot){
	if (rot % 2 == 0 ) {
		if (pixel[x][y-2] == 1 || pixel[x+1][y-2] == 1 || pixel[x+1][y-1] == 1 || pixel[x+2][y-1] == 1)
			return false;
	} else {
		if (pixel[x][y] == 1 || pixel[x][y-1] == 1 || pixel[x+1][y-1] == 1 || pixel[x+1][y-2] == 1)
			return false;
	}

	return true;
}

function drawS2 (x, y, rot){
	if (rot % 2 == 0 ){
		pixel[x][y-1] = 2;
		pixel[x+1][y-1] = 2;
 		pixel[x+1][y-2] = 2;
		pixel[x+2][y-2] = 2;
	} else {
		pixel[x+1][y] = 2;
 		pixel[x+1][y-1] = 2;
		pixel[x][y-1] = 2;
		pixel[x][y-2] = 2;
	}
}

function checkS2 (x, y, rot){
	if (rot % 2 == 0 ) {
		if (pixel[x][y-1] == 1 || pixel[x+1][y-1] == 1 || pixel[x+1][y-2] == 1 || pixel[x+2][y-2] == 1)
			return false;
	} else {
		if (pixel[x+1][y] == 1 || pixel[x+1][y-1] == 1 || pixel[x][y-1] == 1 || pixel[x][y-2] == 1)
			return false;
	}

	return true;
}