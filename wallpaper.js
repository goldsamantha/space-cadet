function setBackgroundImage() {
    $.get('http://apod.nasa.gov/apod/astropix.html', function(data) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
        console.log(doc);
        var img_link = doc.querySelectorAll('a')[1];
        var img_url = "http://apod.nasa.gov/apod/" + $(img_link).attr('href');
        document.body.style.background = "url('" + img_url + "') no-repeat center center fixed";
    });
}


function updateClock() {
    var date = new Date();
    var date_today = date.toLocaleString(undefined, {month: "long", day: "numeric", year: "numeric"});
    var time_now = date.toLocaleTimeString(undefined, {hour: "numeric", minute: "numeric", second: "numeric"});
    var period = time_now.slice(time_now.length-2, time_now.length);
    var time_now = time_now.slice(0, time_now.length-3);

    document.getElementById('time').innerHTML = time_now;
    document.getElementById('date').innerHTML = date_today;
    document.getElementById('period').innerHTML = period;
    setTimeout(updateClock, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    updateClock();
});
$(document).ready(setBackgroundImage());
