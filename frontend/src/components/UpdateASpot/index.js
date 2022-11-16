import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { findASpot, updateASpot } from "../../store/spotsReducer"
import { Redirect, useParams, useHistory } from "react-router-dom";



const SpotUpdater = () => {
    // const {spotId} = useParams()
    const dispatch = useDispatch()
     const spots = useSelector(state => state.spots)

    // useEffect(() => {
    //     dispatch(findASpot(spotId))
    // },[spotId])
    const history = useHistory()
    const [address, setAddress] = useState(spots.address)
    const [city, setCity] = useState(spots.city)
    const [state, setState] = useState(spots.state)
    const [country, setCountry] = useState(spots.country)
    const [lat, setLat] = useState(spots.lat)
    const [lng, setLng] = useState(spots.lng)
    const [name, setName] = useState(spots.name)
    const [description, setDescription] = useState(spots.description)
    const [price, setPrice] = useState(spots.price)
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

        setErrors(errs)
    }, [name, city, state, address, country, description, price])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            ...spots,
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
        const updatedSpot = await dispatch(updateASpot(payload))

        if(updatedSpot) {

            history.push(`/currentSpot/${spots.id}`)
        }
    }
  return (
    <div className="spotForm">
            <h1>Update Your Home</h1>

            <ul className="errors">{errors.map(e => (
                <li key={e}>{e}</li>))}
            </ul>

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
                <button type='submit' disabled={errors.length > 0}>Submit Home</button>
            </form>
        </div>
  )
}

export default SpotUpdater
