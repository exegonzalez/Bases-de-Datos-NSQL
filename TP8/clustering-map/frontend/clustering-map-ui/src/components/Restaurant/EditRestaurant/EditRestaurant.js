import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router'

//************************************ Components Materia-UI ************************************
import { Grid, Paper, makeStyles, TextField, Typography, Button } from '@material-ui/core';
import { Autocomplete, Alert } from '@material-ui/lab';

//************************************** Icons MAteria-UI ***************************************
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import EditLocationIcon from '@material-ui/icons/EditLocation';

//******************************************** API *********************************************
import {ClusteringMapUrlBase} from '../../../utils/constants'
import capitalize from '../../../utils/capitalize'
import image from '../../../utils/images/editRestaurant.png'
import axios from 'axios'

//********************************************* Components *********************************************

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

export default function EditRestaurant(props) {
    const classes = useStyles()

    let {_id} = useParams()

    const [restaurant, setRestaurant] = useState(null)

    const [latitude, setLatitude] = useState('')
    const handleLatitude = lat => setLatitude(lat)
    const [longitude, setLongitude] = useState('')
    const handleLongitude = long => setLongitude(long)

    const handleBorough = borough => setRestaurant({...restaurant, borough:borough})
    const handleCuisine = cuisine => setRestaurant({...restaurant, cuisine: cuisine})
    const handleName = name => setRestaurant({...restaurant, name: name})
    const handleRestaurant_id = restaurant_id => setRestaurant({...restaurant, restaurant_id:restaurant_id})
    const handleBuilding = building => setRestaurant({...restaurant, address: {...restaurant.address, building}})
    const handleStreet = street => setRestaurant({...restaurant, address: {...restaurant.address, street}})
    const handleZipcode = zipcode => setRestaurant({...restaurant, address: {...restaurant.address, zipcode}})

    const handleRestaurant = rest => setRestaurant(rest)

    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [specialties, setSpecialties] = useState('')
    const handleSpecialties = specialty => setSpecialties(specialty)

    const refreshPage = () => window.location.reload(true)

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

    useEffect(() => {
        const fetchRestaurant = async _id => {
            try{
                const restaurantFetched = await axios.get(`${ClusteringMapUrlBase}/restaurants?_id=${_id}`)
                return restaurantFetched.data 
                ? (handleRestaurant(restaurantFetched.data[0]),
                   handleLatitude(restaurantFetched.data[0].address.coord[0]),
                   handleLongitude(restaurantFetched.data[0].address.coord[1])) 
                : handleStatus(true, 'error', 'No hay personaje para mostrar')
            } catch (error) {
                handleStatus(true, 'error' ,'Ooops! Ha ocurrido un error :(')
            }
        }
        fetchRestaurant(_id)
    }, [_id]);

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

            return await axios.put(`${ClusteringMapUrlBase}/restaurants`, restaurant)
                    .then(handleStatus(true, 'success', '¡Restaurant editado exitosamente! :)'))
                    .then(setInterval(() => handleStatus(false), 3000))
                    .then(setInterval(() => refreshPage(), 3000))
            
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
                  <h1><RestaurantMenuIcon/> &bull; EDITAR RESTAURANT &bull; <RestaurantMenuIcon/></h1>
                      
                  {
                    restaurant
                    ?

                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={3} className={classes.grid}>
                        <Grid item xs={8}>
                          <TextField
                            value={restaurant.name}
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
                            value={restaurant.restaurant_id}
                            type="number"
                            disabled
                            required
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
                            value={restaurant.cuisine}
                            options={specialties}
                            style={{ width: 300 }}
                            onChange={(e,v) => handleCuisine(v!==null ? capitalize(v) : null)}
                            renderInput={(params) => <TextField {...params} type="text" required id="standard-basic" label="Especialidad" onChange={e => handleCuisine(capitalize(e.target.value))}/>} 
                          />
                        </Grid>
                        <Grid item xs={11}>
                        <Typography align="left" variant="h6" gutterBottom>Ubicación:</Typography>
                          <TextField
                            required
                            value={restaurant.borough}
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
                            value={restaurant.address.street}
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
                            value={restaurant.address.building}
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
                            value={restaurant.address.zipcode}
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
                            value={latitude}
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
                            value={longitude}
                            type="number"
                            id="longitud"
                            name="longiut"
                            label="Longitud"
                            fullWidth
                            onChange={e => handleLongitude(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={11}>
                          <Button type="submit" size="medium" variant="contained" color="primary" startIcon={<EditLocationIcon/>}>
                            Editar 
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