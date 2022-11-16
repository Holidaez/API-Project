import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createASpot } from "../../store/spotsReducer"
import { Redirect, useHistory } from "react-router-dom";


const SpotInput = () => {
    const history = useHistory()
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
    const [previewImage, setPreviewImage] = useState('')
    const [errors, setErrors] = useState([])
    useEffect(() => {
        let errs = []
        if (name.length === 0) errs.push("Name field is required")
        if (name.length > 30) errs.push("Name field must be 30 characters or less")
        if (city.length === 0) errs.push("City field is required")
        if (state.length === 0) errs.push("State field is required")
        if (address.length === 0) errs.push("Address field is required")
        if (country.length === 0) errs.push("Country field is required")
        if (description.length === 0) errs.push("Description field is required")
        if (description.length > 300) errs.push("Description field must be 300 characters or less")
        if (isNaN(price)) errs.push("Price Can only Consisty of Numbers")
        if (previewImage.length === 0) errs.push("Please include an image")
        setErrors(errs)
    }, [name, city, state, address, country, description, price, previewImage])


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
            previewImage,
        }
        const spot = dispatch(createASpot(newSpot))
        if (spot) {

            history.push('/')
        }
    }
    return (
        <div className="spotForm">
            <h1>Host Your Home</h1>
            <ul className="errors">{errors.map(e => (
                <li key={e}>{e}</li>))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    placeholder='Address'
                    name='Address'
                />
                <input
                    type='text'
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    placeholder='City'
                    name='City'
                />
                <input
                    type='text'
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    placeholder='State'
                    name='State'
                />
                <input
                    type='text'
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    placeholder='Country'
                    name='Country'
                />
                <input
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder='Name'
                    name='Name'
                />
                <input
                    type='text'
                    onChange={(e) => setPreviewImage(e.target.value)}
                    value={previewImage}
                    placeholder='PreviewImage'
                    name='PreviewImage'
                />
                <input
                    type='text'
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
                <button type='submit' disabled={errors.length > 0}>Submit Home</button>
            </form>
        </div>
    )
}

export default SpotInput
