import React from 'react';

//************************************ Components React ************************************
import MyGalacticCoins from './MyGalacticCoins';
import MyWeapons from './MyWeapons';

//************************************ Components MAteria-UI ************************************
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 45,
    },
    paper: {
      padding: theme.spacing(0),
      textAlign: 'center',
      marginTop: 5,
      marginRight: 15,
      marginLeft: 15,
      paddingBottom: 5,
      color: theme.palette.text.secondary,
    },
    grid:{
      marginLeft:1,
      marginRight:1
    }
  }));

export default function MyAssets() {
    const classes = useStyles()

    return (
        <div className={classes.root}>

          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={4}>
              <Paper elevation={2}  className={classes.paper}>
                <Typography color="textPrimary" align="center" variant="h5"> Mis Activos </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Grid container direction="row" justify="space-around" alignItems="center" spacing={1}>
              <Grid item xs={6}>
                <Paper elevation={5}  className={classes.paper}>
                    <MyGalacticCoins/>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                  <Paper elevation={5}  className={classes.paper}>
                    <MyWeapons/>
                  </Paper>
              </Grid>
          </Grid>

      </div>
    )
}