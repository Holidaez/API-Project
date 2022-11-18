import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { findASpot, findCurrentSpotReviews, updateASpot } from "../../store/spotsReducer"
import { Redirect, useParams, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import './SpotDetails.css'

const CurrentSpotDetails = () => {
  const { spotId } = useParams()
  const dispatch = useDispatch()
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
    let reviewNumber = 1
    spotReviews = spots.Reviews.map((review) => {
      return (
        <li key={review.id} className="user-reviews">
          <div className={`review${reviewNumber++}`}>
            <p className="user-name">{review.User.firstName} {review.User.lastName}: <i className="fa-solid fa-star"></i>{review.stars}
            </p>

            <p> {review.review}</p>
            <p>
              {user && user.id === review.User.id && (
                <Link to={`/review/delete/${review.id}`} className="delete-review-link">Delete Review</Link>
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

        <h3 className="city-state">{`${spots.city}, ${spots.state}`}</h3>
        <p className="address">Address: {spots.address}</p>
        <p className="price">${spots.price} per night</p>
        <div className="description-container">
          <h3>About This Place:</h3>
          <p className="description">{spots.description}</p>
        </div>
        {spots.avgStarRating !== "NaN" && (
          <h3 className="spot-rating">Rating:  <i className="fa-solid fa-star"></i> {spots.avgStarRating}</h3>
        )}
        {spots.avgStarRating === "NaN" && (
          <p className="spot-rating-no-review">No Reviews</p>
        )}
      </div>
      {spots.Reviews && (
        <ul className="review-list">
          {spotReviews}
        </ul>
      )}
      {spots.Owner && user && user.id === spots.Owner.id &&(
      <p className="owner-options">
        {spots.Owner && user && user.id === spots.Owner.id && (
          <Link to={`/update/${spots.id}`} className="link">Edit</Link>
        )}
      </p>
      )}
      {spots.Owner && user && user.id === spots.Owner.id &&(
        <p className="owner-options">
          {spots.Owner && user && user.id === spots.Owner.id && (
            <Link to={`/delete/${spots.id}`} className="link">Delete Spot</Link>
            )}
            </p>
      )}
      <div className="review-button-container">
        <p className="review-button">
          {spots.Owner && user && user.id !== spots.Owner.id && (
            <Link to={`/create/review/${spots.id}`} className="link">Leave Your Review</Link>
          )}
        </p>
      </div>
    </div>
  )

}
export default CurrentSpotDetails
