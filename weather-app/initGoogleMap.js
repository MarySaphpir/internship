const KEY = 'AIzaSyAsPZDqrpgqq65I_XWaTkX7Y8Ac5QNLZDM';
const script = document.createElement('script');
let data = { key: KEY, libraries: 'visualization', callback: 'myMap.initMap'};

let paramString  = '';
for (let param in data) {
    paramString += encodeURIComponent(param).concat('=',  encodeURIComponent(data[param]), '&');
}
data = {
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case 'number':
                return 0;
            case 'string':
                return paramString;
            case 'default':
                return 'default';
            default:
                throw new Error();
        }
    }

};

script.async = true;
script.defer = true;
script.src = `https://maps.googleapis.com/maps/api/js?${String(data)}`;
document.getElementsByTagName('body')[0].appendChild(script);

