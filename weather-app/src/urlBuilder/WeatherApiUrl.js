import {AbstractUrlBuilder} from './AbstractUrlBuilder';
import {WEATHER_API_KEY} from '../const';

export class WeatherApiUrl extends AbstractUrlBuilder {

    constructor(position) {
        super();
        let {lat, lng: lon} = position;
        this.params = {
            lat,
            lon,
            appid: WEATHER_API_KEY
        };
    }
}