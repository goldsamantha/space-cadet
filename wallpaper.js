//var new_img = document.getElementsByClassName('apod')[0];
//document.body.style.background = "url('http://apod.nasa.gov/apod/image/1510/tle_dierickD8D_1002ozoneC.jpg') center fixed";
var img2;
function setImage() {
	$.get('http://apod.nasa.gov/apod/astropix.html', function(data) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(data, 'text/html');
	var x = doc.querySelector('img')
	img2 = $(x).attr('src');
	console.log(img2);
});




}

$.get('http://apod.nasa.gov/apod/astropix.html', function(data) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(data, 'text/html');
	var x = doc.querySelector('img')
	img2 = $(x).attr('src');
	console.log(img2);
});
