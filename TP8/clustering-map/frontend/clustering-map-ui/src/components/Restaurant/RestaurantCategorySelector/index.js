import React from 'react';

//************************************* React Components ****************************************
import RestaurantCategorySelector from './RestaurantCategorySelector'

export default function index(props) {
    return (
        <div>
            <RestaurantCategorySelector {...props}/>
        </div>
    )
}