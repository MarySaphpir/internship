import {WEATHER_API_URL, WEATHER_API_KEY } from './const/googleMapConfig';

export class ApiService {

    getWeatherInfo(position) {
        return fetch(`${WEATHER_API_URL}${position}&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(res => res.list.map(({coord, main, name}) => ({coord: coord, temp: Math.round(main.temp), city: name})))
            .catch(position);
    }
}