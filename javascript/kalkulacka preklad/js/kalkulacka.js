
function ziskajTvar() {
	var e = document.getElementById("tvar");
	return e.options[e.selectedIndex].value;	
}

function ziskajPrikaz() {
	var f = document.getElementById("prikaz");
	return f.options[f.selectedIndex].value;
}

function vypytajRozmery() {
	var tvar = parseInt(ziskajTvar());

	switch(tvar) {
	case 1:
		vypytajStvorec();
		break;
	case 2:
		vypytajObdlznik();
		break;
	case 3: 
		vypytajTrojuholnik();
		break;
	default:
		alert('Bad input');
	}

	preloz();
}

function vypytajStvorec(){
	document.getElementById("rozmery").innerHTML = 
		'<form name="myForm">' +
		'a: <input type="number" name="a" > cm <br><br>' +
		'<button type="button" class="lang" key="calculate" onclick="pocitajStvorec()">Vypočítaj</button></form>';
}

function vypytajObdlznik() {
	document.getElementById("rozmery").innerHTML = 
		'<form name="myForm">' +
		'a: <input type="number" name="a" > cm <br><br>' +
		'b: <input type="number" name="b" > cm <br><br>' +
		'<button type="button" class="lang translate" key="calculate" onclick="pocitajObdlznik()">Vypočítaj</button></form>';
}

function vypytajTrojuholnik() {
	if(ziskajPrikaz()==1){
		document.getElementById("rozmery").innerHTML = 
		'<form name="myForm">' +
		'a: <input type="number" name="a" > cm <br><br>' +
		'v<sub>a</sub>: <input type="number" name="b" > cm <br><br>' +
		'<button type="button" class="lang translate" key="calculate" onclick="pocitajTrojuholnik()">Vypočítaj</button></form>';
	}

	else{
		document.getElementById("rozmery").innerHTML = 
		'<form name="myForm">' +
		'a: <input type="number" name="a" > cm <br><br>' +
		'b: <input type="number" name="b" > cm <br><br>' +
		'c: <input type="number" name="c" > cm <br><br>' +
		'<button type="button" class="lang translate" key="calculate" onclick="pocitajTrojuholnik()">Vypočítaj</button></form>';
	}
}

function pocitajStvorec() {
	document.getElementById("koniec").innerHTML = '<img src="../2. Kalkulacka/img/stvorec.png">' + 
	'<div id="resultArea" class="lang" key="resultArea"></div>' + 
	'<div id="resultPerimeter" class="lang" key="resultPerimeter"></div>' +
	'</div><div id="number"></div>'+ 
	'<br><button type="button" onclick="window.location.reload()">Reset</button>';

	var a = parseInt(document.forms["myForm"]["a"].value);

	if(ziskajPrikaz()==1){
		a *= a;
		document.getElementById("resultArea").innerHTML = 'Obsah je: ';
		document.getElementById("number").innerHTML = a + 'cm<sup>2</sup>';
	}else{
		a *= 4;
		document.getElementById("resultPerimeter").innerHTML = 'Obvod je: ';
		document.getElementById("number").innerHTML = a + 'cm';
	}

	preloz();
}

function pocitajObdlznik() {
	document.getElementById("koniec").innerHTML = '<img src="../2. Kalkulacka/img/obdlznik.png">' + 
	'<div id="resultArea" class="lang" key="resultArea"></div>' + 
	'<div id="resultPerimeter" class="lang" key="resultPerimeter"></div>' +
	'</div><div id="number"></div>' + 
	'<br><button type="button" onclick="window.location.reload()">Reset</button>';

	var a = parseInt(document.forms["myForm"]["a"].value);
	var b = parseInt(document.forms["myForm"]["b"].value);

	if(ziskajPrikaz()==1){
		a = a*b;
		document.getElementById("resultArea").innerHTML = 'Obsah je: ';
		document.getElementById("number").innerHTML = a + 'cm<sup>2</sup>';
	}else{
		a = 2*a + 2*b;
		document.getElementById("resultPerimeter").innerHTML = 'Obvod je: ';
		document.getElementById("number").innerHTML = a + 'cm';
	}

	preloz();
}

function pocitajTrojuholnik() {
	document.getElementById("koniec").innerHTML = '<div id="x"></div>' + 
	'<div id="resultArea" class="lang" key="resultArea"></div>' + 
	'<div id="resultPerimeter" class="lang" key="resultPerimeter"></div>' + 
	'<div id="number"></div>' +
	'<br><button type="button" onclick="window.location.reload()">Reset</button>';

	var img = document.createElement("img"); 
	img.src = "../2. Kalkulacka/img/trojuholnik.png";
	var src = document.getElementById("x");
	src.appendChild(img);

	var a = parseFloat(document.forms["myForm"]["a"].value);
	var b = parseFloat(document.forms["myForm"]["b"].value);

	if(ziskajPrikaz()==1){
		a = a * b/2; 
		document.getElementById("resultArea").innerHTML = 'Obsah je: ';
		document.getElementById("number").innerHTML = a + 'cm<sup>2</sup>';
	}else{
		var c = parseFloat(document.forms["myForm"]["c"].value);
		a = a + b + c;
		document.getElementById("resultPerimeter").innerHTML = 'Obvod je: ';
		document.getElementById("number").innerHTML = a + 'cm';
	}

	preloz();
}