import React from 'react';

import {Card} from 'primereact/card';

import {TheMovieDBImagesUrlBase} from '../../utils/constants'

export default function CharMovieCard(props) {

    const header = (
        props.character.profile_path
        ? <img alt={props.character.name} src={`${TheMovieDBImagesUrlBase}${props.character.profile_path}`}/>
        : <img alt={props.character.name} src={require('../../utils/images/Logos/Profile.png')}/>
    );

    return (
        <Card 
            title={props.character.name}
            subTitle={`${props.character.character}`}
            className="ui-card-shadow m5" 
            header={header}
        />
    )
}