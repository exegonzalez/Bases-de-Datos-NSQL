import React, {Fragment , useState, useEffect} from 'react';

// Materia-UI
import { makeStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';


import axios from 'axios'
import { ApiUrlBase } from '../constants'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function PointSelector(props) {
  const classes = useStyles();

    const [interestGroups, setInterestGroups] = useState([])
    const handleInterestGroups = groups => setInterestGroups(groups)

    const [groupSelected, setGroupSelected] = useState('')
    const handleGroupSelected = group => {
      setGroupSelected(group)
      props.optionSelected(group)
    }
    
    useEffect(() => {     
      const fetchInterestGroups = async () => {
          const intGroupsFetched = await axios.get(`${ApiUrlBase}/get-points`)
          if (intGroupsFetched.data)
              return handleInterestGroups(intGroupsFetched.data)
      }
      if(interestGroups.length === 0)
        fetchInterestGroups()
      }, [interestGroups])

  return (
    <Fragment>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Grupos</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={groupSelected}
          onChange={e => handleGroupSelected(e.target.value)}
          label="points"
        >
            {
                interestGroups.length !== 0 
                ? interestGroups.map((group, i) => (
                    <MenuItem key={i} value={`${group}`}>{`${group}`}</MenuItem>
                ))
                : <MenuItem value="None"></MenuItem>
            }
        </Select>
      </FormControl>
    </Fragment>
  );
}