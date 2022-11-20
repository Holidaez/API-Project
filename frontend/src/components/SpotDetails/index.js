import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { findASpot, findCurrentSpotReviews, updateASpot } from "../../store/spotsReducer"
import { Redirect, useParams, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import './SpotDetails.css'
import '../../index.css'
const CurrentSpotDetails = () => {
  const { spotId } = useParams()
  const dispatch = useDispatch()
  const spots = useSelector(state => state.spots[spotId])
  const user = useSelector(state => state.session.user)
  let spotReviews;
  let image;
  let unique;
  useEffect(() => {
    dispatch(findASpot(spotId))
    // .then(dispatch(findCurrentSpotReviews(spotId)))
  }, [])
  if (!spots) return null

  if (spots && spots.Reviews) {
    let reviewNumber = 1
    spotReviews = spots.Reviews.map((review) => {
      return (
        <li key={review.id} className="user-reviews">
          <div className={`review${reviewNumber++}`}>
            <div className="review-name-stars">
              <p className="user-name">{review.User.firstName} {review.User.lastName}: </p>
              <p className="star-paragraph"><i className="fa-solid fa-star star-icon"></i>{review.stars}</p>
            </div>

            <p className="actual-review"> {review.review}</p>
            <p>
              {user && user.id === review.User.id && (
                <Link to={`/review/delete/${spotId}/${review.id}`} className="delete-review-link">Delete Review</Link>
              )}
            </p>
          </div>
        </li>
      )
    })

  }
  if (spots && spots.SpotImages) {
    image = spots.SpotImages.map((img) => {
      return (
        <img src={img.url} alt="image Not Found" className="detail-image"></img>
      )
    })
  }
  if (spots && spots.Reviews && user) {
    let test = spots.Reviews
    unique = test.filter(review => review.userId === user.id)
  }
  return (
    <div className="spot-details-container">
      <div className="header-div">

        <h1 className="spot-name">{spots.name}</h1>
        <div className="button-div">
          {spots.Owner && user && user.id === spots.Owner.id && (
            <p className="owner-options">
              {spots.Owner && user && user.id === spots.Owner.id && (
                <Link to={`/delete/${spots.id}`} className="link">Delete Spot</Link>
              )}
            </p>
          )}
          {spots.Owner && user && user.id === spots.Owner.id && (
            <p className="owner-options">
              {spots.Owner && user && user.id === spots.Owner.id && (
                <Link to={`/update/${spots.id}`} className="link">Edit</Link>
              )}
            </p>
          )}
        </div>

      </div>

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

        <h3 className="description-container-spot-details">About This Place:</h3>
        <p className="description">{spots.description}</p>

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
      {/* {spots.Owner && user && user.id === spots.Owner.id &&(
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
      )} */}
      <div className="review-button-container">
        <p className="review-button">
          {spots.Owner && user && user.id !== spots.Owner.id && spots.Reviews && unique.length < 1 && (
            <Link to={`/create/review/${spots.id}`} className="link">Leave Your Review</Link>
          )}
        </p>
      </div>
    </div>
  )

}
export default CurrentSpotDetails
