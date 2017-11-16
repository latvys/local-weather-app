let api = 'https://fcc-weather-api.glitch.me/api/current?',
    latitude,
    longitude;

$(document).ready(() => {

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((coordinates) => {
                latitude = coordinates.coords.latitude;
                longitude = coordinates.coords.longitude;
                getWeather(latitude, longitude);
            });
        } else {
            $('.location').html("Geolocation is not supported by this browser.");
        }
    }

    function getWeather(latitude, longitude) {
        let weatherURL = api + 'lon=' + longitude + '&lat=' + latitude;

        $.ajax({
            url: weatherURL,
            success: (data) => {
                $('.location').html(data.name + ', ' + data.sys.country);
                $('.temperatureDegrees').html(data.main.temp);
                $('.temperatureScale').html(' ' + String.fromCharCode(176) + 'C');
                $('.icon').html('<img src="' + data.weather[0].icon + '" alt="icon" class="icon"></img>');
            }
        });
    }

    $('.temperatureScale').on('click', () => {
        let temperatureScaleValue = $('.temperatureScale').html(),
            temperatureDegreesValue = $('.temperatureDegrees').html();

        if (temperatureScaleValue.includes('C')) {
            convertToFahrenheit(temperatureDegreesValue);
        } else if (temperatureScaleValue.includes('F')) {
            convertToCelsius(temperatureDegreesValue);
        }
    })


    function convertToFahrenheit(celsius) {
        let convertedTemperature = Math.round(celsius * 9 / 5 + 32);

        $('.temperatureDegrees').html(convertedTemperature);
        $('.temperatureScale').html(' ' + String.fromCharCode(176) + 'F');
    }

    function convertToCelsius(fahrenheit) {
        let convertedTemperature = Math.round((fahrenheit - 32) * 5 / 9);

        $('.temperatureDegrees').html(convertedTemperature);
        $('.temperatureScale').html(' ' + String.fromCharCode(176) + 'C');
    }


    getLocation();
});


