import React from 'react';

//************************************* React Components ****************************************
import Header from '../../Header';
import DeleteRestaurant from './DeleteRestaurant'

export default function index(props) {
    return (
        <div>
            <Header/>
            <DeleteRestaurant props={props}/>
        </div>
    )
}