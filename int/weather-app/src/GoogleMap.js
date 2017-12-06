import {WIDTH, HEIGHT} from './const/defaultCoordinates.const.js';
import {SERVICE_ERROR, BROWSER_ERROR} from './const/error.const'
import {ApiService} from './ApiService';
import {MarkerGenerator} from './MarkerGenerator'
import {MAX_TEMPERATURE} from './const/weatherApiConfig.const';
import {BLUE_COLOR_ANGLE, TIME_TO_REDROW_MARKER} from './const/markerParam.const';

export class GoogleMap {

    constructor() {
        this.apiService = new ApiService();
    }

    initMap() {
        this.map = this.setMap(); //RENAMEEEEE
        this.markerGenerator = new MarkerGenerator(this.map);
        this.postLocation();
        this.map.addListener('idle', this.redrawCircles());
    }


    //rename!
    setMap() {
        return new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            minZoom: 2,
            maxZoom: 10,
            mapTypeId: 'satellite',
            center: new google.maps.LatLng(WIDTH, HEIGHT)
        });
    }

    redrawCircles() {
        let timer;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.getCoords();
                this.markerGenerator.removeCircles()
            }, TIME_TO_REDROW_MARKER);
        }
    }

    getCoords() {
        const ne = this.map.getBounds().getNorthEast();
        const sw = this.map.getBounds().getSouthWest();
        this.getPoints([sw.lng(), sw.lat(), ne.lng(), ne.lat(), this.map.getZoom()]);
    }

    getPoints(urlParam) {
        this.apiService.getWeatherInfo(urlParam)
            .then(weatherInfo =>
                weatherInfo.forEach(dataPoint => {
                    const circle = {
                        city: dataPoint.city,
                        coordinates: dataPoint.coord,
                        temperature: dataPoint.temp,
                        color: this.setColor(dataPoint.temp)
                    };
                    this.markerGenerator.createMarker(circle)
                })
            )
    }

    //RENAME

    setColor(temperature) {
        const weight = Math.abs(temperature) / MAX_TEMPERATURE;
        const colorTone = ((1 - weight) * BLUE_COLOR_ANGLE).toString();
        return `hsl(${colorTone}, 100%, 50%)`
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
