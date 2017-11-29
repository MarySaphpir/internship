import {GoogleMapUrl} from './urlBuilder/GoogleMapUrl';
import {MAP_API_URL} from './const/googleMapConfig';

export class GoogleMapScript {
    constructor() {
        this.script = document.createElement('script');
        this.script.defer = true;
        this.script.async = true;
    }

    generateUrl() {
        const newUrl = new GoogleMapUrl();
        this.script.src = `${MAP_API_URL}${newUrl}`;
    }

    append() {
        this.generateUrl();
        document.getElementsByTagName('body')[0].appendChild(this.script);
    }

}