export class AbstractUrlBuilder {
    constructor() {
        this.params = {};
    }

    [Symbol.toPrimitive] (hint){
        if (hint === 'number') {
            throw new Error(`Can't be converted to number!`)
        }
        if(Object.keys(this.params).length === 0) {
            return Object
                .keys(this.params)
                .map(param => `${encodeURIComponent(param)}=${encodeURIComponent(this.params[param])}`)
                .join('&');
        }
        return this.params;
    }
}