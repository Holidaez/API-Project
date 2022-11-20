import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { deleteReview } from '../../store/spotsReducer';
import { useParams } from 'react-router-dom'
import './DeleteAReview.css'
import "../../index.css"
const DeleteAReview = () => {
    const {spotId, reviewId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const spots = useSelector(state => state.spots)
    const handleClick = async (reviewId) => {
        const deletion = await dispatch(deleteReview(reviewId))
        if(deletion){
            history.push(`/currentSpot/${spotId}`)
        }
    }
  return (
    <div className='delete-button-container'>
        <button onClick={() => handleClick(reviewId)} className='delete-button'>Click to Confirm Deletion</button>
    </div>
  )
}

export default DeleteAReview
