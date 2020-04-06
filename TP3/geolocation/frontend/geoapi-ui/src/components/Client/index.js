import React, { Fragment } from 'react';

// Components
import Header from '../Header'
import ManageInterestGroups from './ManageInterestGroups';

function index() {

    return (
        <Fragment>
            <Header title="Client"/>
            <ManageInterestGroups/>
        </Fragment>
    )
}

export default index;
