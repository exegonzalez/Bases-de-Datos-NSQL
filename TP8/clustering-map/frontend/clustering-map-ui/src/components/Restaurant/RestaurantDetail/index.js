import React from 'react';

//************************************* React Components ****************************************
import RestaurantDetail from './RestaurantDetail'

export default function index(props) {
    return (
        <div>
            <RestaurantDetail {...props}/>
        </div>
    )
}