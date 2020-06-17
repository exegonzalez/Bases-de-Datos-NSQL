import React, { useState } from 'react';
import capitalize from '../../../../utils/capitalize'

//************************************** Icons MAteria-UI ***************************************
import MyLocationIcon from '@material-ui/icons/MyLocation';

//************************************ Components MAteria-UI ************************************
import { Grid, TextField, Button, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

//************************************ BigchainDb ************************************
import {createAsset} from '../../../../utils/BigchainDB'

const useStyles = makeStyles((theme) => ({
    grid:{
      marginLeft:1,
      marginRight:1
    },
    button:{
      background: '#242424',
      color:'#ffffff'
    }
  }));

export default function CreateWeapon() {
    const classes = useStyles()
    const DarthVader = JSON.parse(localStorage.getItem('users')).find(user => user.name === 'Darth Vader')

    let weaponDefault = {
        name:'',
        price:'',
        type:'weapon'
    }

    const [weapon, setWeapon] = useState(weaponDefault)
    const [amount, setAmount] = useState(1)

    const handlePrice = price => setWeapon({...weapon, price: price})
    const handleAmount = amount => setAmount(amount)
    const handleName = name => setWeapon({...weapon, name: name})
  
    const handleWeaponDefault = weapon => setWeapon(weapon)

    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})  

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            if (weapon.name === '' || weapon.price === '' || weapon.name === '' || !DarthVader)
                return handleStatus(true, 'info', 'Debe tener en cuenta que no se permiten campos vacios.')
            
            return await createAsset(DarthVader.keys, weapon, amount)
                .then(responseCreate => responseCreate 
                    ? handleStatus(true, 'success', 'Activo creado exitosamente! :D')
                    : handleStatus(true, 'error', 'Ooops! Ha ocurrido un error :(')
                )
                .then(() => setInterval(() => handleStatus(false), 5000))
                .then(() => handleWeaponDefault(weaponDefault))
                 
        } catch (error) {
            handleStatus(true, 'error', '¡Ooops, ha ocurrido un error!')
        }
    }

    return (
        <div>
            <div className="p-grid p-justify-center m10">
                {
                    status.showMessage
                    ? <Alert severity={status.type}>{status.message}</Alert>
                    : null
                }
            </div>

            <form onSubmit={handleSubmit}>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                    <h1 style={{marginLeft:20}}><MyLocationIcon fontSize="small"/> Crear Armas </h1>
                </Grid>
                <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={8}>
                    <TextField
                    required
                    type="text"
                    id="nombre"
                    name="nombre"
                    label="nombre"
                    fullWidth
                    onChange={e => handleName(capitalize(e.target.value))}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                    type="number"
                    required
                    id="precio"
                    name="precio"
                    label="precio"
                    fullWidth
                    onChange={e => handlePrice(`${e.target.value}`)}
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                    required
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    label="cantidad"
                    fullWidth
                    inputProps={{min: '1'}}
                    onChange={e => handleAmount(e.target.value)}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Button className={classes.button} type="submit" size="medium" variant="contained">
                    Añadir 
                    </Button>
                </Grid>

                </Grid>
            </form>
        </div>
    )
}