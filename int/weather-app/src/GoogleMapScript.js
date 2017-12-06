import {MAP_KEY} from './const/googleUrlParams.const';

export class GoogleMapScript {
    constructor() {
        this.script = document.createElement('script');
        this.script.defer = true;
        this.script.async = true;
    }

    append() {
        this.script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}&libraries=visualization&callback=googleMap.initMap`;
        document.getElementsByTagName('body')[0].appendChild(this.script);
    }

}