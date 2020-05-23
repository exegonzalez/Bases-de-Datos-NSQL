import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router';

//************************************** React Components ******************************************
import RestaurantDetail from '../RestaurantDetail'

//************************************** Material-UI Components ******************************************
import {
    TextField,
    Button,
    Grid,
    Backdrop,
    Paper,
    CircularProgress,
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';

//************************************** Material-UI Icons ******************************************
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';

//********************************************* API *********************************************
import {ClusteringMapUrlBase} from '../../../utils/constants';
import axios from 'axios';

//************************************* Styles ****************************************
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
  }));

//********************************************* Components *********************************************
export default function DeleteRestaurant(props) {
    const classes = useStyles()
    const history = useHistory()
    const {_id} = useParams()

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false)
    const handleToggle = () => setOpen(!open)

    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [restaurant, setRestaurant] = useState(null)
    const handleRestaurant = restaurant => setRestaurant(restaurant)
    
    const [restaurantToDelete, setRestaurantToDelete] = useState('')
    const handleRestaurantToDelete = restaurantToDelete => setRestaurantToDelete(restaurantToDelete)
    
    const handleDelete = async _id => {
        try {
            const responseDeleted = await axios.delete(`${ClusteringMapUrlBase}/restaurants?_id=${_id}`)
            return responseDeleted.status === 200
                ? handleStatus(true, 'success', '¡El restaurante ha sido eliminado! :)')
                : handleStatus(true, 'warning', '¡Ooops! Ha ocurrido un error al intentar eliminar :(')
        } catch (error) {
            return handleStatus(true, 'error', '¡Ooops! Ha ocurrido un inesperado :/')
        }
    }

    useEffect(() => {
        console.log('1° RestaurantDelete...')
        const fetchRestaurant = async _id => {
            const restaurantFetched = await axios.get(`${ClusteringMapUrlBase}/restaurants?_id=${_id}`)            
            return restaurantFetched.data 
            ? handleRestaurant(restaurantFetched.data[0]) 
            : handleStatus(true, 'warning', 'No fue posible cargar el Restaurant!')
        }
        fetchRestaurant(_id)
        
    }, [_id]);

    return (
        <div>
            {
                restaurant
                ? <RestaurantDetail restaurant={restaurant}/>
                : ''
            }

            {
            restaurant 
            ?
                <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                    
                    <Button 
                        variant="contained" 
                        size="small" 
                        color="secondary" 
                        startIcon={<DeleteIcon 
                        fontSize="small"/>} 
                        className={classes.margin}
                        onClick={() => handleToggle()}
                    >Borrar</Button>
                            
                    <Backdrop className={classes.backdrop} open={open}>
                        <Grid container direction="column" justify="space-around" alignItems="center" spacing={3}>
                        <Paper elevation={5}>
                            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs={10}>
                                    <h4 style={{color: '#735c0f', backgroundColor: '#fffbdd', textAlign: 'center'}}>
                                        ¡Cosas inesperadas sucederan si no lees esto!
                                    </h4>
                                    <hr/>
                                    <p align="justify" style={{textAlign: 'center'}}>
                                        Esta acción no se puede deshacer. Esto eliminará permanentemente el restaurante <b>{restaurant.name}</b>.
                                        Por favor, escriba <b>{restaurant.name}</b> para confirmar.
                                    </p>
                                    <hr/>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField required id="standard-basic" label="Restaurante" onChange={e => handleRestaurantToDelete(e.target.value)}/>
                                </Grid>
                                <Grid item xs={10}>
                                    <Button 
                                        variant="contained" 
                                        size="small" 
                                        color="secondary" 
                                        startIcon={<DeleteIcon fontSize="small"/>} 
                                        className={classes.margin}
                                        disabled={restaurantToDelete !== restaurant.name || status.showMessage ? true : false}
                                        onClick={() => handleDelete(restaurant._id)}
                                    >Borrar</Button>

                                    <Button 
                                        variant="contained" 
                                        size="small" 
                                        color="primary" 
                                        startIcon={<CancelIcon fontSize="small"/>} 
                                        className={classes.margin}
                                        disabled={status.showMessage ? true : false}
                                        onClick={() => handleClose()}
                                    >Cancelar</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                        {
                            status.showMessage 
                            ? <Alert severity={status.type} onClick={() => history.push('/home')} style={{marginTop: '5px'}}><AlertTitle>{status.type}</AlertTitle> - {status.message}</Alert>
                            : ''
                        }
                        </Grid>
                    </Backdrop>

                </Grid>
            :
                <Grid 
                  container 
                  justify="center" 
                  alignItems="center"
                  style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginRight: '-50%',
                      transform: 'translate(-50%, -50%)',
                  }}
                >
                    <CircularProgress color="inherit"/>
                </Grid>
            }
        </div>
    )
}