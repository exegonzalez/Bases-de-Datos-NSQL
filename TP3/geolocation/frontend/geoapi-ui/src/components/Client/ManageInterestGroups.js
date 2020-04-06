import React, {useState} from 'react';

// Components
import PointSelector from '../InterestGroups/PointSelector'
import Points from '../InterestGroups/Points'
import AddPoint from '../InterestGroups/AddPoint'

// MAteria-UI
import {
    Box,
    Container,
} from '@material-ui/core';

export default function ManageInterestGroups() {

    const [groupSelected, setGroupSelected] = useState('')
    const handleGroupSelected = group => setGroupSelected(group)

    const [updateInterestGroups, setUpdateInterestGroups] = useState(false)
    const handleUpdateIntGroups = bool => setUpdateInterestGroups(bool)


    return (
        <Container fixed>
            <Box textAlign="center" my={2}>
                <AddPoint handleUpdateIntGroups={handleUpdateIntGroups}/>
            </Box>
            <hr/>
            <Box textAlign="center" my={2}>
                <p>¡Aqui podras ver una lista de los puntos pertenecientes a los grupos de interes!</p>
                <PointSelector optionSelected={handleGroupSelected}/>
                {
                    groupSelected !== ''
                    ? <Points interestGroup={groupSelected} updateInterestGroups={updateInterestGroups} handleUpdateIntGroups={handleUpdateIntGroups}/>
                    : <p>¡Selecciona el grupo de interes para poder verlos!</p>
                }
            </Box>
        </Container>
    )
}