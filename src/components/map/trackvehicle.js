import React from "react";
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import carIcon from "../../rsc/topcar.png";

class trackVehicle extends React.Component {

    render() {
        return(
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{lat: -6.1754, lng: 106.8272}}
            >
                <Marker
                    position={{ lat: -6.1754, lng: 106.8272 }}
                    icon={{
                        url: carIcon,
                        anchor: new this.props.google.maps.Point(9,19),
                        scaledSize: new this.props.google.maps.Size(18,38)
                    }}
                />
            </Map>
        )
    }
}

const mapStyles = {
    width: '100%',
    height: '90%'
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB39NEIuboRnTEzFIwmXno95gEkDQ1-rHE'
})(trackVehicle);