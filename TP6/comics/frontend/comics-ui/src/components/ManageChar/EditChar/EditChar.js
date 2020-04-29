import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router'

import CharSelector from '../../Character/CharSelector'

import {Message} from 'primereact/message'
import {InputText} from "primereact/inputtext"
import {InputMask} from 'primereact/inputmask'
import {InputTextarea} from 'primereact/inputtextarea'
import {InputNumber} from 'primereact/inputnumber'
import {Chips} from 'primereact/chips'
import {Button} from 'primereact/button'

import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import {Carousel} from 'react-responsive-carousel'

import axios from 'axios'
import {ApiUrlBase} from '../../../utils/constants'
import capitalize from '../../../utils/capitalize'

export default function EditChar(props) {

    let {house} = useParams()

    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})
   
    const [characterSearched, setCharacterSearched] = useState('')
    const handleCharacterSearched = char => setCharacterSearched(char)
    
    const [character, setCharacter] = useState(null)
    
    const handleName = name => setCharacter({...character, name:name})
    const handleCharacterName = charName => setCharacter({...character, character_name: charName})
    const handleYearOfAppearance = year => setCharacter({...character, year_of_appearance: year})
    const handleBiography = biography => setCharacter({...character, biography: biography})
    const handleEquipment = equipment => setCharacter({...character, 
        equipment: equipment.length !== 0 ? equipment.map(e => e !== '' ? capitalize(e) : '') : equipment})
    const handleImages = images => setCharacter({...character, images: images})
    const handleAmountImages = amountImages => setCharacter({...character, 
        amount_images: amountImages ? amountImages.toString() : '0'})
    const handleCharacter = char => setCharacter(char)
    
    const handleSubmit = async e => {
        try {
            e.preventDefault()

            if (
                character.character_name === '' ||
                character.year_of_appearance === '' ||
                character.house === '' ||
                character.biography === '' ||
                character.images.length === 0 ||
                character.amount_images <= 0 ||
                character.images.length < character.amount_images
            )
                return handleStatus(true, 'info', 'Debe tener en cuenta que los campos vacíos permitidos son "Nombre" y "Equipamiento", ademas la cantidad de imagenes para mostrar debe ser menor o igual a las ingresadas.')

            return await axios.put(`${ApiUrlBase}/characters`, character)
                    .then(handleStatus(true, 'success', '¡Personaje editado exitosamente! :)'))
                    .then(setInterval(() => handleStatus(false), 5000))
                    .then(setInterval(() => refreshPage(), 5000))
            
        } catch (error) {
            handleStatus(true, 'error', '¡Ooops, ha ocurrido un error!')
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

    const customChip= item => {
        return (
            <small className="p-chips-token"
            style={{
                fontSize: '12px',
                width: "100px",
                whiteSpace: 'nowrap',
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
            }}
            >{item}</small>
        );
    }
    
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
            
            {
                character
                ?
                    <form onSubmit={handleSubmit}>

                        <div className="p-col fixed">
                            <div className="p-grid p-justify-center">
                                <Button className="p-button-warning" label="Editar" icon="pi pi-check"/>
                            </div>
                        </div>

                        <div className="p-grid p-justify-around m10">
                            <div className="p-col-4">
                                <div className="p-grid p-justify-center">
                                    {/* Carousel of images */}
                                    <Carousel 
                                        showArrows={true}
                                        showThumbs={false}
                                        showIndicators={false}
                                        showStatus={false}
                                    >
                                        {
                                            character.images.length === 0
                                            ? 
                                                <img 
                                                    src={require(`../../../utils/images/Logos/${character.house}.png`)} 
                                                    key="1"
                                                    alt="img-1"
                                                    style={{ background: 'white' }}
                                                />
                                            : 
                                                character.images.slice(0, parseInt(character.amount_images)).map((img, i) => 
                                                    <img 
                                                        src={img} 
                                                        key={i+1} 
                                                        alt={`img-${i+1}`} 
                                                        style={{background: 'white'}}
                                                    />
                                                )
                                        }
                                    </Carousel>
                                </div>
                            </div>

                            <div className="p-col-4 m15">
                                <div className="p-grid p-justify-center">

                                    {/* Nombre de personaje */}
                                    <div className="p-inputgroup m10">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-user"></i>
                                        </span>
                                        <InputText 
                                            value={character.character_name}
                                            placeholder="Nombre de personaje"
                                            onChange={e => handleCharacterName(capitalize(e.target.value))}
                                            required
                                        />
                                    </div>

                                    {/* Nombre */}
                                    <div className="p-inputgroup m10">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-star"></i>
                                        </span>
                                        <InputText
                                            value={character.name}
                                            placeholder="Nombre" 
                                            onChange={e => handleName(capitalize(e.target.value))}
                                        />
                                    </div>

                                    {/* Año de aparicion */}
                                    <div className="p-inputgroup m10">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-calendar"></i>
                                        </span>
                                        <InputMask 
                                            mask="9999" 
                                            value={character.year_of_appearance}
                                            placeholder="Año de aparicion"
                                            slotChar="yyyy" 
                                            onChange={e => handleYearOfAppearance(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* Casa */}
                                    <div className="p-inputgroup m10">
                                        <span className="p-inputgroup-addon" style={{textAlign: 'center'}}>
                                            <i className="pi pi-home"></i>
                                        </span>
                                        <span 
                                            className={`fa fa-${house} m5`}
                                            style={{textAlign: 'center'}}
                                        />
                                    </div>
                                    
                                    {/* Equipamiento */}
                                    <div className="box m10">
                                        <Chips 
                                            placeholder="Equipamiento"
                                            value={character.equipment} 
                                            onChange={e => handleEquipment(e.target.value)}
                                            itemTemplate={customChip}
                                        />
                                    </div>

                                    {/* Imagenes */}
                                    <div className="box m10">
                                        <Chips
                                            placeholder="Imagenes"
                                            value={character.images}
                                            onChange={e => handleImages(e.target.value)} 
                                            itemTemplate={customChip}
                                        />
                                    </div>

                                    {/* Cantidad de imagenes*/}
                                    <div className="p-inputgroup m10">
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-images"></i>
                                        </span>
                                        <InputNumber 
                                            value={parseInt(character.amount_images)} 
                                            onChange={e => handleAmountImages(e.target.value)}
                                            min={0} 
                                            max={100}
                                            required
                                        />
                                    </div>

                                    {/* Biografia */}
                                    <div className="p-inputgroup m10">
                                        <InputTextarea 
                                            rows={5} 
                                            cols={30} 
                                            value={character.biography}
                                            onChange={e => handleBiography(e.target.value)} 
                                            autoResize={true}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                : null
            }

        </div>
    )
}