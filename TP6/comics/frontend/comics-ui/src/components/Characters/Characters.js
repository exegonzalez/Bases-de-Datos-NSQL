import React, {useState} from 'react'

import CharsList from './CharsList'
import CharsSearcher from './CharsSearcher'
import CharsSelector from './CharsSelector'

export default function Characters() {
    const [listSelected, setListSelected] = useState('all')
    const handleListSelected = list => setListSelected(list)
    
    const [charSearched, setCharSearched] = useState('')
    const handleCharSearched = character => setCharSearched(character)

    return (
        <div>
            <div className='p-grid p-justify-center m5'>
                <CharsSearcher 
                    handleCharSearched={handleCharSearched}
                />
                <CharsSelector 
                    handleListSelected={handleListSelected}
                />
            </div>
            <CharsList 
                listSelected={listSelected} 
                charSearched={charSearched}
            />
        </div>
    )
}
