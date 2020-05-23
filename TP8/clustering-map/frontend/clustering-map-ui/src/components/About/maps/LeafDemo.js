import React from 'react';
import {markers} from '../maps/markers'

import { Container } from '@material-ui/core'

//************************************** React Leaflet ******************************************
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';

const leafletContainer = { width: '100%', height: '100vh'}

const myIcon = L.icon({
    iconUrl: require('../maps/images/pin24.png'),
    iconRetinaUrl: require('../maps/images/pin48.png'),
    iconSize: [29, 24],
    iconAnchor: [9, 21],
    popupAnchor: [0, -14]
});

//********************************************* Components *********************************************
export default function LeafDemo() {

  return (
    <Container fixed>
      <Map className="markercluster-map" center={[10.0, 5.0]} minZoom={2} zoom={2} style={leafletContainer}>
        <TileLayer
            url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            subdomains={['a','b','c']}
        />
        <MarkerClusterGroup>
        {
          markers.map(m => (
            
                <Marker
                    key={m.iata_faa}
                    position={[m.lat, m.lng]}
                    icon={myIcon}
                >

                    <Popup
                        position={[m.lat, m.lng]}
                        closeButton={false}
                    >
                        <h2>Nombre: {m.name}</h2>
                        <p>Ciudad: {m.city}</p>
                        <p>IATA/FAA:: {m.iata_faa}</p>
                        <p>ICAO: {m.icao}</p>
                        <p>Altitude: {Math.round( m.alt * 0.3048 )}m</p>
                        <p>Timezone: {m.tz}</p>
                    </Popup>

                </Marker>
            
          ))
        }
        </MarkerClusterGroup>
      </Map>   
    </Container>   
  )

}