import {GoogleMapUrl} from './urlBuilder/GoogleMapUrl';
import {MAP_API_URL, MAP_KEY} from './const/googleMapConfig';

export class GoogleMapScript {
    constructor() {
        this.script = document.createElement('script');
        this.script.defer = true;
        this.script.async = true;
    }

    generateUrl() {
        const newUrl = new GoogleMapUrl();
        this.script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}&libraries=visualization&callback=googleMap.initMap`;
    }

    append() {
        this.generateUrl();
        document.getElementsByTagName('body')[0].appendChild(this.script);
    }

}