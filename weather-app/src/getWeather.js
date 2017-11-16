import { WEATHER_API_URL, WEATHER_API_KEY } from './const';
import { WeatherApiUrl } from './urlBuilder/WeatherApiUrl';

export class GetWeather {

    generateUrl(pos){
        const paramsList = {
            lat: pos.lat,
            lon: pos.lng,
            appid: WEATHER_API_KEY
        };
        let newUrl = new WeatherApiUrl(paramsList);
        newUrl.compileUrl(newUrl.params);
        return `${newUrl.params}`;
    }

    getTemperature(pos) {
        const urlParams = this.generateUrl(pos);
        return fetch(`${WEATHER_API_URL}${urlParams}`)
            .then(function(response) {
                return response.json();
            })
            .then(function(temperature) {
                return Math.round(temperature.main.temp - 273.15)
            })
            .catch(alert);
    }

}