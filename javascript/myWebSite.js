/*
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
*/

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

$('.imagegallery a').click(function(event) {
    event.preventDefault();
    var imageLocation = $(this).attr('href');
    // update with the image linked in the link
    $image.attr('src', imageLocation);
    // Show the overlay.
    $overlay.show();
    // Get child's alt attribute and set caption variable
    var captionText = $(this).children('img').attr('alt');
    $caption.text(captionText);
});

/*
When everlay is clicked hide the overlay
*/

$overlay.click(function  () {
    $overlay.hide();
});

$(document).ready(function(){
    $(".blogTitle").click(function(){
        $(this).next("div").toggle('slow');
    });
});

  // window.onload = getMyLocation;
