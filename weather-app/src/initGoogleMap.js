import { data } from './googleMapUrl';

export class GoogleMapScript {
    constructor(){
        this.script = document.createElement('script');
        this.script.async = true;
        this.script.defer = true;
        this.script.src = `https://maps.googleapis.com/maps/api/js?${data}`;
    }

    append() {
        document.getElementsByTagName('body')[0].appendChild(this.script);
    }

}