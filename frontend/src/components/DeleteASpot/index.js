import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { deleteSpot } from '../../store/spotsReducer';

const DeleteASpot = () => {
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spots)
    const history = useHistory()
    const handleClick =  (spot) => {
        const yo =  dispatch(deleteSpot(spot))

        history.push('/')

    }
    return (
        <div>
            <button onClick={() => handleClick(spot)}> Click to Confirm Deletion</button>
        </div>
    )
}

export default DeleteASpot