import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { findASpot, updateASpot } from "../../store/spotsReducer"
import { Redirect, useParams } from "react-router-dom";
import { Link } from 'react-router-dom'


const CurrentSpotDetails = () => {
  const { spotId } = useParams()
  const dispatch = useDispatch()
  const spots = useSelector(state => state.spots)
  const user = useSelector(state => state.session.user)
  console.log(user)
  useEffect(() => {
    dispatch(findASpot(spotId))
  }, [spotId])

  return (
    <div>
      <img src={spots.previewImage} alt="image Broke" className="image"></img>
      {spots.Owner && (
        <h2>{`Owned By: ${spots.Owner.firstName} ${spots.Owner.lastName}`}</h2>
      )}

      <h3>{`${spots.city}, ${spots.state}`}</h3><h3>{spots.avgRating}</h3>
      <p>{spots.address}</p>
      <p>${spots.price} night</p>
      <p>{spots.description}</p>

      {spots.Owner && user && user.id === spots.Owner.id && (
        <Link to={`/update/${spots.id}`}>Edit</Link>
      )}
      <p>
      {spots.Owner && user && user.id === spots.Owner.id && (
        <Link to={`/delete/${spots.id}`}>Delete Spot</Link>
      )}
      </p>
    </div>
  )

}
export default CurrentSpotDetails
