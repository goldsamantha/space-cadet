function setBackgroundImage() {
    $.get('http://apod.nasa.gov/apod/astropix.html', function(data) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
        var img_link = doc.querySelectorAll('a')[1];
        var img_url = "http://apod.nasa.gov/apod/" + $(img_link).attr('href');
        var new_img = document.getElementsByClassName('apod')[0];
        document.body.style.background = "url('" + img_url + "') no-repeat center center fixed";
    });
}

$(document).ready(setBackgroundImage());