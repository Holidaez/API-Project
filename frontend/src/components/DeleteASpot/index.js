import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { deleteSpot } from '../../store/spotsReducer';
import "./DeleteASpot.css"
import "../../index.css"
const DeleteASpot = () => {
    const dispatch = useDispatch()
    const {spotId} = useParams()
    const spot = useSelector(state => state.spots[spotId])
    const history = useHistory()
    const handleClick = (spot) => {
        const yo = dispatch(deleteSpot(spot))
        if (yo) {
            history.push('/')
        }

    }
    return (
        <div className='delete-button-container'>
            <button onClick={() => handleClick(spot)} className="delete-button"> Click to Confirm Deletion</button>
        </div>
    )
}

export default DeleteASpot
