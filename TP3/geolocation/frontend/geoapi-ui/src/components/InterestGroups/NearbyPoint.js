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
  const [point, setPoint] = useState({name: '', dist: '', lat: '', lon: ''})
  const handlePoint = (name, dist, lat, lon) => setPoint({name: name, dist: dist, lat: lat, lon: lon})
  
  useEffect(() => {
  
    const fetchDataPoint = async () => {
      const pointDataFetched = await axios.get(`${ApiUrlBase}/position/${props.pointGroup}/${props.pointData[0]}`)
      if (pointDataFetched.data)
        handlePoint(props.pointData[0], props.pointData[1],pointDataFetched.data[1], pointDataFetched.data[0])
    }
    fetchDataPoint()
  }, [props.pointGroup, props.pointData]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
            {point.name}
        </Typography>
        <Typography color="textSecondary">
          <Badge color="secondary" variant="dot">
              {`Distance: ${point.dist}`}
          </Badge>
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