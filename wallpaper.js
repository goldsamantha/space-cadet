var wundergroundKey = 'd7718ae963a47176';

function setBackgroundImage() {
    $.get('http://apod.nasa.gov/apod/astropix.html', function(data) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
        var imgLink = doc.querySelectorAll('a')[1];
        // Check if link is img
        var urlExtension = $(imgLink).attr('href').slice(-4).toLowerCase();
        var sourceHtml = '<a href="http://apod.nasa.gov">NASA Astronomical Picture of the Day</a>';
        if (urlExtension === '.jpg') {
            var imgUrl = "http://apod.nasa.gov/apod/" + $(imgLink).attr('href');
            document.body.style.background = "url('" + imgUrl + "') no-repeat center center fixed";
            document.getElementById('source').innerHTML = sourceHtml;
        } else {
            document.body.style.background = "url('bloodmoon.jpg') no-repeat center center fixed";
            document.getElementById('source').innerHTML = '<a href="http://apod.nasa.gov/apod/ap151003.html">A Blue Blood Moon</a><br>' + sourceHtml;
        }
    });
}

function getGeolocation() {
    if ('geolocation' in navigator) {
        console.log('Geoloc available');
        console.log(navigator['geolocation']);
        navigator.geolocation.getCurrentPosition(function(position) {
            getWeather(position.coords.latitude, position.coords.longitude);
        });
    } else {
        console.log('Geoloc unavailable');
        document.getElementById('weather').innerHTML = 'Location information is unavailable, sorry!';
    }
}

function getWeather(lat, long) {
    if (lat === undefined || long === undefined) {
        document.getElementById('weather').innerHTML = '<a href="wunderground.com">Weather unavailable</a>';
        return;
    }
    // Get weather data
    var uri = "http://api.wunderground.com/api/" + wundergroundKey + "/geolookup/conditions/q/" + lat + "," + long + ".json";
    console.log('Latitude, longitude', lat, long);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status == 200) {
            var j = JSON.parse(xhr.responseText);
            console.log(j);
            var weather = j['current_observation']['weather'];
            var temp = j['current_observation']['temp_f'];
            var location = j['location']['city'];
            if (j['location']['country'] === 'US') {
                location += ", " + j['location']['state'];
            } else {
                location += ", " + j['location']['country'];
                temp = j['current_observation']['temp_c'];
            }
            var weatherUrl = j['current_observation']['ob_url'];
            var html = '<a href="' + weatherUrl + '">';
            html += weather + " | " + temp + "&#176F<br>" + location + '</a>';
            document.getElementById('weather').innerHTML = html;
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

    document.getElementById('time').innerHTML = now + ' ' + period;
    document.getElementById('date').innerHTML = today;
//    document.getElementById('period').innerHTML = period;
    setTimeout(updateClock, 100);
}

document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    getGeolocation();
//    getWeather();
});

$(document).ready(setBackgroundImage());
