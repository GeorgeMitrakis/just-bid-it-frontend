import React from 'react';
import L from 'leaflet';
import { withRouter } from 'react-router-dom';
import {Col} from "reactstrap";
import { Map, TileLayer } from 'react-leaflet';
import styles from './Map.module.css';
import Marker from './Marker';




const MyMap = (props) => {
    let style ;
        if(props.className===undefined){
            style = styles.map;
        }
        else{
            style = props.className;
        }
    return(
        <Map 
            className={style} 
            center={props.position} 
            zoom={props.zoom} 
            onClick={(event) => props.coordsHandler(event.latlng.lat, event.latlng.lng)} 
            onZoomEnd={(event) => props.zoomHandler(event.target._zoom)}
        >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {props.children}
        </Map>
    )
}

export default withRouter(MyMap);