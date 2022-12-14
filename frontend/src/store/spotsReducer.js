
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

export const currentSpot = (spot, reviewObj) => {
    return {
        type: CURRENT_SPOT,
        spot,
        reviewObj
    }
}

export const deleteASpot = (spot) => {
    return {
        type: DELETE_SPOT,
        spot
    }
}
export const createAReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}
export const deleteTheReview = (review) => {
    return {
        type: DELETE_REVIEW,
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
    if(response.ok){
        const spots = await response.json();
        dispatch(getSpots(spots.Spots))
    }
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
    if (response.ok) {
        const spot = await response.json()
        if (spot.numReviews > 0) {
            const reviewResponse = await csrfFetch(`/api/spots/${spotId}/reviews`)
            if (reviewResponse.ok) {
                const reviewObj = await reviewResponse.json()

                dispatch(currentSpot(spot, reviewObj))
            }
        }else {
            dispatch(currentSpot(spot))
        }
    }

}

export const deleteSpot = (spotId) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotId)
    })

    if (response.ok) {
        const spot = await response.json()

        await dispatch(deleteASpot(spotId))
        await dispatch(getAllSpots())
        return spot
    }
}
export const deleteReview = (reviewId) => async (dispatch) => {

    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
        const review = await response.json()

        dispatch(deleteTheReview(reviewId))
        return review
    }
}
export const createReview = (spotId, payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
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
            const spotState = { [action.spot.id]: action.spot }
            spotState[action.spot.id].Reviews = action?.reviewObj?.Reviews
            return spotState

        case CREATE_REVIEW:
            return { ...state }

        case UPDATE_SPOT:
            return {
                ...state,
                [action.spots.id]: action.spots
            }

        case DELETE_SPOT:
            const deleteState = { ...state }
            delete deleteState[action.spot.id]
            console.log(deleteState)
            return deleteState
            // let returnState = deleteState.filter(currentState => currentState.id !== action.spots.id)
            // console.log(returnState)
            // return returnState

        case DELETE_REVIEW:
            const deleteReview = [{ ...state }]
            let returnstate = deleteReview.filter(currentReview => currentReview.id !== action.review.id)
            console.log(returnstate)
            return returnstate

        default:
            return state
    }
}

export default spotsReducer
