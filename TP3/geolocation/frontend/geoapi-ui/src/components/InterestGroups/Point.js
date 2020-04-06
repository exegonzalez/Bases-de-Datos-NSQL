import React, { useState ,useEffect } from 'react';

// MAterian-UI
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography,
    Badge
} from '@material-ui/core'

import axios from 'axios'
import { ApiUrlBase } from '../constants'

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
});

export default function Point(props) {
  
  const classes = useStyles();
  const [point, setPoint] = useState({name: '',lat: '', lon: ''})
  const handlePoint = (name, lat, lon) => setPoint({name: name, lat: lat, lon: lon})
  
  useEffect(() => {
  
    const fetchDataPoint = async () => {
      const pointDataFetched = await axios.get(`${ApiUrlBase}/position/${props.pointGroup}/${props.pointName}`)
      if (pointDataFetched.data)
        handlePoint(props.pointName, pointDataFetched.data[1], pointDataFetched.data[0])
    }
    fetchDataPoint()
  }, [props.pointGroup, props.pointName]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
            {point.name}
        </Typography>
        <Typography color="textSecondary">
          <Badge color="secondary" variant="dot">
              {`Latitude: ${point.lat}`}
          </Badge>
        </Typography>
        <Typography color="textSecondary">
          <Badge color="secondary" variant="dot">
            {`Longitude: ${point.lon}`}
          </Badge>
        </Typography>
      </CardContent>
    </Card>
  );
}