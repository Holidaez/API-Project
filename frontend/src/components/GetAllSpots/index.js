import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllSpots } from '../../store/spotsReducer.js'
import { Link } from 'react-router-dom'
import './GetAllSpots.css'

/**
 *session:{},
 * Spots:[
 *         1:{}
 *         2:{}
           3:{}
 *         4:{}
 * ]
 */
const SpotGetter = () => {
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots)
    //Object.values(spots) = 1:{},2:{},3:{},4:{}

    useEffect(() => {

        dispatch(getAllSpots())

    }, [dispatch])


    const spotItems = Object.values(spots).map((spotItem) => {
        return (
            <li key={spotItem.id}>
                <img src={spotItem.previewImage} alt="image Machine Broke" className='image'></img>
                <h3>{`${spotItem.city}, ${spotItem.state}`}</h3><h3>{spotItem.avgRating}</h3>
                <p>${spotItem.price} night</p>
                <Link to={`/currentSpot/${spotItem.id}`}>
                <span>More Details</span>
                </Link>
            </li>
        )
    })

    return (
        <div>GET ALL SPOTS
            <ul>
                {spotItems}
            </ul>
        </div>
    )
}

export default SpotGetter
