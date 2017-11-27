import {SERVICE_ERROR, BROWSER_ERROR, WIDTH, HEIGHT, FOUND_LOCATION_MESSAGE} from './const.js';
import {Weather} from './Weather';

export class GoogleMap {

    constructor() {
        this.currentTemperature = new Weather(); //RENAME
    }

    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom:10,
            minZoom: 2,
            center: new google.maps.LatLng(WIDTH, HEIGHT),
            mapTypeId: 'terrain'
        });
        this.infoWindow = new google.maps.InfoWindow({map: this.map});
        this.getPoints().then(res => {
            for (let circle in res) {
                this.createMarker(res[circle]);
                this.showTemperature(res[circle].coordinates, res[circle].temperature)
            }
        });
        this.postLocation()
    }

    showTemperature(coordinates,temperature ){
        const infoWindow = new google.maps.InfoWindow({
            location: new google.maps.LatLng(coordinates),
            content: `${temperature}`,
            position: coordinates
        });
        infoWindow.open(this.map);
    }

    createMarker(circleParam){
        let cityCircle = new google.maps.Circle({
            strokeColor: circleParam.color,
            strokeOpacity: 0.8,
            strokeWeight: .2,
            fillColor: circleParam.color,
            fillOpacity: .5,
            map: this.map,
            center: circleParam.coordinates,
            radius: Math.pow(circleParam.temperature, 3)
        });
    }

    getPoints() {

        return Promise.all([
            this.currentTemperature.getTemperature(),
            this.currentTemperature.getCoordinates(),
            this.currentTemperature.getColor()
        ])
            .then(res =>
                res[1].map((coord, index) => ({
                    coordinates: ({lat: coord.Lat, lng: coord.Lon}),
                    temperature: res[0][index],
                    color: this.setColor(res[0][index])
                }))
            )
    }

    setColor(temperature) {
        if (temperature <= 10) {
            return ('green')
        } else if (temperature > 15 && temperature <= 20) {
            return ('yellow')
        } else {
            return ('red')
        }
    };

    postLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let currentPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.map.setCenter(currentPosition);
                this.configInfoWindow(currentPosition);
            }, () => {
                this.handleLocationError(true);
            });
            return
        }
        this.handleLocationError(false);
    }

    configInfoWindow(currentPosition, temperature) {
        this.infoWindow.setPosition(currentPosition);
        this.infoWindow.setContent(`${FOUND_LOCATION_MESSAGE}`);
    };

    handleLocationError(browserHasGeolocation) {
        this.infoWindow.setContent(browserHasGeolocation
            ? SERVICE_ERROR
            : BROWSER_ERROR);
    }

}

