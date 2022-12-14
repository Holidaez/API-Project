import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllSpots } from '../../store/spotsReducer.js'
import { Link } from 'react-router-dom'
import './GetAllSpots.css'
import '../../index.css'
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
    }, [])

    const spotItems = Object.values(spots).map((spotItem) => {
        // console.log(spotItem)
        const rating = spotItem.avgRating !== "NaN" ? (
            <h4 className='spot-rating-get-spots'><i className="fa-solid fa-star">
            </i>{spotItem.avgRating}</h4>
        ) : (
            <p className='no-reviews'>No Reviews</p>
        )

        return (
            <li key={spotItem.id} className='spot-list-item'>
                <img src={spotItem.previewImage} alt="image not found" className='image'></img>
                <div className='city-state-rating-div'>
                    <h3>{`${spotItem.city}, ${spotItem.state}`}</h3>
                    {rating}
                </div>

                <p className='spot-price'>${spotItem.price} night</p>
                <Link to={`/currentSpot/${spotItem.id}`} className="link-get-spots">
                    <span>More Details</span>
                </Link>
            </li>
        )
    })

    return (
        <div className='home-page-container'>
            <ul className='spot-list'>
                {spotItems}
            </ul>
        </div>
    )
}

export default SpotGetter
