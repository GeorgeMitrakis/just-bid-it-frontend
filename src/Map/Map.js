import React from 'react';
import { withRouter } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';
import styles from './Map.module.css';




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
            zoomControl={props.zoomControl}
            onClick={props.onClick} 
            onZoomEnd={props.onZoomEnd}
            minZoom={props.minZoom}
            maxZoom={props.maxZoom}
            
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