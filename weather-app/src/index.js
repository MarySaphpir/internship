import { GoogleMap } from './connectMap';
import { GoogleMapScript } from './initGoogleMap';

window.googleMap = new GoogleMap();
const googleMapScript = new GoogleMapScript();

googleMapScript.append();
googleMapScript.script.onload = () => {
    window.googleMap.initMap();
};
