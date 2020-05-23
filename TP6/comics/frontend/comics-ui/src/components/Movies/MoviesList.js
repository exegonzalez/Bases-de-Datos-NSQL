import React, {useState, useEffect} from 'react';

import {Message} from 'primereact/message';
import MovieCard from '../Movie/MovieCard'
import {ProgressSpinner} from 'primereact/progressspinner';

import axios from 'axios'
import {ApiUrlBase} from '../../utils/constants'

export default function MoviesList(props) {
    
    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [movies, setMovies] = useState([])
    const handleMovies = list => setMovies(list)

    useEffect(() => {        
        const fetchMovies = async () => {
            try {

                const moviesFetched = await axios.get(`${ApiUrlBase}/movies`)
                return moviesFetched.data 
                    ? handleMovies(moviesFetched.data) 
                    : handleStatus(true, 'error', 'No hay peliculas para mostrar')
            } catch (error) {
                handleStatus(true, 'error', 'Ooops! Ha ocurrido un error al cargar la lista de Peliculas')
            }
        }
        fetchMovies()
    }, []);

    useEffect(() => {
        if (status.showMessage && movies.length !== 0)
            handleStatus(false)
    }, [status, movies]);

    const listMovies = movieSearched => {
        if (movieSearched !== '')
            return [...movies].filter(movie => movie.title.toLowerCase().includes(movieSearched.toLowerCase()))
        return movies
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
                    movies.length !== 0
                    ? listMovies(props.movieSearched).map((movie, i) => (
                        <div className="box" key={i}>
                            <MovieCard movie={movie}/>
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