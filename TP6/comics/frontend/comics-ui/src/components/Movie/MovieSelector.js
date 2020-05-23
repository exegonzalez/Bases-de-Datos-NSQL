import React, {useState, useEffect} from 'react';

import {AutoComplete} from 'primereact/autocomplete';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Message} from 'primereact/message'

import axios from 'axios'
import {ApiUrlBase} from '../../utils/constants'

export default function MovieSelector(props) {

    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [movies, setMovies] = useState([])
    const handleMovies = list => setMovies(list)

    const [moviesSugestions, setMoviesSuggestions] = useState([])
    const handleMoviesSugestions = movies => setMoviesSuggestions(movies)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesFetched = await axios.get(`${ApiUrlBase}/movies`)
                return moviesFetched.data
                    ? handleMovies(moviesFetched.data.map(movie => movie.title))
                    : handleStatus(true, 'error', 'No hay personajes para mostrar')
            } catch (error) {
                handleStatus(true, 'error', 'Ooops! Ha ocurrido un error al cargar la lista de Personajes')
            }
        }
        fetchMovies()
    }, []);

    const suggestMovies = event => {
        if (event.query !== '')
            return handleMoviesSugestions([...movies].filter(movie => movie.toLowerCase().includes(event.query.toLowerCase())))
        return handleMoviesSugestions(movies)
    }
    
    return (
        <div className="movieSelector">
            <div className="p-grid p-justify-center m10">       
                {
                    status.showMessage 
                    ? <Message severity={status.type} text={status.message}/>
                    : null
                }
            </div>
            <div className="p-grid p-justify-center m10">
                {
                    movies.lenght !== 0
                    ? 
                        <AutoComplete 
                            value={props.movieSearched} 
                            suggestions={moviesSugestions}
                            size={30} 
                            minLength={1}
                            placeholder="Buscar..." 
                            dropdown={true} 
                            onChange={e => props.handleMovieSearched(e.target.value)}
                            completeMethod={e => suggestMovies(e)}
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