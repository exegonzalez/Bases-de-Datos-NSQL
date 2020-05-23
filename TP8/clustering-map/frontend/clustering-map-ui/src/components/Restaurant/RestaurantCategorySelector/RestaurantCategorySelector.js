import React, {useEffect, useState} from 'react';

//************************************ Components Materia-UI ************************************
import {
    Grid,
    Tooltip,
    TextField,
    Paper,
} from '@material-ui/core'
import { Autocomplete, Alert } from '@material-ui/lab';


//********************************************* API *********************************************
import {ClusteringMapUrlBase} from '../../../utils/constants';
import axios from 'axios';

//********************************************* Styles *********************************************
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

//********************************************* Components *********************************************
export default function RestaurantCategorySelector(props) {
    const classes = useStyles();

    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const fields = ['Borough', 'Cuisine', 'Name']
    
    const [categories, setCategories] = useState([])
    const handleCategories = categories => setCategories(categories)

    useEffect(() => {
        console.log('1° RestaurantCategorySelector...')
        const fetchCategories = async field => {
            const categoriesFetched = await axios.get(`${ClusteringMapUrlBase}/restaurants/${field}`)            
            return categoriesFetched.data 
            ? handleCategories(categoriesFetched.data) 
            : handleStatus(true, 'warning', 'No fue posible cargar las categorias!')
        }
        fetchCategories(props.field ? props.field : 'Cuisine')
        
    }, [props.field]);

    return (
        <div className={classes.root}>
        
        <Paper elevation={5}  className={classes.paper}>
            <Grid container justify="space-around" align="center" spacing={3}>
                <Grid item xs sm={3}>
                    <Tooltip title="Seleccione una campo para filtrar por categoría">
                    <Autocomplete
                        id="combo-box-fields"
                        options={fields}
                        renderInput={(params) => <TextField {...params} required id="standard-basic" label="Campo"/>}
                        onSelect={e => props.handleField(e.target.value)}
                    />
                    </Tooltip>
                </Grid>
                <Grid item xs sm={3}>
                    <Tooltip title="Seleccione una categoria">
                    <Autocomplete
                        id="combo-box-category"
                        options={categories}
                        renderInput={(params) => <TextField {...params} required id="standard-basic" label="Categoria"/>}
                        onSelect={e => props.handleCategory(e.target.value)}
                    />
                    </Tooltip>
                    {
                        status.showMessage 
                        ? <Alert severity={status.type}>Oooops! — {status.message}</Alert>
                        : ''
                    }
                </Grid>
            </Grid>
        </Paper>
        </div>
    )
}
