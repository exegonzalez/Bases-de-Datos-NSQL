import React, {useState} from 'react';

// Components
import PointSelector from '../InterestGroups/PointSelector'
import NearbyPoints from '../InterestGroups/NearbyPoints'
import Map from '../Map/Map'

// MAteria-UI
import {
    Box,
    Container,
} from '@material-ui/core';

export default function PointsNearMe() {
   
    const [groupSelected, setGroupSelected] = useState('')
    const handleGroupSelected = group => setGroupSelected(group)

    return (
        <Container fixed>
            <Box textAlign="center" my={2}>
                <p>¡Aqui podras ver una lista de los puntos mas cercanos a ti!</p>
                <PointSelector optionSelected={handleGroupSelected}/>
            { 
                groupSelected !== ''
                ? <NearbyPoints interestGroup={groupSelected}/>
                : <p>¡Selecciona el grupo de interes para poder verlos!</p>
            }
            
            </Box>
            <Box>
                {   
                    groupSelected !== ''
                    ? <Map interestGroup={groupSelected}/>
                    : ''
                }
            </Box>
        </Container>
    )
}
