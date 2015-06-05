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

/*
Creating a lightbox for the gallery page
*/

// first the variables for the html
var $overlay = $('<div id="overlay"></div>');
var $image = $('<img>');
var $caption = $('<p></p>');

// next add the html to the dom
$overlay.append($image);
$overlay.append($caption);
$('body').append($overlay);

// capture the click event on a link to an image and display the light
// box

$('#imageGallery a').click(function(event) {
    event.preventDefault();
    var imageLocation = $(this).attr('href');

    TODO


});




window.onload = getMyLocation;


