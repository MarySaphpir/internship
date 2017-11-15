import { SERVICE_ERROR, BROWSER_ERROR, WIDTH, HEIGHT, FOUND_LOCATION_MESSAGE  } from './const.js';

export class GoogleMap {

    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: new google.maps.LatLng(WIDTH, HEIGHT),
            mapTypeId: 'terrain'
        });
        this.infoWindow = new google.maps.InfoWindow({map: this.map});

        this.setLocation()
    }

    setLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.configInfoWindow(pos);
                this.map.setCenter(pos);
            }, () => {
                this.handleLocationError(true);
            });

            return
        }

        this.handleLocationError(false);

    }

    configInfoWindow(pos) {
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent(FOUND_LOCATION_MESSAGE);
    };

    handleLocationError(browserHasGeolocation) {
        this.infoWindow.setContent(browserHasGeolocation
            ? SERVICE_ERROR
            : BROWSER_ERROR );
    }
}

