import {AbstractUrlBuilder} from './AbstractUrlBuilder';
import {WEATHER_API_KEY} from '../const';

export class WeatherApiUrl extends AbstractUrlBuilder {

    constructor({lat, lng: lon}) {
        super();
        this.params = {
            lat,
            lon,
            appid: WEATHER_API_KEY
        };
    }
}
