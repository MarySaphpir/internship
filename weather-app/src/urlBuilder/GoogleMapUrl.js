import { UrlBuilder } from './UrlBuilder'

export class GoogleMapUrl extends UrlBuilder {

    constructor(params) {
        super();
        this.params = params;
    }

    compileUrl(param){
        super.compileUrl(param);
    }
}
