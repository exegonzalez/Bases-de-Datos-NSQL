import React from 'react';

import {InputText} from 'primereact/inputtext';
import capitalize from '../../utils/capitalize'

export default function CharsSearcher(props) {
    return (
        <div className="charsSearcher">
            <InputText 
              placeholder="Search" 
              type="text" 
              onChange={e => props.handleCharSearched(capitalize(e.target.value))}
            />
        </div>
    )
}