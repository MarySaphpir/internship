import {WEATHER_API_URL, WEATHER_API_KEY} from './const';
import {WeatherApiUrl} from './urlBuilder/WeatherApiUrl';

export class Weather {

    generateUrl(position) {
        const newUrl = new WeatherApiUrl(position);
        return `${newUrl}`;
    }

    getCoordinates() {
        // const urlParams = this.generateUrl(position);
        return fetch(`http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(coord => coord.list.map(elem => elem.coord))
            .catch(alert);
    }

    getTemperature() {
        // const urlParams = this.generateUrl(position);
        return fetch(`http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(temperature => temperature.list.map(elem => Math.round(elem.main.temp)))
            .catch(alert);
    }

    getColor() {
        const colorArray = [];
        this.getTemperature()
            .then(res => res.map(temp => {
                    if (temp <= 100) {
                        colorArray.push('green')
                    } else if (temp > 100 && temp <= 200) {
                        colorArray.push('yellow')
                    } else {
                        colorArray.push('red')
                    }
                })
            );
        return colorArray;
    }

    // createInstance () {
    //    this.getTemperature()
    //         .then(resp => {
    //             this.temperature = resp;
    //         });
    //    this.getCoordinates()
    //        .then(coordinates => {
    //            this.res = coordinates.map((coord, index) => ({
    //                location: new google.maps.LatLng(coord), weight: this.temperature[index]
    //            }));
    //            Promise.resolve(this.res).then( res => res)
    //        });
    // }
    // get (position) {
    //     const urlParams = this.generateUrl(position);
    //     return fetch(`${WEATHER_API_URL}${urlParams}`)
    //         .then(response => response.json())
    //         .then(temperature => Math.round(temperature.main.temp - KELVIN_TEMPERATURE))
    //         .catch(alert);
    // }

}