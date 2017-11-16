import { GoogleMapUrl } from './urlBuilder/GoogleMapUrl';
import { MAP_API_URL, MAP_KEY } from './const';

export class GoogleMapScript {
    constructor(){
        this.script = document.createElement('script');
        this.script.async = true;
        this.script.defer = true;
    }

    generateUrl(){
        const urlParams = {
            key: MAP_KEY,
            libraries: 'visualization',
            callback: 'myMap.initMap',
        };
        const newUrl = new GoogleMapUrl(urlParams);
        newUrl.compileUrl(newUrl.params);
        this.script.src = `${MAP_API_URL}${newUrl.params}`;
    }

    append() {
        this.generateUrl();
        document.getElementsByTagName('body')[0].appendChild(this.script);
    }

}