import {MIN_CIRCLE_RADIUS, RADIUS_COEFFICIENT, MAX_CIRCLE_RADIUS, AVERAGE_RADIUS} from './const/markerParam.const';

export class MarkerGenerator {

    constructor(map) {
        this.markersArray = [];
        this.map = map;
    }

    removeCircles() {
        this.markersArray.forEach(marker => {
            google.maps.event.clearInstanceListeners(marker);
            marker.setMap(null)
        })
        this.markersArray.length = 0;
    }

    showInfo({coordinates, temperature, city}, cityCircle) {
        const infowindow = new google.maps.InfoWindow({
            content: `In ${city} temperature is: ${temperature} C`,
            position: {lat: coordinates.Lat, lng: coordinates.Lon},
        });
        cityCircle.addListener('click', () => infowindow.open(this.map, cityCircle));
    }

    getRadius() {
        const radius = this.map.getZoom() < AVERAGE_RADIUS
            ? MAX_CIRCLE_RADIUS - RADIUS_COEFFICIENT
            : MIN_CIRCLE_RADIUS - RADIUS_COEFFICIENT;
        return radius / this.map.getZoom()

    }

    initCircle(circleParam) {
        return new google.maps.Circle({
            strokeColor: circleParam.color,
            strokeOpacity: 0.8,
            strokeWeight: .2,
            fillColor: circleParam.color,
            fillOpacity: .5,
            map: this.map,
            center: {lat: circleParam.coordinates.Lat, lng: circleParam.coordinates.Lon},
            radius: this.getRadius()
        });
    }

    createMarker(circleParam) {
        const circle = this.initCircle(circleParam);
        this.showInfo(circleParam, circle);
        this.markersArray.push(circle)
    }
}
