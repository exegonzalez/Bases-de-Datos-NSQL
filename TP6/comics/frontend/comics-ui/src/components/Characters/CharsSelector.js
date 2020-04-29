import React from 'react';

import {SplitButton} from 'primereact/splitbutton';

export default function CharsSelector(props) {
    const buttonItems = [
        {
            label: 'DC',
            icon: 'pi pi-list',
            command: (e) => props.handleListSelected('dc')
        },
        {
            label: 'Marvel',
            icon: 'pi pi-list',
            command: (e) => props.handleListSelected('marvel')
        }
    ]

    return (
        <div className="charsSelector">
            <SplitButton 
              label="Marvel & DC" 
              icon="pi pi-list" 
              onClick={() => props.handleListSelected('all')} 
              model={buttonItems}
              style={{marginLeft: 5}}
            />
        </div>
    )
}