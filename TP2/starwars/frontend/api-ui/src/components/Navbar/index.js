import React, { Fragment } from 'react';

import Logo from './logo.svg'

// Bootstrap
import { Navbar } from 'react-bootstrap'

function index() {
    return (
        <Fragment>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">
                <img
                    alt=""
                    src={Logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                
                </Navbar.Brand>
            </Navbar>
        </Fragment>
    )
}

export default index;
