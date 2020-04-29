import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router'

import CharSelector from '../../Character/CharSelector'
import CharDetail from '../../Character/CharDetail'

import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button'
import {Message} from 'primereact/message';
import {Panel} from 'primereact/panel';
import {OverlayPanel} from 'primereact/overlaypanel';

import axios from 'axios'
import {ApiUrlBase} from '../../../utils/constants'

export default function DeleteChar(props) {
    let {house} = useParams()

    var op = {toggle: e => e}

    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [characterToDelete, setCharacterToDelete] = useState('')
    const handleCharToDelete = char => setCharacterToDelete(char)

    const [character, setCharacter] = useState(null)
    const handleCharacter = char => setCharacter(char)

    const [characterSearched, setCharacterSearched] = useState('')
    const handleCharacterSearched = char => setCharacterSearched(char)

    const handleDeleteChar = async _id => {
        try{

            const characterDeleted = await axios.delete(`${ApiUrlBase}/characters?_id=${_id}`)            
            return characterDeleted.status === 200
                ? handleStatus(true, 'success', '¡Personaje borrado exitosamente! :)')
                : handleStatus(true, 'error', 'Ooops! No fue posible borrar el ersonaje :(')
        } catch (error) {
            handleStatus(true, 'error' ,'Ooops! Ha ocurrido un error :(')
        }
    }

    useEffect(() => {
        const fetchCharacter = async characterName => {
            try{
                const characterFetched = await axios.get(`${ApiUrlBase}/characters?character_name=${characterName}`)
                return characterFetched.data 
                    ? handleCharacter(characterFetched.data[0]) 
                    : handleStatus(true, 'error', 'No hay personaje para mostrar')
            } catch (error) {
                handleStatus(true, 'error' ,'Ooops! Ha ocurrido un error :(')
            }
        }
        fetchCharacter(characterSearched)
    }, [characterSearched]);
    
    const refreshPage = () => window.location.reload(true)
    
    return (
        <div className="deleteChar">

            <div className="p-grid p-justify-center m10">
                {
                    status.showMessage
                    ? <Message severity={status.type} text={status.message}/>
                    : null
                }
            </div>
            <div className="p-col fixed m10">
                <div className="p-grid p-justify-center">
                    <CharSelector 
                        house={house}
                        handleCharacterSearched={handleCharacterSearched} 
                        characterSearched={characterSearched}
                    />
                </div>
            </div>

            <div className="p-col fixed m10">
                <div className="p-grid p-justify-center">
                    <Button 
                        className="p-button-warning"
                        label="Borrar" 
                        icon="pi pi-trash" 
                        disabled={characterSearched === '' ? 'disabled' : ''}
                        onClick={e => op.toggle(e)}
                        aria-controls="overlay_panel" 
                        aria-haspopup={true}
                    />
                    {
                        character 
                        ?
                        <div className="p-grid p-justify-center">
                        
                            <OverlayPanel className="p-col-6" ref={el => op = el} id="overlay_panel" showCloseIcon={true} >
                                <Message/>
                                <Panel 
                                    header="¿Estás absolutamente seguro?" 
                                    style={{textAlign: 'center'}}
                                >   
                                    <div className="p-grid p-justify-center">
                                        <div className="p-col fixed">
                                            <h4 
                                                style={{
                                                    color: '#735c0f', 
                                                    backgroundColor: '#fffbdd', 
                                                    textAlign: 'center'
                                                }}
                                            >
                                                ¡Cosas inesperadas sucederan si no lees esto!
                                            </h4>
                                            <hr/>
                                            <p 
                                                align="justify" 
                                                style={{textAlign: 'center'}}
                                            >
                                            Esta acción no se puede deshacer. Esto eliminará permanentemente el personaje <b>{character.character_name}</b>.
                                            Por favor, escriba <b>{character.character_name}</b> para confirmar.
                                            </p>
                                            <hr/>
                                        </div>
                                    </div>
                                    <div className="p-grid p-dir-col p-justify-center">
                                        <div className="p-col fixed">
                                        <InputText
                                            onChange={e => handleCharToDelete(e.target.value)}
                                        />
                                        </div>
                                        <div className="p-col fixed">
                                        <Button 
                                            className="p-button-danger"
                                            label="Entiendo las consecuencias, quiero borrar el personaje." 
                                            icon="pi pi-trash" 
                                            disabled={characterToDelete !== character.character_name ? 'disabled' : ''}
                                            onClick={
                                                () => handleDeleteChar(character._id)
                                                .then(handleStatus(true, 'success', '¡Personaje Eliminado exitosamente! :)'))
                                                .then(setInterval(() => handleStatus(false), 5000))
                                                .then(setInterval(() => refreshPage(), 5000))
                                            }
                                        />
                                        </div>
                                    </div>
                                </Panel>
                            </OverlayPanel>

                        </div>
                        : null
                    }
                    
                </div>
            </div>

            <div className="p-col fixed m10">
                <div className="p-grid p-justify-center">
                { 
                    character
                    ? <CharDetail _id={character._id}/>
                    : null
                }
                </div>
            </div>

        </div>
    )
}