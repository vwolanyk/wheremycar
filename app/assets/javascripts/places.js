// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function initMap(lat, lng) {
    var myCoords = new google.maps.LatLng(lat, lng);
    var bounds = new google.maps.LatLngBounds();

    var map = new google.maps.Map(document.getElementById('map'));
    var image = "https://img.icons8.com/color/48/000000/car-top-view.png";
    var marker = new google.maps.Marker({
        position: myCoords,
        icon: image,
        map: map
    });
    bounds.extend(marker.position);
    navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                    };
                   var userCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                   var marker = new google.maps.Marker({
                       position: userCoords,
                       map: map,
                       draggable: true
                   });
                   bounds.extend(marker.position);
                   document.cookie = "latitude="+position.coords.latitude;
                   document.cookie = "longitude="+position.coords.longitude;
                   google.maps.event.addListener(marker, 'dragend', function (event) {
                     document.cookie = "latitude="+marker.position.lat();
                     document.cookie = "longitude="+marker.position.lng();
                   });
                  });
map.fitBounds(bounds);
map.setZoom(100);
}
