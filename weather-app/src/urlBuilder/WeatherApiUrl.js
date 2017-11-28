import {AbstractUrlBuilder} from './AbstractUrlBuilder';
import {WEATHER_API_KEY} from '../const';

export class WeatherApiUrl extends AbstractUrlBuilder {

    constructor({bbox}) {
        super();
        this.params = {
            bbox,
            appid: WEATHER_API_KEY
        };
    }
}
