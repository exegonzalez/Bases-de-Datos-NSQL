import React, {useState} from 'react'

import Header from '../Header'
import CharsList from '../Characters/CharsList'
import CharsSearcher from '../Characters/CharsSearcher'
import CharsSelector from '../Characters/CharsSelector'

export default function Home() {

    const [listSelected, setListSelected] = useState('all')
    const handleListSelected = list => setListSelected(list)
    
    const [charSearched, setCharSearched] = useState('')
    const handleCharSearched = list => setCharSearched(list)

    return (
        <div>
            <Header/>
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