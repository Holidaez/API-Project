

import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { createReview } from '../../store/spotsReducer'
import { useDispatch } from 'react-redux'
import './LeaveAReview.css'
import '../../index.css'


const LeaveAReview = () => {
    const { spotId } = useParams()
    const [review, setReview] = useState('')
    const [stars, setStars] = useState(1)
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])

    useEffect(() => {
        let errs = []
        if(review.length === 0 ) errs.push("Please write a review")
        if(review.length > 200) errs.push("Reviews can only be 200 characters")
        if(stars > 5 || stars < 1 ) errs.push('Stars can only be a number from 1 to 5')
        if(isNaN(stars)) errs.push("Stars can only be a number from 1 to 5")
        setErrors(errs)
    },[stars,review])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newReview = {
            review,
            stars
        }
        const returnReview = dispatch(createReview(spotId, newReview))
        if(returnReview){
            history.push(`/currentSpot/${spotId}`)
        }
    }

    return (
        <div className='review-form-container'>
            <h1>How Was Your Stay?</h1>
            <ul className="errors">{errors.map(e => (
                <li key={e}>{e}</li>))}
            </ul>
            <form onSubmit={handleSubmit} className='review-form'>
                <div className='review-form-elements'>
                    <textarea
                        onChange={(e) => setReview(e.target.value)}
                        value={review}
                        placeholder='Your Review'
                        name='review'
                        rows='20'
                        className='review-form-textarea'
                    ></textarea>
                    <input
                        type='number'
                        min={1}
                        max={5}
                        onChange={(e) => setStars(e.target.value)}
                        value={stars}
                        placeholder='stars'
                        name='stars'
                        className='review-form-input'
                    />
                </div>
                <button type='submit' className="review-submit-button" disabled={errors.length > 0 }>Submit Review</button>
            </form>
        </div>
    )
}

export default LeaveAReview
