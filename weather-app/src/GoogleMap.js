import { SERVICE_ERROR, BROWSER_ERROR, WIDTH, HEIGHT, FOUND_LOCATION_MESSAGE  } from './const.js';
import { GetWeather } from './GetWeather';

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
        let temperature = 0;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                const currentTemperature = new GetWeather();
                currentTemperature.getTemperature(pos)
                    .then(resp => {
                        temperature = resp;
                        this.configInfoWindow(pos, temperature);
                    });
                this.map.setCenter(pos);
            }, () => {
                this.handleLocationError(true);
            });

            return
        }

        this.handleLocationError(false);

    }

    configInfoWindow(pos, temperature) {
        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent(`${FOUND_LOCATION_MESSAGE}, temperature is ${temperature}`);
    };

    handleLocationError(browserHasGeolocation) {
        this.infoWindow.setContent(browserHasGeolocation
            ? SERVICE_ERROR
            : BROWSER_ERROR );
    }
}

