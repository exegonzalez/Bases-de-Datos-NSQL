import React, {useState, useEffect} from 'react';

import {AutoComplete} from 'primereact/autocomplete';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Message} from 'primereact/message'

import axios from 'axios'
import {ApiUrlBase} from '../../utils/constants'

export default function CharSelector(props) {

    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [characters, setCharacters] = useState([])
    const handleCharacters = list => setCharacters(list)

    const [charSugestions, setCharSuggestions] = useState([])
    const handleCharSugestions = chars => setCharSuggestions(chars)

    useEffect(() => {
        const fetchCharacters = async list => {
            try {
                const charactersFetched = await axios.get(`${ApiUrlBase}/${list}`)
                return charactersFetched.data 
                    ? handleCharacters(charactersFetched.data.map(char => char.character_name))
                    : handleStatus(true, 'error', 'No hay personajes para mostrar')
            } catch (error) {
                handleStatus(true, 'error', 'Ooops! Ha ocurrido un error al cargar la lista de Personajes')
            }
        }
        fetchCharacters(props.house)
    }, [props]);

    const suggestChars = event => {
        if (event.query !== '')
            return handleCharSugestions([...characters].filter(char => char.toLowerCase().includes(event.query.toLowerCase())))
        return handleCharSugestions(characters)
    }
    
    return (
        <div className="charSelector">
            <div className="p-grid p-justify-center m10">       
                {
                    status.showMessage 
                    ? <Message severity={status.type} text={status.message}/>
                    : null
                }
            </div>
            <div className="p-grid p-justify-center m10">
                {
                    characters.lenght !== 0
                    ? 
                        <AutoComplete 
                            value={props.characterSearched} 
                            suggestions={charSugestions}
                            size={30} 
                            minLength={1}
                            placeholder="Buscar..." 
                            dropdown={true} 
                            onChange={e => props.handleCharacterSearched(e.target.value)}
                            completeMethod={e => suggestChars(e)}
                        />
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