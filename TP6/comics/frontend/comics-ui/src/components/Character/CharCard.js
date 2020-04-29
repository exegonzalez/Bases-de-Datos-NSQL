import React from 'react';
import {Card} from 'primereact/card';

export default function CharCard(props) {

    const header = (
        <img alt="Card" src={`${props.character.images[0]}`}/>
    );
    const footer = (
        <span>
            <a className="detail" href={`/${props.character.house}/characters/${props.character._id}`}>Detalle</a>
        </span>
    );
    return (
        <Card 
            title={props.character.character_name} 
            subTitle={`${props.character.name} (${props.character.year_of_appearance})`} 
            style={{maxWidth: '280px', minWidth: '250px'}} 
            className="ui-card-shadow m5" 
            footer={footer} 
            header={header}
            >
            <div>
                <p
                style={{
                    width: '200px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                >
                    {props.character.biography}
                </p>
            </div>
        </Card>
    )
}