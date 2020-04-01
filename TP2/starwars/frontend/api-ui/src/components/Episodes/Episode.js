import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'

// Bootstrap
import { Card } from 'react-bootstrap'

function Episode({episode}) {

    return (
        <Fragment>
            <Card
                className="mt-2 mb-2 mr-2 ml-2"
                text={'dark'}
            >
                <Card.Header className="text-center">Episodio</Card.Header>
                <Card.Body>
                    <Card.Text className="text-center h1">
                        {episode}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Link 
                        className="btn btn-primary btn-block"
                        to={`episodes/${episode}/manage`}
                    >Administrar
                    </Link>
                </Card.Footer>
            </Card>
        </Fragment>
    )
}

export default Episode;
