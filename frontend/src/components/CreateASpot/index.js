import { useState } from "react"
import { useDispatch } from "react-redux"
import { createASpot } from "../../store/spotsReducer"
import { Redirect } from "react-router-dom";


const SpotInput = () => {
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [lat, setLat] = useState(44)
    const [lng, setLng] = useState(44)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newSpot = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        }
        const spot = await dispatch(createASpot(newSpot))
        if(spot) {

            return <Redirect to='/' />
        }
    }
    return(
        <div className="spotForm">
            <h1>Host Your Home</h1>
            <form onSubmit={handleSubmit}>
                <input
                type= 'text'
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                placeholder='Address'
                name='Address'
                />
                 <input
                type= 'text'
                onChange={(e) => setCity(e.target.value)}
                value={city}
                placeholder='City'
                name='City'
                />
                 <input
                type= 'text'
                onChange={(e) => setState(e.target.value)}
                value={state}
                placeholder='State'
                name='State'
                />
                 <input
                type= 'text'
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                placeholder='Country'
                name='Country'
                />
                 <input
                type= 'text'
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder='Name'
                name='Name'
                />
                 <input
                type= 'text'
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                placeholder='Price'
                name='Price'
                />
                 <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder='Description'
                name='Description'
                rows='20'
                ></textarea>
                <button type='submit'>Submit Home</button>
            </form>
        </div>
    )
}

export default SpotInput
