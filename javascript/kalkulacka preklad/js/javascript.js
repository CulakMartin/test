
var langId;
var arrLang;

function load() {
	arrLang = data;

	$(function() {
		$('.translate').click(function() {
			langId = $(this).attr('id');

			$('.lang').each(function(index, item) {
				$(this).text(arrLang[langId][$(this).attr('key')]);
			});


			var element = document.getElementById('resultArea');	
			if (ziskajPrikaz() == 2 && element != null && element.value != '') {
				document.getElementById('resultArea').innerHTML = '';
			}

			element = document.getElementById('resultPerimeter');	
			if (ziskajPrikaz() == 1 && element != null && element.value != '') {
				document.getElementById('resultPerimeter').innerHTML = '';
			}
		});
	});;
}

function preloz(){
	$('.lang').each(function(index, item) {
		$(this).text(arrLang[langId][$(this).attr('key')]);
	});

	var element = document.getElementById('resultArea');	
	if (ziskajPrikaz() == 2 && element != null && element.value != '') {
		document.getElementById('resultArea').innerHTML = '';
	}
	
	element = document.getElementById('resultPerimeter');	
	if (ziskajPrikaz() == 1 && element != null && element.value != '') {
		document.getElementById('resultPerimeter').innerHTML = '';
	}
}
