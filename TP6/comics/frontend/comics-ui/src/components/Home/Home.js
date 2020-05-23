import React, {useState} from 'react'

import {SelectButton} from 'primereact/selectbutton'

import Header from '../Header'
import Characters from '../Characters/Characters'
import Movies from '../Movies/Movies'

export default function Home() {

    const options = [
        {brand: 'Personajes', key: 'Characters'},
        {brand: 'Películas', key: 'Movies'},
    ]
    const [listSelected, setListSelected] = useState('')
    const handleListSelected = list => setListSelected(list)

    const listTemplate = option => {
        const logoPath = require(`../../utils/images/Logos/${option.key}.png`)

        return (
            <div style={{textAlign: 'center', padding: '1em', width: '125px'}}>
                <img alt={option.brand} src={logoPath} style={{width: '48px'}} />
                <div style={{marginTop: '1em'}}>{option.brand}</div>
            </div>
        )
    }

    return (
        <div>
            <Header/>

            <div className='p-grid p-dir-col p-justify-center m5'>
                <div className="p-col m10">
                    <div className="p-grid p-justify-center">
                        <SelectButton 
                            value={listSelected}
                            options={options}
                            onChange={e => handleListSelected(e.target.value)} 
                            itemTemplate={listTemplate} 
                            optionLabel="brand" 
                            optionValue="brand" 
                        />
                    </div>
                </div>
                <div className="p-col m10">
                    <div className="p-grid p-justify-center">
                        {
                            listSelected !== ''
                                ? 
                                    listSelected === 'Personajes'
                                    ? <Characters/>
                                    : <Movies/>
                                : null
                        }
                    </div>
                </div>
            </div>
            
        </div>
    )
}