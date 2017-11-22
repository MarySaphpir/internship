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
        this.postLocation();
        this.eqfeed_callback();
    }

    eqfeed_callback() {

        const gradient = [
            'rgba(255, 0, 0, 0)',
            'rgba(0, 255, 0, 0.7)',
            'rgba(173, 255, 47, 0.5)',
            'rgba(255, 0, 255, 0.9)',
            'rgba(255, 0, 0, 1)'
        ];

        let heatMapData = [
            {location: new google.maps.LatLng(49.446, 32.064)},
            {location: new google.maps.LatLng(49.446, 32.060)}
        ];

        let heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatMapData,
            dissipating: false,
            map: this.map,

        });

        heatmap.set('gradient', gradient);
    }

    postLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let currentPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.setInfoWindow(currentPosition)
            }, () => {
                this.handleLocationError(true);
            });
            return
        }
        this.handleLocationError(false);
    }

    setInfoWindow(currentPosition) {
        this.currentTemperature.get(currentPosition)
            .then(resp => {
                this.configInfoWindow(currentPosition, resp);
            });
        this.map.setCenter(currentPosition);
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

