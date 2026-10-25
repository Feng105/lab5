"use strict";

function getGeolocation() {
    const output = document.getElementById("geolocation");

    if (navigator.geolocation) {
        output.classList.remove("error");
        output.innerHTML = "Requesting your location&hellip;";

        navigator.geolocation.getCurrentPosition(showGeolocation, showError, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
    } else {
        output.classList.add("error");
        output.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showGeolocation(position) {
    const output = document.getElementById("geolocation");

    output.classList.remove("error");
    output.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
    const output = document.getElementById("geolocation");
    let message;

    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "Location request: the user denied the request for geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Location request: position information is unavailable.";
            break;
        case error.TIMEOUT:
            message = "Location request: the request timed out.";
            break;
        default:
            message = "Location request: an unknown error occurred.";
    }

    output.classList.add("error");
    output.innerHTML = message;
}
