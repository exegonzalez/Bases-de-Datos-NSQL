import React,{useState, useEffect, useCallback} from 'react';

//************************************ Components Materia-UI ************************************
import { Grid, Paper, makeStyles, TextField, Typography, Button } from '@material-ui/core';
import { Autocomplete, Alert } from '@material-ui/lab';

//************************************** Icons MAteria-UI ***************************************
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import AddLocationIcon from '@material-ui/icons/AddLocation';

//******************************************** API *********************************************
import {ClusteringMapUrlBase} from '../../../utils/constants'
import capitalize from '../../../utils/capitalize'
import image from '../../../utils/images/newRestaurant.png'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      marginTop: 15,
      marginRight: 15,
      color: theme.palette.text.secondary,
    },
    grid:{
      marginLeft:1,
      marginRight:1
    }
  }));

export default function NewRestaurant() {
    const classes = useStyles()
    
    let restaurantDefault = {
      address: {
        building: '',
        coord: [],
        street: '',
        zipcode: ''
      },
      borough:'',
      cuisine:'',
      grades:[],
      name:'',
      restaurant_id:''
    }

    const [restaurant, setRestaurant] = useState(restaurantDefault)

    const handleBorough = borough => setRestaurant({...restaurant, borough:borough})
    const handleCuisine = cuisine => setRestaurant({...restaurant, cuisine: cuisine})
    const handleName = name => setRestaurant({...restaurant, name: name})
    const handleRestaurant_id = useCallback(restaurant_id => setRestaurant({...restaurant, restaurant_id:restaurant_id}), [restaurant])
    const handleBuilding = building => setRestaurant({...restaurant, address: {...restaurant.address, building}})
    const handleStreet = street => setRestaurant({...restaurant, address: {...restaurant.address, street}})
    const handleZipcode = zipcode => setRestaurant({...restaurant, address: {...restaurant.address, zipcode}})
   
    const [latitude, setLatitude] = useState('')
    const handleLatitude = lat => setLatitude(lat)
    const [longitude, setLongitude] = useState('')
    const handleLongitude = long => setLongitude(long)

    const handleRestDefault = rest => setRestaurant(rest)

    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [specialties, setSpecialties] = useState('')
    const handleSpecialties = specialty => setSpecialties(specialty)

    useEffect(() => {     
      const fetchLastId = async () => {
        try{
            let lastIdFetched = await axios.get(`${ClusteringMapUrlBase}/restaurants?lastElement=restaurant_id`)
            return String(parseInt(lastIdFetched.data[0].restaurant_id)+1)
        } catch (error) {
            handleStatus(true, 'error' ,'Ooops! Ha ocurrido un error :(')
        }
    }
    if (restaurant.restaurant_id === '')
      fetchLastId().then(id => handleRestaurant_id(id))

  }, [restaurant.restaurant_id, handleRestaurant_id]);

    useEffect(() => {
      const fetchSpecialties = async () => {
          try{
              const specialtiesFetched = await axios.get(`${ClusteringMapUrlBase}/restaurants/cuisine`)
              return specialtiesFetched.data
                  ? handleSpecialties(specialtiesFetched.data) 
                  : handleStatus(true, 'error', 'No hay especialidades para mostrar')
          } catch (error) {
              handleStatus(true, 'error' ,'Ooops! Ha ocurrido un error :(')
          }
      }
      fetchSpecialties()
  }, []);


  const handleSubmit = async e => {
    try {
        e.preventDefault()       
        if (
            restaurant.borough === '' ||
            restaurant.cuisine === '' ||
            restaurant.name === '' ||
            restaurant.restaurant_id === '' ||
            latitude === '' ||
            longitude === '' ||
            restaurant.address.building === '' ||
            restaurant.address.street === '' ||
            restaurant.address.zipcode === '' 
        ) 
            return handleStatus(true, 'info', 'Debe tener en cuenta que no se permiten campos vacios.')
        
        restaurant.address.coord[0] = latitude
        restaurant.address.coord[1] = longitude    
        
        return await axios.post(`${ClusteringMapUrlBase}/restaurants`, restaurant)
            .then(handleStatus(true, 'success', '¡Restaurant guardado exitosamente! :)'))
            .then(setInterval(() => handleStatus(false), 5000))
            .then(handleRestDefault(restaurantDefault))    
            .then(handleLatitude(''))
            .then(handleLongitude(''))    

    } catch (error) {
        handleStatus(true, 'error', '¡Ooops, ha ocurrido un error!')
    }
}


    return (
        <div className={classes.root}>
          <div className="p-grid p-justify-center m10">
                {
                    status.showMessage
                    ? <Alert severity={status.type}>{status.message}</Alert>
                    : null
                }
            </div>

        <Grid container spacing={3}>
            <Grid item xs={6}>
              <img alt="" style={{display:'block', marginTop:15, marginLeft:'auto', marginRight:'auto'}}src={image}></img>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={5}  className={classes.paper}>
                  <h1><RestaurantMenuIcon/> &bull; AÑADIR RESTAURANT &bull; <RestaurantMenuIcon/></h1>
                      
                  {
                    specialties && restaurant.restaurant_id
                    ?

                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={3} className={classes.grid}>
                        <Grid item xs={8}>
                          <TextField
                            required
                            type="text"
                            id="nombre"
                            name="nombre"
                            label="Nombre restaurant"
                            fullWidth
                            onChange={e => handleName(capitalize(e.target.value))}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TextField
                            type="number"
                            required
                            disabled
                            value={restaurant.restaurant_id}
                            id="id"
                            name="id"
                            label="id"
                            fullWidth
                            onChange={e => handleRestaurant_id(capitalize(e.target.value))}
                          />
                        </Grid>
                        <Grid item xs={11}>
                          <Typography align="left" variant="h6" gutterBottom>Especialidad:</Typography>
                          <Autocomplete
                            id="combo-box-demo"
                            options={specialties}
                            style={{ width: 300 }}
                            onChange={(e,v) => handleCuisine(v!==null ? capitalize(v) : null)}
                            renderInput={(params) => <TextField {...params} type="text" onChange={e => handleCuisine(capitalize(e.target.value))} required id="standard-basic" label="Especialidad"/>}
                          />
                        </Grid>
                        <Grid item xs={11}>
                        <Typography align="left" variant="h6" gutterBottom>Ubicación:</Typography>
                          <TextField
                            required
                            type="text"
                            id="ciudad"
                            name="ciudad"
                            label="Ciudad"
                            fullWidth
                            onChange={e => handleBorough(capitalize(e.target.value))}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <TextField
                            required
                            type="text"
                            id="calle"
                            name="calle"
                            label="Calle"
                            fullWidth
                            onChange={e => handleStreet(capitalize(e.target.value))}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            required
                            type="number"
                            id="numero"
                            name="numero"
                            label="Num"
                            fullWidth
                            onChange={e => handleBuilding(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            required
                            type="number"
                            id="codigo"
                            name="codigo"
                            label="CP"
                            fullWidth
                            onChange={e => handleZipcode(e.target.value)}
                          />
                        </Grid> 
                        <Grid item xs={6}>
                          <TextField
                            type="number"
                            required
                            id="latitud"
                            name="latitud"
                            label="Latitud"
                            fullWidth
                            onChange={e => handleLatitude(e.target.value)}
                          /> 
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            required
                            type="number"
                            id="longitud"
                            name="longiut"
                            label="Longitud"
                            fullWidth
                            onChange={e => handleLongitude(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={11}>
                          <Button type="submit" size="medium" variant="contained" color="primary" startIcon={<AddLocationIcon />}>
                            Añadir 
                          </Button>
                        </Grid>

                      </Grid>
                    </form>

                  : null
                  }   

                </Paper>
            </Grid>
        </Grid>
      </div>
    )
}