const KEY = 'AIzaSyAsPZDqrpgqq65I_XWaTkX7Y8Ac5QNLZDM';
const script = document.createElement('script');
const data = { 'key': KEY, 'libraries': 'visualization'};

let urlString = '';

function encodeQueryData(data) {
    let ret = [];
    for (let param in data)
        ret.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[param]));
    urlString = ret.join('&');
    return ret.join('&');
}

encodeQueryData(data);

script.async = true;
script.defer = true;
script.src = `https://maps.googleapis.com/maps/api/js?${urlString}&callback=myMap.initMap`;
document.getElementsByTagName('body')[0].appendChild(script);

