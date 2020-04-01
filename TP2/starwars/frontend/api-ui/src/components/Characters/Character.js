import React, { Fragment } from 'react';

// Bootstrap
import { Card, Button, Alert } from 'react-bootstrap'

function Character({character, removeCharacter, error}) {

    return (
        <Fragment>
            { error ? <Alert variant='danger'> Opps! No ha sido posible eleminar a {`${character}`} </Alert> : ''}
            <Card
                className="mt-2 mb-2 mr-2 ml-2"
                text={'dark'}
            >
                <Card.Header className="text-center">Personaje</Card.Header>
                <Card.Body>
                    <Card.Text className="text-center h2">
                        {character}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button 
                        className="btn btn-primary btn-block"
                        onClick={ () => removeCharacter(character) }
                    >Borrar
                    </Button>
                </Card.Footer>
            </Card>
        </Fragment>
    )
}

export default Character;
