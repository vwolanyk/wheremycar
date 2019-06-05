// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// function initMap(lat, lng) {
//     var myCoords = new google.maps.LatLng(lat, lng);
//     var bounds = new google.maps.LatLngBounds();
//
//     var map = new google.maps.Map(document.getElementById('map'));
//     var image = "https://img.icons8.com/color/48/000000/car-top-view.png";
//     var marker = new google.maps.Marker({
//         position: myCoords,
//         icon: image,
//         map: map
//     });
//     bounds.extend(marker.position);
//             navigator.geolocation.getCurrentPosition(function(position) {
//                     var pos = {
//                       lat: position.coords.latitude,
//                       lng: position.coords.longitude
//                     };
//                    var userCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//                    var drag_marker = new google.maps.Marker({
//                        position: userCoords,
//                        map: map,
//                        draggable: true
//                    });
//
//                    document.cookie = "latitude="+position.coords.latitude;
//                    document.cookie = "longitude="+position.coords.longitude;
//                    google.maps.event.addListener(drag_marker, 'dragend', function (event) {
//                      document.cookie = "latitude="+drag_marker.position.lat();
//                      document.cookie = "longitude="+drag_marker.position.lng();
//                    });
//                    bounds.extend(drag_marker.position);
//                   });
//
// map.fitBounds(bounds);
// }

document.addEventListener("turbolinks:load", function(){
var place = JSON.parse(document.querySelector("#map").dataset.place);
var map = new GMaps({
  div: '#map'
});
var bounds = new google.maps.LatLngBounds();

navigator.geolocation.getCurrentPosition(success, error, options);
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
function success(pos) {
  var crd = pos.coords;
  var locationMarker = map.addMarker({
    lat: crd.latitude,
    lng: crd.longitude,
    draggable: true
  });

  document.cookie = "latitude="+crd.latitude;
  document.cookie = "longitude="+crd.longitude;
  google.maps.event.addListener(locationMarker, 'dragend', function (event) {
   document.cookie = "latitude="+locationMarker.position.lat();
   document.cookie = "longitude="+locationMarker.position.lng();

 });
 bounds.extend(locationMarker.position);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}


var image = "https://img.icons8.com/color/48/000000/car-top-view.png";
var carMarker = map.addMarker({
  lat: place.latitude,
  lng: place.longitude,
  title: 'Voiture',
  icon: image
});

bounds.extend(carMarker.position);

map.fitBounds(bounds);
map.panToBounds(bounds);  

});
