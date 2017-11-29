import { WIDTH, HEIGHT, FOUND_LOCATION_MESSAGE } from './const/defaultCoordinates.js';
import { SERVICE_ERROR, BROWSER_ERROR } from './const/error'
import {ApiService} from './ApiService';
import {MarkerGenerator} from './MarkerGenerator'

export class GoogleMap {

    constructor() {
        this.currentData = new ApiService();
    }

    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            minZoom: 2,
            maxZoom: 10,
            center: new google.maps.LatLng(WIDTH, HEIGHT),
            mapTypeId: 'satellite'
        });
        this.markerGenerator = new MarkerGenerator(this.map);
        this.postLocation();
        this.map.addListener('idle', this.redrawCircles());
    }

    redrawCircles() {
        let timer;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.getCoords();
                this.markerGenerator.removeCircles(this.markerGenerator.markersArray)
            }, 500);
        }
    }

    getCoords() {
        const ne = this.map.getBounds().getNorthEast();
        const sw = this.map.getBounds().getSouthWest();
        this.getPoints([sw.lng(), sw.lat(), ne.lng(), ne.lat(), this.map.getZoom()]);
    }

    getPoints(urlParam) {
        this.currentData.getWeatherInfo(urlParam)
            .then(response =>
                response.map((dataPoint) => ({
                    city: dataPoint.city,
                    coordinates: dataPoint.coord,
                    temperature: dataPoint.temp,
                    color: this.setColor(dataPoint.temp)
                }))
            )
            .then(response => {
                for (let circle in response) {
                    this.markerGenerator.createCircle(response[circle]);
                }
            })
    }

    setColor(temperature) {
        const weight = Math.abs(temperature) / 50;
        const hue = ((1 - weight) * 250).toString(10);
        return `hsl(${hue}, 100%, 50%)`
    };

    postLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const currentPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.map.setCenter(currentPosition);
            }, () => {
                this.handleLocationError(true);
            });
            return
        }
        this.handleLocationError(false);
    }

    handleLocationError(browserHasGeolocation) {
        this.infoWindow.setContent(browserHasGeolocation
            ? SERVICE_ERROR
            : BROWSER_ERROR);
    }

}
