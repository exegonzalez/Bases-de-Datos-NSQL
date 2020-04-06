import React, { useState } from 'react';

// Components
import PointSelector from '../InterestGroups/PointSelector'
import SimpleAlert from '../Alert/SimpleAlert'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    FormGroup,
    InputLabel,
    FormControl,
    InputBase,
    Button,
    Icon,
    Grid,
} from '@material-ui/core'

import axios from 'axios'
import { ApiUrlBase } from '../constants'

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
}));

export default function AddPoint(props) {
  const classes = useStyles();

  const [success, setSuccess] = useState({isSuccess: false, message: ''})
  const handleSuccess = (isSuccess, message) => setSuccess({isSuccess: isSuccess, message: message})

  const [error, setError] = useState({isError: false, message: ''})
  const handleError = (isError=false, message='') => setError({isError: isError, message: message})
  
  const [point, setPoint] = useState({ group: '' ,name: '', lat: '', lon: ''})
  const handleGroup = group => {
    handleError(false, '')
    setPoint({...point, group: group})
  }

  const handleName = name => {
    handleError(false, '')
    setPoint({...point, name: name})
  }

  const handleLat = lat => {
    var val = parseFloat(lat);
    if (!isNaN(val) && val <= 90 && val >= -90){
      handleError(false, '')
      setPoint({...point, lat: lat})
    } else      
      handleError(true, 'Revise la entrada por favor')
  }

  const handleLon = lon => {
    var val = parseFloat(lon);
    if (!isNaN(val) && val <= 90 && val >= -90){
      handleError(false, '')
      setPoint({...point, lon: lon})
    } else      
      handleError(true, 'Revise la entrada por favor')
  }
      
  const savePoint = async () => await axios.get(`${ApiUrlBase}/points/add/${point.group}/${point.lon}/${point.lat}/${point.name}`)
      
  const handleSubmit = async e => {
    try {
      e.preventDefault()
      if (point.group === '' || point.name === '' || point.lat === ''|| point.lon === '')
        handleError(true, 'Todos los campos deben estar completos')
      else
      savePoint()
      .then(() => handleSuccess(true, 'Sitio agregado con Exito!'))
      .then(setPoint({ group: '' ,name: '', lat: '', lon: ''}))
      .then(() => props.handleUpdateIntGroups(true))
      .then(() => setInterval(() => handleSuccess(false, ''), 5000))

    } catch (error) {
        handleError(true, error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>¡Añade sitios al grupo de interes que prefieras!</p>
        <FormControl className={classes.margin}>
            <InputLabel htmlFor="demo-customized-textbox">Nombre</InputLabel>
            <BootstrapInput id="demo-customized-textbox" type="text" value={point.name} onChange={event => handleName(event.target.value)}/>
        </FormControl>
        <FormControl className={classes.margin}>
            <InputLabel error={error.isError} htmlFor="demo-customized-textbox">Latitud</InputLabel>
            <BootstrapInput id="demo-customized-textbox" type="text" value={point.lat} onChange={event => handleLat(event.target.value)}/>
        </FormControl>
        <FormControl className={classes.margin}>
            <InputLabel error={error.isError} htmlFor="demo-customized-textbox">Longitud</InputLabel>
            <BootstrapInput id="demo-customized-textbox" type="text" value={point.lon} onChange={event => handleLon(event.target.value)}/>
        </FormControl>
        <FormControl className={classes.margin}>
            <PointSelector optionSelected={handleGroup}/>
        </FormControl>
        <FormGroup className={classes.margin}>
          <Grid>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
            >
                Send
            </Button>
          </Grid>
        </FormGroup>
        {
            error.isError 
            ? <SimpleAlert message={error.message} color="error"/>
            : ''
        }
        {
            success.isSuccess 
            ? <SimpleAlert message={success.message} color="success"/>
            : ''
        }
      </form>
    </div>
  );
}