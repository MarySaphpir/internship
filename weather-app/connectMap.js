const SERVICE_ERROR = 'Error: The Geolocation service failed.';
const BROWSER_ERROR = 'Error: Your browser doesn\'t support geolocation.';
const DEFAULT_WIDTH_LOCATION = 2.8;
const DEFAULT_HEIGHT_LOCATION = -187.3;
const FOUND_LOCATION_MESSAGE = 'Your location';

class GoogleMap {

    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: new google.maps.LatLng(DEFAULT_WIDTH_LOCATION, DEFAULT_HEIGHT_LOCATION),
            mapTypeId: 'terrain' // const config
        });
        this.infoWindow = new google.maps.InfoWindow({map: this.map});

        this.getLocation()
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                this.configInfoWindow();
                this.map.setCenter(this.pos);
            }, () => {
                this.handleLocationError(true);
            });

            return
        }

        this.handleLocationError(false);

    }

    configInfoWindow() {
        this.infoWindow.setPosition(this.pos);
        this.infoWindow.setContent(FOUND_LOCATION_MESSAGE);
    };

    handleLocationError(browserHasGeolocation) {
        this.infoWindow.setPosition(this.pos);
        this.infoWindow.setContent(browserHasGeolocation
            ? SERVICE_ERROR
            : BROWSER_ERROR );
    } // ref
}

myMap = new GoogleMap();
