import React, { useState, useEffect } from 'react';

// Components
import Point from './Point'

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

export default function Points(props) {
    const classes = useStyles();
    const [points, setPoints ] = useState([])
    const handlePoints = points => setPoints(points)

    useEffect(() => {
        const fetchPoints = async () => {
            const pointsFetched = await axios.get(`${ApiUrlBase}/${props.interestGroup}/local-list`)
            if (pointsFetched.data)
                return handlePoints(pointsFetched.data)
        }
        if (props.updateInterestGroups)
            fetchPoints()
            .then(() => props.handleUpdateIntGroups(false))
        fetchPoints()
    }, [props])

    return (
        <div className={classes.root}>
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
                {points.map((pointName, c) => (
                    <Grid key={c} item>
                        <Point pointGroup={props.interestGroup} pointName={pointName}/>
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
