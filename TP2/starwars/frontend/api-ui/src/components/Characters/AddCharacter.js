import React, { Fragment, useEffect, useState } from 'react';
import { v1 as uuid } from 'uuid';
import axios from 'axios';
import { ApiUrlBase } from '../constants'

// Bootstrap
import { 
    Button,
    Form,
    Row,
    Col,
    Alert
} from 'react-bootstrap'


function AddCharacter({episode, handleCharsActualized}) {

    const [error, setError] = useState({isError: false, message: ''})
    const [character, setCharacter] = useState({id: uuid(), name: ''})
    const handleName = n => {
        setError({isError: false, message: ''})
        setCharacter({...character, name: n})
    }

    const addCharacter = async char => {
        const resAdd = await axios.get(`${ApiUrlBase}/episodes/${episode}/add/${char}`)
        return resAdd.data
    }

    const handleSubmit = e => {
        try {
            e.preventDefault()
            if (character.name !== '') {
                addCharacter(character.name)
                    .then(() => handleCharsActualized(false))
                    .then(() => setCharacter({id: uuid(), name: ''}))
            } else {
                setError({isError: true, message: 'Por favor complete el campo'})
            }
        } catch (error) {
            setError({isError: true, message: error.message})
        }
    }

    useEffect(() => {
        console.log('rendering');
        
        setCharacter({isError: false, message: ''})
    },[])

    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                    <Form.Label>Nombre del Personaje</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Ejemplo: Darth Vader" 
                        onChange={e => handleName(e.target.value)}
                        value={character.name || ''}
                    />
                    </Col>
                </Row>
                <Button className="mt-3 mb-3" size="sm" variant="primary" type="submit" block>Agregar</Button>
            </Form>
            {
                error.isError 
                ? <Alert variant='danger'> {`${error.message}`} </Alert>
                : ''
            }
    </Fragment>
    )
}

export default AddCharacter;
