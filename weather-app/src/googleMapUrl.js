import { KEY } from './const';

export const data = {
    key: KEY,
    libraries: 'visualization',
    callback: 'myMap.initMap',
    [Symbol.toPrimitive]: function(hint) {
        if (hint === 'number') {
            throw new Error(`Can't be converted to number!`)
        }

        return Object
            .keys(this)
            .map(param => `${encodeURIComponent(param)}=${encodeURIComponent(this[param])}`)
            .join('&');
    }
};

