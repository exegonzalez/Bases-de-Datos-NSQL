import React, {useState, useEffect} from 'react';
import MovieSearcher from '../../Movie/MovieSearcher'

import {Panel} from 'primereact/panel';
import {Message} from 'primereact/message';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel'

import axios from 'axios'
import {ApiUrlBase} from '../../../utils/constants'
import {TheMovieDBUrlBase} from '../../../utils/constants'
import {TheMovieDBImagesUrlBase} from '../../../utils/constants'
import {TheMovieDB} from '../../../utils/credentials'

export default function NewMovie() {
  
    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [movieToSave, setMovieToSave] = useState(null)
    const handleMovieToSave = movie => setMovieToSave(movie)
    
    const [characters, setCharacters] = useState(null)
    const handleCharacters = characters => setCharacters(characters)

    const [credits, setCredits] = useState(null)
    const handleCredits = credits => setCredits(credits)

    const [charactersKnownFromThisMovie, setCharactersKnownFromThisMovie] = useState(null)
    const handleCharactersKnownFromThisMovie = characters => setCharactersKnownFromThisMovie(characters)
    
    const saveMovie = async () => {
        try {
            if (!movieToSave)
                return handleStatus(true, 'warn', 'Debe seleccionar una pelicula! :)') 
                    & setInterval(() => handleStatus(false), 5000)
            
            if (charactersKnownFromThisMovie.lenght !== 0)
                    charactersKnownFromThisMovie.map(character => 
                        axios.put(`${ApiUrlBase}/characters`, {...character, movies: [...character.movies, movieToSave.title]}))

            return await axios.post(`${ApiUrlBase}/movies`, movieToSave)
                .then(handleStatus(true, 'success', 'Pelicula guardada exitosamente! :)'))
                .then(setInterval(() => handleStatus(false), 5000))
                
        } catch (error) {
            handleStatus(true, 'error', '¡Ooops, ha ocurrido un error!')
        }
    }

    useEffect(() => {        
        const fetchCredits = async movieId => {
            try {
                const creditsFetched = await axios.get(`${TheMovieDBUrlBase}/movie/${movieId}/credits?api_key=${TheMovieDB}`)
                return creditsFetched.data
                    ? handleCredits(creditsFetched.data)
                    : handleStatus(true, 'error', 'No hay creditos para mostrar :(')
            } catch (error) {
                handleStatus(true, 'error' ,'Ooops! Ha ocurrido un error :(')
            }
        }
        if (movieToSave)
            fetchCredits(movieToSave.id)
    }, [movieToSave]);

    useEffect(() => {        
        const fetchCharacters = async () => {
            try {
                const charactersFetched = await axios.get(`${ApiUrlBase}/characters`)
                return charactersFetched.data
                    ? handleCharacters(charactersFetched.data)
                    : handleStatus(true, 'error', 'No hay personajes para mostrar :(')
            } catch (error) {
                handleStatus(true, 'error' ,'Ooops! Ha ocurrido un error :(')
            }
        }
        fetchCharacters()
    }, []);

    useEffect(() => {        
        const filterCharactersOfThisMovie = (characters, casting) => {
            const charactersNames = [...characters.map(character => character.character_name)]
            const castingCharactersNames = [...casting.map(character => character.character.split(" / ").length > 1 
                ? character.character.split(" / ")[1] : character.character)]
            const charactersNamesOfThisMovie = [...charactersNames.filter(character => castingCharactersNames.includes(character))]
            
            return (
                handleCharactersKnownFromThisMovie([...characters.filter(character => 
                    charactersNamesOfThisMovie.includes(character.character_name))])
            )
        }
        if(characters && credits) 
            filterCharactersOfThisMovie(characters, credits.cast)
        
    }, [characters, credits]);

    return (
        <div className="newMovie">

            <div className="p-grid p-justify-center m10">
                {
                    status.showMessage
                    ? <Message severity={status.type} text={status.message}/>
                    : null
                }
            </div>
            {
                <div className="p-grid p-align-stretch vertical-container m10">

                    <div className="p-col">
                        <div className="box box-stretched">
                            {/* Carousel of images */}
                            <Carousel 
                                showArrows={true}
                                showThumbs={false}
                                showIndicators={false}
                                showStatus={false}
                            >
                            
                            {
                                movieToSave
                                ?
                                    <img 
                                        src={`${TheMovieDBImagesUrlBase}${movieToSave.poster_path}`}
                                        key="1"
                                        alt="img-1"
                                        style={{ background: 'white' }}
                                    />
                                :
                                    <img 
                                        src={require(`../../../utils/images/Logos/Cinema.png`)} 
                                        key="1"
                                        alt="img-1"
                                        style={{ background: 'white' }}
                                    />
                            }
                            </Carousel>
                        </div>
                    </div>
                
                    <div className="p-col">
                        <Panel header={'Buscador de peliculas'} style={{textAlign: 'center'}}>
                            <MovieSearcher 
                                saveMovie={saveMovie}
                                handleMovieToSave={handleMovieToSave}

                            />
                        </Panel>
                    </div>
                </div>
            }
        </div>
    )
}