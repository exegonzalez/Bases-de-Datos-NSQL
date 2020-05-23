import React, {useState, useEffect} from 'react';

import {Message} from 'primereact/message';
import CharCard from '../Character/CharCard'
import {ProgressSpinner} from 'primereact/progressspinner';

import axios from 'axios'
import {ApiUrlBase} from '../../utils/constants'

export default function CharsList(props) {
    
    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [characters, setCharacters] = useState([])
    const handleCharacters = list => setCharacters(list)

    useEffect(() => {        
        const fetchCharacters = async listSelected => {
            try {
                var charsList = null
                if (listSelected === 'all'){
                    const charactersFetched = await axios.get(`${ApiUrlBase}/characters`)
                    charsList = charactersFetched.data
                } else {
                    const charactersFetched = await axios.get(`${ApiUrlBase}/characters?house=${listSelected}`)
                    charsList = charactersFetched.data
                }
                return charsList 
                    ? handleCharacters(charsList) 
                    : handleStatus(true, 'error', 'No hay personajes para mostrar')
            } catch (error) {
                handleStatus(true, 'error', 'Ooops! Ha ocurrido un error al cargar la lista de Personajes')
            }
        }
        fetchCharacters(props.listSelected)
    }, [props.listSelected]);

    useEffect(() => {
        if (status.showMessage && characters.length !== 0)
            handleStatus(false)
    }, [status, characters]);

    const listCharacters = characterSearched => {
        if (characterSearched !== '')
            return [...characters].filter(char => char.character_name.toLowerCase().includes(characterSearched.toLowerCase()))
        return characters
    }

    return (
        <div className="charsList">
            <div className="p-grid p-justify-center m5">
                {
                    status.showMessage 
                    ? <Message severity={status.type} text={status.message}/>
                    : null
                }
            </div>
            <div className="p-grid p-justify-center">
                {
                    characters.length !== 0
                    ? listCharacters(props.charSearched).map((char, i) => (
                        <div className="box" key={i}>
                            <CharCard character={char}/>
                        </div>
                    ))
                    : <ProgressSpinner 
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                }
            </div>
        </div>
    )
}

