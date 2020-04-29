import React, {useState, useEffect} from 'react';

import {Message} from 'primereact/message';
import CharCard from '../Character/CharCard'
import {ProgressSpinner} from 'primereact/progressspinner';

import axios from 'axios'
import {ApiUrlBase} from '../../utils/constants'

export default function List(props) {
    
    const [error, setError] = useState({isError: false, message: ''})
    const handleIsError = bool => setError({message: '', isError: bool})
    const handleErrorMessage = message => setError({message: message, isError: true})

    const [characters, setCharacters] = useState([])
    const handleCharacters = list => setCharacters(list)


    useEffect(() => {
        const fetchCharacters = async listSelected => {
            try {
                var charsList = null
                if (listSelected === 'all'){
                    const charactersDCFetched = await axios.get(`${ApiUrlBase}/dc`)
                    const charactersMarvelFetched = await axios.get(`${ApiUrlBase}/marvel`)
                    if (charactersDCFetched.data && charactersMarvelFetched.data)
                        charsList = [...charactersDCFetched.data, ...charactersMarvelFetched.data]
                } else {
                    const charactersFetched = await axios.get(`${ApiUrlBase}/${listSelected}`)
                    charsList = charactersFetched.data
                }
                return charsList 
                    ? handleCharacters(charsList) 
                    : handleErrorMessage('No hay personajes para mostrar')
            } catch (error) {
                handleErrorMessage('Ooops! Ha ocurrido un error al cargar la lista de Personajes')
            }
        }
        fetchCharacters(props.listSelected)
    }, [props]);

    useEffect(() => {
        if (error.isError && characters.length !== 0)
            handleIsError(false)
    }, [error, characters]);

    const listCharacters = characterSearched => {
        if (characterSearched !== '')
            return [...characters].filter(char => char.character_name.toLowerCase().includes(characterSearched.toLowerCase()))
        return characters
    }

    return (
        <div className="charsList">
            <div className="p-grid p-justify-center m5">
                {
                    error.isError 
                    ? <Message severity='info' text={error.message}/>
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

