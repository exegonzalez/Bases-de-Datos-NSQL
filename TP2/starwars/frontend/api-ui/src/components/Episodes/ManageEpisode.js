import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

// Components
import Characters from '../Characters'
import Navbar from '../Navbar'

// Bootstrap
import { 
    Container,
    Badge
} from 'react-bootstrap'


function ManageEpisode() {

    const { episode } = useParams();

    return (
        <Fragment>
            <Navbar/>
            <Container>
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <h3>¡Si administrar el episodio <Badge variant="secondary">{`${episode}`}</Badge> quieres, aqui puedes!</h3>
                </div>
            </Container>
            <Characters episode={episode}/>
        </Fragment>
    )
}

export default ManageEpisode;
