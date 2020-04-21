import React, { useState, useEffect } from 'react';

// Components
import Cryptocoin from './Cryptocoin'

// Bootstrap
import {
    Spinner
} from 'react-bootstrap'

import axios from 'axios'
import {cryptocoinsURLBase} from '../utils/constants'

export default function ListCryptocoin(props) {

    const [cryptocoins, setCryptocoins] = useState([])
    const handleCryptocoins = coins => setCryptocoins(coins)

    const [updateCryptocoins, setUpdateCryptocoins] = useState(false)
    const handleUpdateCryptocoins = bool => setUpdateCryptocoins(bool)
    
    
    useEffect(() => {
        const fetchCryptocoins = async (listSelected=null) => { 
            var cryptocoinsFetched
            if (listSelected && listSelected !== 'cryptocoins')
                cryptocoinsFetched = await axios.get(`${cryptocoinsURLBase}/cryptocoins/${listSelected}`)
            else
            cryptocoinsFetched = await axios.get(`${cryptocoinsURLBase}/cryptocoins`)
            if (cryptocoinsFetched.data)
                return handleCryptocoins(cryptocoinsFetched.data.cryptocoins)
        }
        
        if (updateCryptocoins)
            fetchCryptocoins(props.listSelected)
            .then(() => handleUpdateCryptocoins(false))

        fetchCryptocoins(props.listSelected)
    }, [updateCryptocoins, props.listSelected, props.updateCryptocoins]);


    const listCryptocoins = cryptocoinSearched => {
        if (cryptocoinSearched !== '')
            return [...cryptocoins].filter(c => c.data.name.toLowerCase().includes(cryptocoinSearched.toLowerCase()))
        return cryptocoins
    }

    return (
        <div>
            {
                cryptocoins.length !== 0
                ?  
                    <div className="d-flex align-content-between justify-content-around flex-wrap mt-3 mb-3">
                        {listCryptocoins(props.cryptocoinSearched).map((c, i)=> 
                            <Cryptocoin  
                                key={i}
                                handleUpdateCryptocoins={handleUpdateCryptocoins}
                                cryptocoin={c}
                            />)
                        }
                    </div>
                : 
                    <div className="d-flex flex-column align-items-center mt-3 mb-3">
                        <div className="mt-2 mb-2">
                            <Spinner animation="border" role="status"/>
                        </div>
                    </div>
            }
        </div>
    )
}