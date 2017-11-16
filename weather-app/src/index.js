import { GoogleMap } from './GoogleMap';
import { GoogleMapScript } from './GoogleMapScript';

window.googleMap = new GoogleMap();
const googleMapScript = new GoogleMapScript();

googleMapScript.append();
googleMapScript.script.onload = () => {
    window.googleMap.initMap();
};
