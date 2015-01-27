function displayLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    var div = document.getElementById("location");
    div.innerHTML = "You are at latitude "+ latitude + ", longitude"+ longitude;
   }
   



function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation);
    }
    else {
        alert("Sorry GeoLocation is not supported");
    }
    
}

window.onload = getMyLocation;


