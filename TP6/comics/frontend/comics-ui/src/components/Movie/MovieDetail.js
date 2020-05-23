import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router'

import CharMovieCard from '../Movie/CharMovieCard'
import CharCard from '../Character/CharCard'

import {ProgressSpinner} from 'primereact/progressspinner'
import {Panel} from 'primereact/panel';
import {Message} from 'primereact/message';
import {ScrollPanel} from 'primereact/scrollpanel';
import {Card} from 'primereact/card';

import axios from 'axios'
import {ApiUrlBase} from '../../utils/constants'
import {TheMovieDBImagesUrlBase} from '../../utils/constants'
import {TheMovieDBUrlBase} from '../../utils/constants'
import {TheMovieDB} from '../../utils/credentials'

export default function MovieDetail(props) {

    let {_id} = useParams()
    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [movie, setMovie] = useState(null)
    const handleMovie = movie => setMovie(movie)
    
    const [credits, setCredits] = useState(null)
    const handleCredits = credits => setCredits(credits)

    const [characters, setCharacters] = useState(null)
    const handleCharacters = characters => setCharacters(characters)
    
    const [charactersToMeetFromThisMovie, setCharactersToMeetFromThisMovie] = useState(null)
    const handleCharactersToMeetFromThisMovie = characters => setCharactersToMeetFromThisMovie(characters)

    const [charactersKnownFromThisMovie, setCharactersKnownFromThisMovie] = useState(null)
    const handleCharactersKnownFromThisMovie = characters => setCharactersKnownFromThisMovie(characters)

    useEffect(() => {        
        const fetchMovie = async movieId => {
            try {
                const movieFetched = await axios.get(`${ApiUrlBase}/movies?_id=${movieId}`)
                return movieFetched.data[0]
                    ? handleMovie(movieFetched.data[0])
                    : handleStatus(true, 'error', 'No hay personaje para mostrar :(')
            } catch (error) {
                handleStatus(true, 'error' ,'Ooops! Ha ocurrido un error :(')
            }
        }       
        fetchMovie(_id ? _id : props._id)
    }, [_id, props]);

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
        if (movie)
            fetchCredits(movie.id)
    }, [movie]);

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
                & 
                handleCharactersToMeetFromThisMovie([...castingCharactersNames.filter(character => 
                    !charactersNames.includes(character))])
            )
        }
        if(characters && credits) 
            filterCharactersOfThisMovie(characters, credits.cast)

    }, [characters, credits]);

    const header = (
        <img alt="Card" src={require('../../utils/images/Logos/ProfileUnknow.png')}/>
    );


    return (
        <div className="charDetail">

            <div className="p-grid p-justify-center m10">
                {
                    status.showMessage
                    ? <Message severity={status.type} text={status.message}/>
                    : null
                }
            </div>

            {
                movie !== null
                ?
                    <div className="p-grid p-align-stretch vertical-container m10">

                        <div className="p-col">
                            <div className="box box-stretched">
                                {/* Poster of movie */}
                                {
                                    movie.poster_path !== ''
                                    ?   
                                        <img 
                                            src={`${TheMovieDBImagesUrlBase}${movie.poster_path}`} 
                                            key={movie.id} 
                                            alt={`img`} 
                                            style={{background: 'white'}}
                                        />
                                    :
                                        <img 
                                            src={require(`../../utils/images/Logos/Cinema.png`)} 
                                            key="1"
                                            alt="img-1"
                                            style={{ background: 'white' }}
                                        />
                                }
                            </div>
                        </div>
                    
                        <div className="p-col m10">
                            <Panel className="m10" header={movie.title} style={{textAlign: 'center'}}>
                                <p className="movieName">Año de lanzamiento: {movie.release_date}</p>
                                <hr/>
                                <p className="movieBiography" align="justify">{movie.overview}</p>
                            </Panel>

                            <Panel className="m10" header="Personajes" style={{textAlign: 'center'}}>
                                <ScrollPanel style={{width: '100%', height: '200px'}} className="custombar2">>
                                {
                                    charactersKnownFromThisMovie && charactersToMeetFromThisMovie
                                    ?
                                        <div className="p-grid p-justify-center">
                                        {
                                            charactersKnownFromThisMovie.map((character, i) => (
                                                <div className="p-col-6 p-md-6" key={i}>
                                                    <CharCard character={character}/>
                                                </div>
                                            ))
                                        }
                                        {
                                            charactersToMeetFromThisMovie.map((character, i) => (
                                                <div className="p-col-6 p-md-6" key={i}>
                                                    <Card title={character} className="ui-card-shadow m5" header={header}/>
                                                </div>
                                            ))
                                        }
                                        </div>

                                    :
                                        <ProgressSpinner 
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginRight: '-50%',
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        />
                                }                            
                                </ScrollPanel>
                            </Panel>

                            <Panel className="m10" header="Casting" style={{textAlign: 'center'}}>
                                <ScrollPanel style={{width: '100%', height: '200px'}} className="custombar2">>
                                {
                                    credits
                                    ?
                                        <div className="p-grid p-justify-center">
                                        {
                                            credits.cast.map((character, i) => (
                                                <div className="p-col-6 p-md-4" key={i}>
                                                    <CharMovieCard character={character}/>
                                                </div>
                                            ))

                                        }
                                        </div>

                                    :
                                        <ProgressSpinner 
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginRight: '-50%',
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        />
                                }                            
                                </ScrollPanel>
                            </Panel>
                        </div>

                    </div>
            
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
    )
}