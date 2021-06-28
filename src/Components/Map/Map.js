import React from 'react'
import { GoogleMap, withGoogleMap, withScriptjs, Marker, InfoWindow} from "react-google-maps";

const MyGoogleMap = withScriptjs(
    withGoogleMap(
        props => (
        <GoogleMap 
            defaultZoom={10} 
            defaultCenter={{ 
                lat: 31.921279, 
                lng: 34.857445
            }}
        >
            <Marker 
                position={{ 
                    lat: 31.883771, 
                    lng: 34.959556 
                }} 
                onClick={() => props.onToggleOpen()}
            >
                {props.isOpen ? 
                    <InfoWindow>
                        <div className="pl-4">
                            <h2 className="text-xl text-center">
                                {props.name}
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet tincidunt sapien, sit amet convallis sem. Proin sed finibus mauris, 
                                vitae aliquam metus. Praesent imperdiet quam nec lorem laoreet.
                            </p>
                            <p>
                                {props.address} {props.zipcode}
                            </p>
                            <p>
                                {props.city}, {props.country}
                            </p>
                            <p>
                                Tel.: {props.phone}
                            </p>
                            <p>
                                <a 
                                    href="#homepage" 
                                    className="underline text-blue-400"
                                >
                                    {props.title}
                                </a>
                            </p>
                            <img 
                                src="https://live.staticflickr.com/8304/8015843393_6701ed8039_b.jpg" 
                                width="200px" 
                                alt="comicbooksImage"
                            />
                        </div>
                    </InfoWindow> 
                : null}
            </Marker>
        </GoogleMap>
        )
    )
)

export default class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
        }
        this.onToggleOpen = this.onToggleOpen.bind(this)
    }

    onToggleOpen() {
        
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        return (
            <div>
                <MyGoogleMap
                    isOpen = {this.state.isOpen}
                    title = "Homepage"
                    address = {this.props.address}
                    name = {this.props.name}
                    zipcode = {this.props.zipcode}
                    city = {this.props.city}
                    country = {this.props.country}
                    phone = {this.props.phone}
                    onToggleOpen = {this.onToggleOpen}
                    loadingElement={<div>Loading....</div>}
                    containerElement={
                        <div 
                            style={{
                                width: '95%', 
                                height: '90%'
                            }} 
                            className="map mx-auto border-8 rounded border-gray-300"
                        >
                        </div>
                    }
                    mapElement={
                        <div 
                            style={{
                                height: '400px'
                            }} 
                            className="inner-map"
                        >
                        </div>
                    }
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVtHhDa2ErB1UuzEc1t3dXozBGaSHiQZk&v=3.exp&libraries=geometry,drawing,places"

                />
            </div>
        )
    }
}