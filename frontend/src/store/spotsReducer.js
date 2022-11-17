
import { csrfFetch } from "./csrf"

const GET_SPOTS = 'spots/getSpots'
const CREATE_SPOT = 'spots/createSpot'
const UPDATE_SPOT = 'spots/update'
const CURRENT_SPOT = 'spot/current'
const DELETE_SPOT = 'spot/delete'
const CURRENT_SPOT_REVIEWS = 'spot/reviews'
const CREATE_REVIEW = 'spot/create/review'
const DELETE_REVIEW = 'spot/delete/review'
export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

export const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

export const updateSpot = (spots) => {
    return {
        type: UPDATE_SPOT,
        spots
    }
}

export const currentSpot = (spots) => {
    return {
        type: CURRENT_SPOT,
        spots
    }
}
export const currentSpotReviews = (spot) => {
    return {
        type: CURRENT_SPOT_REVIEWS,
        spot
    }
}
export const deleteASpot = (spots) => {
    return {
        type: DELETE_SPOT,
        spots
    }
}
export const createAReview = (review) => {
    return {
        type:CREATE_REVIEW,
        review
    }
}
export const deleteTheReview = (review) => {
    return {
        type:DELETE_REVIEW,
        review
    }
}
/* Spots:[
    0,
    1,
    2,
    3,
]
**/

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')
    const spots = await response.json();
    dispatch(getSpots(spots.Spots))
}
export const createASpot = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const newSpot = await response.json()
        const res2 = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    url: payload.previewImage,
                    preview: true
                }
            )
        })
        if (res2.ok) {
            const imageObj = await res2.json()
            newSpot.previewImage = imageObj.url
            dispatch(createSpot(newSpot))

        }
        return newSpot
    }
}

export const updateASpot = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const updatedSpot = await response.json()
        dispatch(updateSpot(updatedSpot))
        return updatedSpot
    }
}

export const findASpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    const spot = await response.json()
    dispatch(currentSpot(spot))
}
//!
export const findCurrentSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const spotReview = await response.json()
    dispatch(currentSpotReviews(spotReview))
}
//!
export const deleteSpot = (spotId) => async (dispatch) => {
    console.log(spotId)
    const response = await csrfFetch(`/api/spots/${spotId.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotId)
    })
    if(response.ok){
        const spot = await response.json()
        console.log(spot)
        dispatch(deleteASpot(spotId))
        return spot
    }
}
export const deleteReview = (reviewId) => async (dispatch) => {
    console.log(reviewId)
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    if(response.ok){
        const review = await response.json()
        console.log(review)
        dispatch(deleteTheReview(reviewId))
        return review
    }
}
export const createReview = (spotId, payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`,{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if(response.ok){
        const review = await response.json()
        dispatch(createAReview(review))
    }
}
const spotsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SPOTS:
            const newState = {}
            action.spots.forEach((spot) => (newState[spot.id] = spot))
            return newState

        case CREATE_SPOT:
            return { ...state, [action.spot.id]: action.spot }

        case CURRENT_SPOT:
            const spotState = action.spots
            return spotState

        case CURRENT_SPOT_REVIEWS:
            return {...state, Reviews: action.spot.Reviews}
        case CREATE_REVIEW:
            return {...state}
        case UPDATE_SPOT:
            return {
                ...state,
                [action.spots.id]: action.spots
            }
        case DELETE_SPOT:
            const deleteState = { ...state }
            console.log(deleteState)
            delete deleteState[action.spots.id]
            return deleteState
        case DELETE_REVIEW:
            const deleteReview = {...state}
            delete deleteReview[action.review.id]
            return deleteReview
        default:
            return state
    }
}

export default spotsReducer
