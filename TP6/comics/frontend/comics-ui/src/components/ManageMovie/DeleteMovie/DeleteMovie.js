import React, {useState, useEffect} from 'react';

import MovieSelector from '../../Movie/MovieSelector'
import MovieDetail from '../../Movie/MovieDetail'

import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button'
import {Message} from 'primereact/message';
import {Panel} from 'primereact/panel';
import {OverlayPanel} from 'primereact/overlaypanel';

import axios from 'axios'
import {ApiUrlBase} from '../../../utils/constants'

export default function DeleteMovie(props) {
    
    var op = {toggle: e => e}

    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [movieToDelete, setMovieToDelete] = useState('')
    const handleMovieToDelete = movie => setMovieToDelete(movie)

    const [movie, setMovie] = useState(null)
    const handleMovie = movie => setMovie(movie)

    const [movieSearched, setMovieSearched] = useState('')
    const handleMovieSearched = movie => setMovieSearched(movie)
    
    const handleDeleteMovie = async _id => {
        try{
            const movieDeleted = await axios.delete(`${ApiUrlBase}/movies?_id=${_id}`)            
            return movieDeleted.status === 200
                ? handleStatus(true, 'success', '¡Pelicula borrada exitosamente! :)')
                : handleStatus(true, 'error', 'Ooops! No fue posible borrar la pelicula :(')
        } catch (error) {
            handleStatus(true, 'error' ,'Ooops! Ha ocurrido un error :(')
        }
    }

    useEffect(() => {
        const fetchMovie = async movieTitle => {
            try{
                const movieFetched = await axios.get(`${ApiUrlBase}/movies?title=${movieTitle}`)
                return movieFetched.data 
                    ? handleMovie(movieFetched.data[0]) 
                    : handleStatus(true, 'error', 'No hay pelicula para mostrar')
            } catch (error) {
                handleStatus(true, 'error' ,'Ooops! Ha ocurrido un error :(')
            }
        }
        fetchMovie(movieSearched)
    }, [movieSearched]);
    
    const refreshPage = () => window.location.reload(true)

    return (
        <div className="deleteMovie">

            <div className="p-grid p-justify-center m10">
                {
                    status.showMessage
                    ? <Message severity={status.type} text={status.message}/>
                    : null
                }
            </div>
            <div className="p-col fixed m10">
                <div className="p-grid p-justify-center">
                    <MovieSelector 
                        handleMovieSearched={handleMovieSearched} 
                        movieSearched={movieSearched}
                    />
                </div>
            </div>

            <div className="p-col fixed m10">
                <div className="p-grid p-justify-center">
                    <Button 
                        className="p-button-warning"
                        label="Borrar" 
                        icon="pi pi-trash" 
                        disabled={movieSearched === '' ? 'disabled' : ''}
                        onClick={e => op.toggle(e)}
                        aria-controls="overlay_panel" 
                        aria-haspopup={true}
                    />
                    {
                        movie 
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
                                            Esta acción no se puede deshacer. Esto eliminará permanentemente la pelicula <b>{movie.title}</b>.
                                            Por favor, escriba <b>{movie.title}</b> para confirmar.
                                            </p>
                                            <hr/>
                                        </div>
                                    </div>
                                    <div className="p-grid p-dir-col p-justify-center">
                                        <div className="p-col fixed">
                                        <InputText
                                            onChange={e => handleMovieToDelete(e.target.value)}
                                        />
                                        </div>
                                        <div className="p-col fixed">
                                        <Button 
                                            className="p-button-danger"
                                            label="Entiendo las consecuencias, quiero borrar la pelicula." 
                                            icon="pi pi-trash" 
                                            disabled={movieToDelete !== movie.title ? 'disabled' : ''}
                                            onClick={
                                                () => handleDeleteMovie(movie._id)
                                                .then(handleStatus(true, 'success', '¡Pelicula eliminada exitosamente! :)'))
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
                    movie
                    ? <MovieDetail _id={movie._id}/>
                    : null
                }
                </div>
            </div>

        </div>
    )
}