import {MIN_CIRCLE_RADIUS, RADIUS_COEFFICIENT, MAX_CIRCLE_RADIUS, AVERAGE_RADIUS} from './const/markerParam';

export class MarkerGenerator {

    constructor(map) {
        this.markersArray = [];
        this.map = map;
    }

    removeCircles(markersArray) {
        for (const i in markersArray) {
            markersArray[i].setMap(null)
        }
    }

    showInfo({coordinates, temperature, city}, cityCircle) {
        const infowindow = new google.maps.InfoWindow({
            content: `In ${city} temperature is: ${temperature} C`,
            position: ({lat: coordinates.Lat, lng: coordinates.Lon}),
        });
        cityCircle.addListener('click', () => infowindow.open(this.map, cityCircle));
        cityCircle.addListener('mouseout', () => infowindow.close(this.map, cityCircle));
    }

    getRadius() {
        const radius = this.map.getZoom() < AVERAGE_RADIUS
            ? MAX_CIRCLE_RADIUS - RADIUS_COEFFICIENT
            : MIN_CIRCLE_RADIUS - RADIUS_COEFFICIENT;
        return radius / this.map.getZoom()

    }

    createCircle(circleParam) {
        const circle = new google.maps.Circle({
            strokeColor: circleParam.color,
            strokeOpacity: 0.8,
            strokeWeight: .2,
            fillColor: circleParam.color,
            fillOpacity: .5,
            map: this.map,
            center: ({lat: circleParam.coordinates.Lat, lng: circleParam.coordinates.Lon}),
            radius: this.getRadius()
        });
        this.showInfo(circleParam, circle);
        this.markersArray.push(circle)
    }
}
