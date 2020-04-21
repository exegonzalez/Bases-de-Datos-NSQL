import React from 'react';

// Bootstrap
import {
    Form,
} from 'react-bootstrap'

export default function Selector(props) {
    return (
        <Form>
        <Form.Group controlId="formSelector">
            <Form.Label className="mr-3 ml-3">Seleccione:</Form.Label>
            <Form.Control as="select" onChange={e => props.handleListSelected(e.target.value)}>
                <option key="1" value="cryptocoins">Criptomonedas</option>
                <option key="2" value="top20">Top 20</option>
                <option key="3" value="top5">Top 5</option>
            </Form.Control>
        </Form.Group>
        </Form>
    )
}