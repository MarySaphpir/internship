import {AbstractUrlBuilder} from './AbstractUrlBuilder'
import {MAP_KEY} from '../const/googleMapConfig'

export class GoogleMapUrl extends AbstractUrlBuilder {

    constructor() {
        super();
        this.params = {
            key: MAP_KEY,
            libraries: 'visualization',
            callback: 'googleMap.initMap',
        };
    }
}