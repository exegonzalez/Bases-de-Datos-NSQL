import React from 'react'

// Bootstrap
import { Form } from 'react-bootstrap'
import capitalize from '../utils/capitalize'

export default function Search(props) {
    return (
        <div>
            <Form.Group controlId="formSearch">
                <Form.Label className="mr-3 ml-3">Cryptocoin:</Form.Label>
                <Form.Control type="text" placeholder="Ej: Bitcoin" onChange={e => props.handleCryptocoinSearched(capitalize(e.target.value))}/>
            </Form.Group>
        </div>
    )
}
