import React, { Fragment } from 'react';

// Components
import Header from '../Header'
import Footer from '../Footer'
import ManageCryptocoins from './ManageCryptocoins'

function index() {
    return (
        <Fragment>
            <Header/>
            <ManageCryptocoins/>
            <Footer/>
        </Fragment>
    )
}

export default index;
