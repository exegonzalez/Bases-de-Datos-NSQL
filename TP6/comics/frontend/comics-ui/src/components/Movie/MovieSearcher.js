import React, {useState} from 'react';

import {Button} from 'primereact/button';
import {AutoComplete} from 'primereact/autocomplete';
import {Message} from 'primereact/message';

import axios from 'axios'
import {TheMovieDBUrlBase} from '../../utils/constants'
import {TheMovieDB} from '../../utils/credentials'

export default function MovieSearcher(props) {
    
    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [movies, setMovies] = useState([])
    const handleMovies = list => setMovies(list)

    const [movieSearched, setMovieSearched] = useState('')
    const handleMovieSearched = movie => setMovieSearched(movie)

    const [moviesSugestions, setMoviesSuggestions] = useState([])
    const handleMoviesSugestions = movies => setMoviesSuggestions(movies)

    const [moviesSugestionsFilter, setMoviesSuggestionsFilter] = useState([])
    const handleMoviesSugestionsFilter = movies => setMoviesSuggestionsFilter(movies)

    const searchMovies = async () => {
        try {
            const moviesFetched = await axios.get(`${TheMovieDBUrlBase}/search/movie?api_key=${TheMovieDB}&query=${movieSearched}`)
            const moviesList = moviesFetched.data.results
            handleMovies(moviesList)
            handleMoviesSugestions(moviesList.map(movie => movie.title))
            handleMovieSearched('')
        } catch (error) {
            handleStatus(true, 'error', '¡Ooops, ha ocurrido un error!')
        }
    }

    const suggestMovies = event => {
        if (event.query !== '')
            return handleMoviesSugestionsFilter([...moviesSugestions].filter(movie => movie.toLowerCase().includes(event.query.toLowerCase())))
        return handleMoviesSugestionsFilter(moviesSugestions)
    }

    return (
        <div className="movieSearcher">
            <div className="p-grid p-justify-center m10">
                {
                    status.showMessage
                    ? <Message severity={status.type} text={status.message}/>
                    : null
                }
            </div>
            <div>
                <h3>Ingrese una pelicula</h3>
                    <div>
                        <Button icon="pi pi-search" className="p-button-secondary" onClick={searchMovies}/>
                        <AutoComplete 
                            value={movieSearched}
                            suggestions={moviesSugestionsFilter}
                            size={30} 
                            minLength={1}
                            placeholder="Buscar..." 
                            dropdown={true} 
                            onChange={e => handleMovieSearched(e.target.value)}
                            completeMethod={e => suggestMovies(e)}
                            onSelect={e => props.handleMovieToSave(...movies.filter(movie => movie.title===e.value))}
                        />
                    </div>  
                    <div style={{marginTop: '15px'}}>
                        <Button icon="pi pi-save" label="Añadir" className="p-button-secondary" onClick={() => props.saveMovie()}/>
                    </div>
            </div>
        </div>
    )
}
// 