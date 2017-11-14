const KEY = 'AIzaSyAsPZDqrpgqq65I_XWaTkX7Y8Ac5QNLZDM';

const script = document.createElement('script');
const data = { 'key': KEY };

let str = '';

function encodeQueryData(data) {
    let ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    str = ret.join('&');
    return ret.join('&');
}

encodeQueryData(data);

script.async = true;
script.defer = true;
script.src = `https://maps.googleapis.com/maps/api/js?${str}&libraries=visualization&callback=myMap.initMap`;
document.getElementsByTagName('body')[0].appendChild(script);

