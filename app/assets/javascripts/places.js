// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
document.addEventListener("turbolinks:load", function() {

    var place = JSON.parse(document.querySelector("#map").dataset.place);
    var bounds = new google.maps.LatLngBounds();

    navigator.geolocation.getCurrentPosition(function(position) {
        var map = new GMaps({
            div: '#map'
        });

        var crd = position.coords;
        var locationMarker = map.addMarker({
            lat: crd.latitude,
            lng: crd.longitude,
            draggable: true
        });

        document.cookie = "latitude=" + crd.latitude;
        document.cookie = "longitude=" + crd.longitude;
        google.maps.event.addListener(locationMarker, 'dragend', function(event) {
            document.cookie = "latitude=" + locationMarker.position.lat();
            document.cookie = "longitude=" + locationMarker.position.lng();

        });
        bounds.extend(locationMarker.position);

        var image = "https://img.icons8.com/color/48/000000/car-top-view.png";
        var carMarker = map.addMarker({
            lat: place.latitude,
            lng: place.longitude,
            title: 'Voiture',
            icon: image
        });

        bounds.extend(carMarker.position);
        window.bounds = bounds;
        map.fitBounds(bounds);
        
        var listener = google.maps.event.addListener(map, "idle", function() {
            if (map.getZoom() > 17) map.setZoom(17);
            google.maps.event.removeListener(listener);
        });
    });
});
