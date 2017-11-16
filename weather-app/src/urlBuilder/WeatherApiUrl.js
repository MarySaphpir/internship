import { AbstractUrlBuilder } from './AbstractUrlBuilder';
import { WEATHER_API_KEY } from '../const';

export class WeatherApiUrl extends AbstractUrlBuilder {

    constructor(position) {
        super();
        this.params = {
            lat: position.lat,
            lon: position.lng,
            appid: WEATHER_API_KEY
        };
    }
}