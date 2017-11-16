import { WEATHER_API_URL, KELVIN_TEMPERATURE } from './const';
import { WeatherApiUrl } from './urlBuilder/WeatherApiUrl';

export class Weather {

    generateUrl(position){
        const newUrl = new WeatherApiUrl(position);
        return `${newUrl}`;
    }

    get(position) {
        const urlParams = this.generateUrl(position);
        return fetch(`${WEATHER_API_URL}${urlParams}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(temperature) {
                return Math.round(temperature.main.temp - KELVIN_TEMPERATURE)
            })
            .catch(alert);
    }

}