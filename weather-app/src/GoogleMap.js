import {SERVICE_ERROR, BROWSER_ERROR, WIDTH, HEIGHT, FOUND_LOCATION_MESSAGE} from './const.js';
import {Weather} from './Weather';

export class GoogleMap {

    constructor() {
        this.currentTemperature = new Weather();
    }

    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: new google.maps.LatLng(WIDTH, HEIGHT),
            mapTypeId: 'terrain'
        });
        this.infoWindow = new google.maps.InfoWindow({map: this.map});
        this.setLocation()
    }

    setLocation() {
        let temperature = 0;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const currentPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                this.currentTemperature.get(currentPosition)
                    .then(resp => {
                        temperature = resp;
                        this.configInfoWindow(currentPosition, temperature);
                    });
                this.map.setCenter(currentPosition);
            }, () => {
                this.handleLocationError(true);
            });
            return
        }
        this.handleLocationError(false);
    }

    configInfoWindow(currentPosition, temperature) {
        this.infoWindow.setPosition(currentPosition);
        this.infoWindow.setContent(`${FOUND_LOCATION_MESSAGE}, temperature is ${temperature}`);
    };

    handleLocationError(browserHasGeolocation) {
        this.infoWindow.setContent(browserHasGeolocation
            ? SERVICE_ERROR
            : BROWSER_ERROR);
    }
}

