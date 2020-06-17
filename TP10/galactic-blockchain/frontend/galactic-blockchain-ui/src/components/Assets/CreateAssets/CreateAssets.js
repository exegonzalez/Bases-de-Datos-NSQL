import React from 'react';
import image from '../../styles/img/logo512.png'

//************************************** Components React ***************************************
import CreateCredit from './CreateCredit'
import CreateWeapon from './CreateWeapon'

//************************************ Components MAteria-UI ************************************
import { Grid, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 45,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      marginTop: 15,
      marginRight: 15,
      paddingBottom: 25,
      color: theme.palette.text.secondary,
    },
    grid:{
      marginLeft:1,
      marginRight:1
    }
  }));

export default function CreateAssets() {
    const classes = useStyles()

    return (
        <div className={classes.root}>

        <Grid container spacing={2}>
            <Grid item xs={6}>
              <img alt="" style={{display:'block', marginTop:15, marginLeft:'auto', marginRight:'auto'}}src={image}></img>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={5}  className={classes.paper}>
                  <CreateCredit/>
                </Paper>
                <Paper elevation={5}  className={classes.paper}>
                  <CreateWeapon/>
                </Paper>
            </Grid>
        </Grid>
      </div>
    )
}