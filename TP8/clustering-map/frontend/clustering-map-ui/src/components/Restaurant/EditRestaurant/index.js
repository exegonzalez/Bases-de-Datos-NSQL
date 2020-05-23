import React from 'react';

//************************************* React Components ****************************************
import Header from '../../Header';
import EditRestaurant from './EditRestaurant'

export default function index(props) {
    return (
        <div>
            <Header/>
            <EditRestaurant props={props}/>
        </div>
    )
}