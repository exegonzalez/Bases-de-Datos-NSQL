import React, {Fragment} from 'react';

// Components
import Navbar from './Navbar'

function index(props) {
    return (
        <Fragment>
            <Navbar title={props.title}/>
        </Fragment>
    )
}

export default index;
