import React, {useState} from 'react';

//************************************** React Components ******************************************
import Header from '../Header'
import RestaurantsMap from '../Restaurant/RestaurantsMap/RestaurantsMap'
import RestaurantCategorySelector from '../Restaurant/RestaurantCategorySelector'

//********************************************* Components *********************************************
export default function Restaurants() {

    const [field, setField] = useState(null)
    const handleField = field => setField(field.toLowerCase())

    const [category, setCategory] = useState(null)
    const handleCategory = category => setCategory(category)

    return (
        <div>
            <Header/>
            <RestaurantCategorySelector handleCategory={handleCategory} handleField={handleField} field={field}/>
            <RestaurantsMap category={category} field={field}/>
        </div>
    )
}