// React
import React, { useState, useEffect } from 'react';


// MAterian-UI
import {
    Paper,
    Typography,
    Badge
} from '@material-ui/core'

import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { GoogleMaps } from '../credentials';
import { ApiUrlBase } from '../constants';
import axios from 'axios';

function Map (props) {
    const [showInfoIndex, setShowInfoIndex] = useState(null)

    const handleToggleOpen = index => setShowInfoIndex(index)
    const handleToggleClose = () => setShowInfoIndex(null)

    const [currentCoords, setCurrentCoords] = useState({lat: '', lon: ''})
    const handleCurrentCoords = (lat, lon) => setCurrentCoords({lat: lat, lon: lon})
    
    const [points, setPoints ] = useState([])
    const handlePoints = points => setPoints(points)
    
    useEffect(() => {
        const getCurrentGeopos = async () => {
            return await navigator.geolocation.getCurrentPosition(pos => 
                handleCurrentCoords(pos.coords.latitude, pos.coords.longitude));
        }
        getCurrentGeopos()
    }, []);

    useEffect(() => {
        console.log('Rendering Map');
        const fetchPoints = async () => {
            if (props.interestGroup){
                const pointsWithCoordsFetched = await axios.get(`${ApiUrlBase}/${props.interestGroup}/local-list-with-coords`)
                if (pointsWithCoordsFetched.data)
                    return handlePoints(pointsWithCoordsFetched.data)
            }
        }
        fetchPoints()
    }, [props])

    const MapWithMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{ lat: -32.4737588, lng: -58.3050524 }}
        >
        <Marker
            position={{ lat: currentCoords.lat, lng: currentCoords.lon }}
            key="mypos"
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        >
        </Marker>
            {points.map((pointWC, counter) => (
                    <Marker
                        position={{ lat: pointWC.lat, lng: pointWC.lon }}
                        key={counter}
                        onClick={ () => handleToggleOpen(counter) }
                    >
                    { showInfoIndex === counter
                        ?
                        <InfoWindow 
                            position={{ lat: pointWC.lat, lng: pointWC.lon }} 
                            key={counter}
                            onCloseClick={ () => handleToggleClose() }
                        >
                            <Paper>
                                <Typography color="textPrimary" gutterBottom>
                                    {pointWC.name}
                                </Typography>
                                <Typography color="textSecondary">
                                <Badge color="secondary" variant="dot">
                                    {`Latitude: ${pointWC.lat}`}
                                </Badge>
                                </Typography>
                                <Typography color="textSecondary">
                                <Badge color="secondary" variant="dot">
                                    {`Longitude: ${pointWC.lon}`}
                                </Badge>
                                </Typography>
                            </Paper>
                        </InfoWindow>
                        : ''
                    }
                    </Marker>
                ))
            }
        </GoogleMap>
    ));

    return (
        <MapWithMarker
            googleMapURL= {`https://maps.googleapis.com/maps/api/js?key=${GoogleMaps}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div className="border border-dark" style={{ height: `700px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    )
}

export default Map;

