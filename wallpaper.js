function setBackgroundImage() {
    $.get('http://apod.nasa.gov/apod/astropix.html', function(data) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
        var img_link = doc.querySelectorAll('a')[1];
        var img_url = "http://apod.nasa.gov/apod/" + $(img_link).attr('href');
        document.body.style.background = "url('" + img_url + "') no-repeat center center fixed";
    });
}

function updateClock() {
    var date = new Date();
    var date_today = date.toLocaleString(undefined, {month: "long", day: "numeric", year: "numeric"});
    var time_now = date.toLocaleTimeString(undefined, {hour: "numeric", minute: "numeric", second: "numeric"});
    document.getElementById('clock').innerHTML = time_now + "<br>" + date_today;
    setTimeout(updateClock, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    updateClock();
});
$(document).ready(setBackgroundImage());
