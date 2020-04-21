import React, { useState } from 'react';

// Components
import Selector from './Selector'
import Search from './Search'
import ListCryptocoin from './ListCryptocoin'

// Bootstrap
import {
    Form
} from 'react-bootstrap'

function ManageCryptocoins() {

    const [listSelected, setListSelected] = useState('')
    const handleListSelected = listSelected => setListSelected(listSelected)

    const [cryptocoinSearched, setCryptocoinSearched] = useState('')
    const handleCryptocoinSearched = cryptocoin => setCryptocoinSearched(cryptocoin)

    return (
        <div>
            <div className="d-flex justify-content-center mt-3 mb-3">
                <Form.Group className="form-inline">
                    <Search handleCryptocoinSearched={handleCryptocoinSearched}/>
                    <Selector handleListSelected={handleListSelected}/>
                </Form.Group>
            </div>
            <div className="d-flex justify-content-center mt-3 mb-3">
                <ListCryptocoin 
                    listSelected={listSelected}
                    cryptocoinSearched={cryptocoinSearched}
                />
            </div>
        </div>
    )
}

export default ManageCryptocoins;
