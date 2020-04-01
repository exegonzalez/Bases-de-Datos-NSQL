import React, { Fragment } from 'react';

// Components
import Episode from './Episode'
import Navbar from '../Navbar'

// Bootstrap
import { Container } from 'react-bootstrap'

function index() {
    const episodes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']    

    return (
        <Fragment>
            <Navbar/>
            <Container>
            <div className="d-flex justify-content-center mt-5 mb-5">
                <h3>Episodios de Star Wars</h3>
            </div>

            <div className="d-flex align-content-between justify-content-around flex-wrap mt-5 mb-5">
                {episodes.map((e, i)=> (
                    <Episode 
                        key={i}
                        episode={e}
                    />
                ))}
            </div>
        </Container>
    </Fragment>
            
    )
}

export default index;
