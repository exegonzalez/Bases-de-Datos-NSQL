import React from 'react';

//************************************ Components Materia-UI ************************************
import { Grid, Paper, Typography, CircularProgress } from '@material-ui/core';

//************************************ Icons Materia-UI ************************************
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

//************************************* Styles ****************************************
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      marginTop: 5,
      marginRight: 5,
      color: theme.palette.text.secondary,
    },
    grid:{
      marginLeft:1,
      marginRight:1
    }
}));

export default function RestaurantDetail(props) {
    const classes = useStyles()
    
    return (
        <div className={classes.root}>

            {
              props.restaurant
              ?
                <Grid container direction="row" justify="space-around" alignItems="center">

                  <Grid item xs={6}>
                    <img alt="" style={{display:'block', marginTop:15, marginLeft:'auto', marginRight:'auto'}} src="https://image.flaticon.com/icons/png/512/45/45454.png"></img>
                  </Grid>

                  <Grid item xs={4}>
                      <Paper elevation={5}  className={classes.paper}>
                          <h1><RestaurantMenuIcon/> &bull; {props.restaurant.name} &bull; <RestaurantMenuIcon/></h1>

                          <Grid container direction="column" justify="center" alignItems="flex-start" spacing={3} className={classes.grid}>

                            <Typography variant="subtitle2" gutterBottom>
                              id: {props.restaurant.restaurant_id}
                            </Typography>

                            <Typography variant="subtitle2" gutterBottom>
                              Especialidad: {props.restaurant.cuisine}
                            </Typography>
                            <hr/>
                            
                            <Typography variant="h6" gutterBottom>Ubicación:</Typography>
                            
                            <Typography variant="subtitle2" gutterBottom>
                              Ciudad: {props.restaurant.borough}
                            </Typography>

                            <Typography variant="subtitle2" gutterBottom>
                              Calle:{props.restaurant.address.street}
                            </Typography>
                        

                            <Typography variant="subtitle2" gutterBottom>
                              Numero: {props.restaurant.address.building}
                            </Typography>

                            <Typography variant="subtitle2" gutterBottom>
                              CP: {props.restaurant.address.zipcode}
                            </Typography>
                        
                            <Typography variant="subtitle2" gutterBottom>
                              Latitud: {props.restaurant.address.coord[0]}
                            </Typography>

                            <Typography variant="subtitle2" gutterBottom>
                              Latitud: {props.restaurant.address.coord[1]}
                            </Typography>

                          </Grid>
                      </Paper>
                  </Grid>

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