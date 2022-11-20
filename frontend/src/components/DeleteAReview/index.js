import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { deleteReview } from '../../store/spotsReducer';
import './DeleteAReview.css'
import { useParams } from 'react-router-dom'
import "../../index.css"
const DeleteAReview = () => {
    const {spotId, reviewId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const spots = useSelector(state => state.spots)
    const handleClick = (reviewId) => {
        const deletion = dispatch(deleteReview(reviewId))
        if(deletion){
            history.push(`/currentSpot/${spotId}`)
        }
    }
  return (
    <div>
        <button onClick={() => handleClick(reviewId)} className='delete-button'>Click to Confirm Deletion</button>
    </div>
  )
}

export default DeleteAReview
