var wundergroundKey = 'd7718ae963a47176';

function setBackgroundImage() {
    $.get('http://apod.nasa.gov/apod/astropix.html', function(data) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
        var imgLink = doc.querySelectorAll('a')[1];
        // Check if link is img
        var urlExtension = $(imgLink).attr('href').slice(-4).toLowerCase();
        if (urlExtension === '.jpg') {
            var imgUrl = "http://apod.nasa.gov/apod/" + $(imgLink).attr('href');
            document.body.style.background = "url('" + imgUrl + "') no-repeat center center fixed";
            document.getElementById('source').innerHTML = '<a href="http://apod.nasa.gov">NASA Astronomical Picture of the Day</a>';
        } else {
            document.body.style.background = "url('bloodmoon.jpg') no-repeat center center fixed";
        }
    });
}

/*function getWeather() {
    $.ajax({
        url: "http://api.wunderground.com/api/d7718ae963a47176/geolookup/conditions/q/IA/Cedar_Rapids.json",
        dataType: "jsonp",
        success: function(parsed_json) {
            var location = parsed_json['location']['city'];
            var temp_f = parsed_json['current_observation']['temp_f'];
//            alert("current temp in " + location + " is: " + temp_f);
            document.getElementById('weather').innerHTML = 'current temp in ' + location + ' is ' + temp_f;
        }
    });
} */

function getWeather() {
    // Get weather data
    var uri = "http://api.wunderground.com/api/d7718ae963a47176/geolookup/conditions/q/NY/Brooklyn.json";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.open('GET', uri);
    xhr.send();
}

function updateClock() {
    var date = new Date();
    var today = date.toLocaleString(undefined, {month: "long", day: "numeric", year: "numeric"});
    var now = date.toLocaleTimeString(undefined, {hour: "numeric", minute: "numeric", second: "numeric"});
    var period = now.slice(now.length-2, now.length);
    var now = now.slice(0, now.length-3);

    document.getElementById('time').innerHTML = now;
    document.getElementById('date').innerHTML = today;
    document.getElementById('period').innerHTML = period;
    setTimeout(updateClock, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    updateClock();
//    getWeather();
    weather2();
});

$(document).ready(setBackgroundImage());
