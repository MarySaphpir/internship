import { SERVICE_ERROR, BROWSER_ERROR, DEFAULT_WIDTH_LOCATION, DEFAULT_HEIGHT_LOCATION, FOUND_LOCATION_MESSAGE  } from './const.js';

class GoogleMap {

    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: new google.maps.LatLng(DEFAULT_WIDTH_LOCATION, DEFAULT_HEIGHT_LOCATION),
            mapTypeId: 'terrain'
        });
        this.infoWindow = new google.maps.InfoWindow({map: this.map});

        this.setLocation()
    }

    setLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.configInfoWindow();
                this.map.setCenter(this.pos);
            }, () => {
                this.handleLocationError(true);
            });

            return
        }

        this.handleLocationError(false);

    }

    configInfoWindow() {
        this.infoWindow.setPosition(this.pos);
        this.infoWindow.setContent(FOUND_LOCATION_MESSAGE);
    };

    handleLocationError(browserHasGeolocation) {
        this.infoWindow.setContent(browserHasGeolocation
            ? SERVICE_ERROR
            : BROWSER_ERROR );
    }
}

export let myMap = new GoogleMap();
