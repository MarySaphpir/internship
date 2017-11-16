import { GoogleMap } from './GoogleMap';
import { GoogleMapScript } from './GoogleMapScript';

window.googleMap = new GoogleMap();
const googleMapScript = new GoogleMapScript();

googleMapScript.append();
googleMapScript.script.addEventListener("error", (error) => console.log(error));