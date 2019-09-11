import React from 'react';
import L from 'leaflet';
import { withRouter } from 'react-router-dom';
import {Col} from "reactstrap";
import { Map, TileLayer } from 'react-leaflet';
import styles from './Map.module.css';
import Marker from './Marker';




class MyMap extends React.Component{

    constructor(props){
        super(props);
        
        let lat = 37.9838;
        let lng = 23.7275;
        let zoom = 13;

        if(this.props.lat !== undefined && this.props.lat !== null){
            lat = this.props.lat;
        }
        if(this.props.lng !== undefined && this.props.lng !== null){
            lng = this.props.lng;
        }
        if(this.props.zoom !== undefined && this.props.zoom !== null){
            zoom = this.props.zoom;
        }
        
        this.state = {
            lat: lat,
            lng: lng,
            zoom: zoom,
            //clickedOnMap: false
        }
    }
    
    
    setCenterHandler(lat, lng){
        this.setState({lat:lat, lng:lng});
        console.log(lat,lng);
    }

    zoomHandler(zoom){
        this.setState({zoom:zoom});
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        let style ;
        if(this.props.className===undefined){
            style = styles.map;
        }
        else{
            style = this.props.className;
        }
        return (
                <Map 
                    className={style} 
                    center={position} 
                    zoom={this.state.zoom} 
                    onClick={(event) => this.setCenterHandler(event.latlng.lat, event.latlng.lng)} 
                    onZoomEnd={(event)=> this.zoomHandler(event.target._zoom)}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* {this.state.clickedOnMap === true ? 
                    <Marker 
                        position={position}>
                    </Marker>: null} */}
                    {this.props.children}
                </Map>
        )
    }
}

export default withRouter(MyMap);