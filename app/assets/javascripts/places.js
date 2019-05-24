// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function initMap(lat, lng) {
    var myCoords = new google.maps.LatLng(lat, lng);
    var mapOptions = {
    center: myCoords,
    zoom: 17
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var image = "https://img.icons8.com/color/48/000000/car-top-view.png";
    var marker = new google.maps.Marker({
        position: myCoords,
        icon: image,
        map: map

    });

    navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                    };
                   var userCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                   var marker = new google.maps.Marker({
                       position: userCoords,
                       map: map

                   });
                   document.cookie = "latitude="+position.coords.latitude;
                   document.cookie = "longitude="+position.coords.longitude;
                  });

}
