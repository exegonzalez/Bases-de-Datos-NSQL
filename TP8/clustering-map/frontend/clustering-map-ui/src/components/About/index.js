import React from 'react';

//************************************* React Components ****************************************
import Header from '../Header';
import LeafDemo from './maps/LeafDemo'

export default function index() {
    return (
        <div>
            <Header/>
            <p align="center">Here's an interactive map indicating where airports and train stations are located around the world.  The data comes from <a href="http://openflights.org/data.html" rel="_blank">OpenFlights.org</a></p>
            <LeafDemo/>
        </div>
    )
}