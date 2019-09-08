import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

 const Wrapper = styled.div`
    height: ${props=>props.height};
    width:  ${props=>props.width};
 `;

class Map extends React.Component{

    var mymap = L.map('mapid').setView([51.505, -0.09], 13);

}