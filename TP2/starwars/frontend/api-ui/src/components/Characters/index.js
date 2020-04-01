import React, { Fragment } from 'react';

// Components
import ManageCharacters from './ManageCharacters'

// Bootstrap
import { Container } from 'react-bootstrap'

function index({episode}) {    

    return (
        <Fragment>
            <Container>
                <ManageCharacters episode={episode}/>
            </Container>
        </Fragment>
    )
}

export default index;
