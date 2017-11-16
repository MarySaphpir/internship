export class UrlBuilder {

    compileUrl(obj) {
        obj[Symbol.toPrimitive] = function(hint) {
            if (hint === 'number') {
                throw new Error(`Can't be converted to number!`)
            }

            return Object
                .keys(this)
                .map(param => `${encodeURIComponent(param)}=${encodeURIComponent(this[param])}`)
                .join('&');
        };
    }
}