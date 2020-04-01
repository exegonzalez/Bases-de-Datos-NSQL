import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios'
import { ApiUrlBase } from '../constants'

// Components
import AddCharacter from './AddCharacter'
import Character from './Character'

// Bootstrap
import { Spinner } from 'react-bootstrap'


function ManageCharacters({episode}) {

    const [characters, setCharacters] = useState([])
    const [charsActualized, setCharsActualized] = useState(false)

    const handleCharsActualized = bool => setCharsActualized(bool)
    
    const removeCharacter = async character => {
        await axios.get(`${ApiUrlBase}/episodes/${episode}/delete/${character}`)
        handleCharsActualized(false)
    }
    
    useEffect(() => {
        const fetchCharacters = async () => {
            const resFetch = await axios.get(`${ApiUrlBase}/episodes/${episode}`)
            return resFetch.data.characters
        }

        if (!charsActualized)
            fetchCharacters(episode)
                .then(res => setCharacters(res))
                .then(() => handleCharsActualized(true))
    }, [episode, charsActualized])


    return (
        <Fragment>
            
            <div className="d-flex justify-content-center mt-3 mb-3">
                <h3>Agregar personajes aqui puedes</h3>
            </div>
            <AddCharacter episode={episode} handleCharsActualized={handleCharsActualized}/>
            <div className="d-flex align-content-between justify-content-around flex-wrap mt-5 mb-5">
            {
                characters.length !== 0
                ?   (characters.map((c, i)=> (
                        <Character 
                            key={i}
                            character={c}
                            removeCharacter={removeCharacter}
                        />
                    )))
                : <Spinner animation="grow" />
            }
            </div>
        </Fragment>
    )
}

export default ManageCharacters;
