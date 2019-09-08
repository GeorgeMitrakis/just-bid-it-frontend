import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Col from "reactstrap/es/Col";

 const Wrapper = styled.div`
    height: ${props=>props.height};
    width:  ${props=>props.width};
 `;

class Map extends React.Component{


    componentDidMount() {
        this.map = L.map('map', {
            center: [58, 16],
            zoom: 6,
            zoomControl: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
            maxZoom: 18,

        }).addTo(this.map);

        L.marker([58, 16]).addTo(this.map);

    }

    render(){
        return (
            <Col className="d-flex justify-content-center">
            <Wrapper  width="720px" height="720px" id="map"/>
            </Col>
            )
    }
}

export default withRouter(Map);