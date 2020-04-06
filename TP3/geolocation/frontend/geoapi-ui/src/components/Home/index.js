import React, { Fragment } from 'react';

// Components
import Header from '../Header'
import PointsNearMe from './PointsNearMe'

function index() {
    return (
        <Fragment>
            <Header title="Home"/>
            <PointsNearMe/>
        </Fragment>
    )
}

export default index;
