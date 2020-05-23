import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router';

//************************************** Material-UI Components ******************************************
import {
    Button,
    Grid,
    Paper,
} from '@material-ui/core'

//************************************** Material-UI Icons ******************************************
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

//************************************** React Leaflet ******************************************
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';

//********************************************* API *********************************************
import {ClusteringMapUrlBase} from '../../../utils/constants';
import axios from 'axios';

//************************************* Styles ****************************************
import { makeStyles } from '@material-ui/core/styles';
const leafletContainer = { width: '100%', height: '100vh'}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        marginTop: 15,
        marginRight: 15,
        color: theme.palette.text.secondary,
    },
  }));

const myIcon = color => {
    const markerHtmlStyles = `
        background-color: ${color};
        width: 1.5rem;
        height: 1.5rem;
        display: block;
        left: -1.5rem;
        top: -1.5rem;
        position: relative;
        border-radius: 3rem 3rem 0;
        transform: rotate(45deg);
        border: 1px solid #FFFFFF`

    return L.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span style="${markerHtmlStyles}" />`
    })
}

//********************************************* Components *********************************************
export default function RestaurantsMap(props) {
    const classes = useStyles()
    const history = useHistory()

    const [restaurants, setRestaurants] = useState([])
    const handleRestaurants = restaurants => setRestaurants(restaurants)

    const [colorMarker, setColorMarker] = useState(null)
    const handleColorMarker = colorMarker => setColorMarker(colorMarker)

    useEffect(() => {
        console.log('1° RestaurantsMap...')
        const fetchRestaurants = async (field, category) => {
            const restaurantsFetched = await axios.get(`${ClusteringMapUrlBase}/restaurants?${field}=${category}`)            
            return handleRestaurants(restaurantsFetched.data)
        }
        if (props.field && props.category)
            fetchRestaurants(props.field, props.category)
        
    }, [props.field, props.category]);

    useEffect(() => {
        console.log('2° RestaurantsMap...')
        handleColorMarker('#'+ Math.floor(Math.random()*16777215).toString(16))
        
    }, [restaurants]);

    return (
        <div className={classes.root}>

        <Grid container justify="center" spacing={3}>
            <Grid item xs={11}>
                <Paper elevation={5}  className={classes.paper}>
                <Map className="markercluster-map" center={[40.6976701, -74.2598751]} zoom={12} style={leafletContainer}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    <MarkerClusterGroup>
                    {
                        restaurants.lenght !== 0 && colorMarker
                        ? restaurants.map(r => (
                                <Marker
                                    key={r.restaurant_id}
                                    position={[r.address.coord[1], r.address.coord[0]]}
                                    icon={myIcon(colorMarker)}
                                >
                                    <Popup
                                        position={[r.address.coord[1], r.address.coord[0]]}
                                        closeButton={false}
                                    >
                                        <h3>Nombre: {r.name}</h3>
                                        <p>Ciudad: {r.borough}</p>
                                        <p>Direccion: {r.address.street}</p>
                                        <p>Tipo de Comida: {r.cuisine}</p>
                                        <Grid container direction="row" justify="space-around" alignItems="center">
                                            <Button 
                                                variant="contained" 
                                                size="small" 
                                                color="primary" 
                                                startIcon={<EditIcon/>} 
                                                className={classes.margin}
                                                onClick={() => history.push(`/restaurant/${r._id}/edit`)}
                                            >Editar</Button>

                                            <Button 
                                                variant="contained" 
                                                size="small"
                                                color="secondary" 
                                                startIcon={<DeleteIcon/>} 
                                                className={classes.margin}
                                                onClick={() => history.push(`/restaurant/${r._id}/delete`)}
                                            >Borrar</Button>
                                        </Grid>
                                    </Popup>

                                </Marker>
                        ))
                        : ''
                    }
                    </MarkerClusterGroup>
                </Map>
                </Paper>
            </Grid>
        </Grid>

        </div>
    )
}