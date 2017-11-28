import {WEATHER_API_URL, WEATHER_API_KEY } from './const';

export class Data {

    getInfo(position) {
        return fetch(`${WEATHER_API_URL}${position}&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(res => res.list.map(elem => ({coord: elem.coord, temp: Math.round(elem.main.temp), city: elem.name})))
            .catch(console.log(position));
    }
}