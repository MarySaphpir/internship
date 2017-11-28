import { MIN_CIRCLE_RADIUS, RADIUS_COEFFICIENT, MAX_CIRCLE_RADIUS } from './const';

export class MarkerGenerator {

    constructor(map) {
        this.arr = [];
        this.map = map;
    }

    removeCircles(markersArray) {
        for (let i in markersArray) {
            markersArray[i].setMap(null)
        }
    }

    showInfo({coordinates, temperature, city}, cityCircle) {
        const infowindow = new google.maps.InfoWindow({
            content: `In ${city} temperature is: ${temperature} C`,
            position: ({lat: coordinates.Lat, lng: coordinates.Lon}),
            fontSize: 40
        });
        cityCircle.addListener('click', () => this.openInfowindow(infowindow, cityCircle));
    }

    openInfowindow(infowindow, cityCircle) {
        infowindow.open(this.map, cityCircle);
    }

    closeInfowindow(infowindow, cityCircle) {
        return infowindow.close(this.map, cityCircle);
    }

    setRadius() {
        if (this.map.getZoom() < 6) {
            return (MAX_CIRCLE_RADIUS - RADIUS_COEFFICIENT)/this.map.getZoom()
        } else {
            return (MIN_CIRCLE_RADIUS - RADIUS_COEFFICIENT)/this.map.getZoom()
        }
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
            radius: this.setRadius()
        });
        console.log(this.map.getZoom());
        console.log(circle.radius);

        this.showInfo(circleParam, circle);
        this.arr.push(circle)
    }
}
