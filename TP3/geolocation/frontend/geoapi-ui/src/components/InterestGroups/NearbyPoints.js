import React, { useState, useEffect } from 'react';

// Components
import NearbyPoint from './NearbyPoint'
import SimpleAlert from '../Alert/SimpleAlert'

// MAterial-UI
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    CircularProgress,
} from '@material-ui/core'

import axios from 'axios'
import { ApiUrlBase } from '../constants'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function NearbyPoints(props) {
    const classes = useStyles();

    const [error, setError] = useState({isError: false, message: ''})
    const handleError = (isError=true, message='') => setError({isError: isError, message: message})

    const [currentCoords, setCurrentCoords] = useState({lat: '', lon: ''})
    const handleCurrentCoords = (lat, lon) => setCurrentCoords({lat: lat, lon: lon})

    const [points, setPoints ] = useState([])
    const handlePoints = points => setPoints(points)
    
    useEffect(() => {

        const getCurrentGeopos = async () => {
            return await navigator.geolocation.getCurrentPosition(pos => 
                handleCurrentCoords(pos.coords.latitude, pos.coords.longitude), 
                err => err ? handleError(true, 'No fue posible obtener las coordenadas') : handleError(false));
        }

        const fetchPoints = async () => {
            const pointsFetched = await axios.get(`${ApiUrlBase}/user-radio/${props.interestGroup}/${currentCoords.lon}/${currentCoords.lat}`)
            if (pointsFetched.data)
                return handlePoints(pointsFetched.data)
        }

        getCurrentGeopos().then(() => fetchPoints())
            
    }, [currentCoords.lat, currentCoords.lon, props])

    return (
        <div className={classes.root}>
        {error.isError ? <SimpleAlert message={error.message}/> : '' }
        {
            points.length !== 0
            ?
            (
                <Grid
                container
                spacing={3}
                direction="row"
                justify="space-around"
                alignItems="center"
                >
                {points.map((point, c) => (
                    <Grid key={c} item>
                        <NearbyPoint pointGroup={props.interestGroup} pointData={point}/>
                    </Grid>
                    )
                )}
                </Grid>
            )    
            : (
                <Grid 
                    container spacing={3} 
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                    <CircularProgress color="inherit" />
                    </Grid>
                </Grid>
            )
        }
        </div>
    )
}
