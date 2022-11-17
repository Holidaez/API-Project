import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { findASpot, findCurrentSpotReviews, updateASpot } from "../../store/spotsReducer"
import { Redirect, useParams, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import './SpotDetails.css'

const CurrentSpotDetails = () => {
  const { spotId } = useParams()
  const dispatch = useDispatch()
  // const history = useHistory()
  const spots = useSelector(state => state.spots)
  const user = useSelector(state => state.session.user)
  let spotReviews;
  let image;

  useEffect(() => {
    dispatch(findASpot(spotId))
  }, [spotId])

  useEffect(() => {
    dispatch(findCurrentSpotReviews(spotId))
  }, [spotId])



  if (spots.Reviews) {
    let reviewNumber = 0
    spotReviews = spots.Reviews.map((review) => {
      return (
        <li key={review.id} className="user-reviews">
          <div className={`review${reviewNumber++}`}>
            <p>{review.User.firstName} {review.User.lastName}:</p>
            <p><i className="fa-solid fa-star"></i>{review.stars}</p>
            <p> {review.review}</p>
            <p>
              {user.id === review.User.id && (
                <Link to={`/review/delete/${review.id}`} className="link">Delete Review</Link>
              )}
            </p>
          </div>
        </li>
      )
    })

  }
  if (spots.SpotImages) {
    image = spots.SpotImages.map((img) => {
      return (
        <img src={img.url} alt="image Not Found" className="detail-image"></img>
      )
    })
  }

  return (
    <div>

      <div className="img-container">
        {image}
      </div>
      {spots.Owner && (
        <h2 className="detail-block">{`Owned By: ${spots.Owner.firstName} ${spots.Owner.lastName}`}</h2>
      )}
      <div className="detail-block">

        <h3>{`${spots.city}, ${spots.state}`}</h3>
        <h3><i className="fa-solid fa-star"></i> {spots.avgStarRating}</h3>
        <p>{spots.address}</p>
        <p>${spots.price} night</p>
        <p>{spots.description}</p>

      </div>
      {spots.Reviews && (
        <ul className="review-list">
          {spotReviews}
        </ul>
      )}

      {spots.Owner && user && user.id === spots.Owner.id && (
        <Link to={`/update/${spots.id}`} className="link">Edit</Link>
      )}
      <p>
        {spots.Owner && user && user.id === spots.Owner.id && (
          <Link to={`/delete/${spots.id}`} className="link">Delete Spot</Link>
        )}
      </p>
      <p>
        {spots.Owner && user && user.id !== spots.Owner.id && (
          <Link to={`/create/review/${spots.id}`} className="link">Leave A Review</Link>
        )}
      </p>
    </div>
  )

}
export default CurrentSpotDetails
