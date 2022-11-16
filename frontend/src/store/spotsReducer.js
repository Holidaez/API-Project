import { csrfFetch } from "./csrf"

const GET_SPOTS = 'spots/getSpots'
const CREATE_SPOT = 'spots/createSpot'
const UPDATE_SPOT = 'spots/update'
const CURRENT_SPOT = 'spot/current'
const DELETE_SPOT = 'spot/delete'
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

export const deleteASpot = (spots) => {
    return {
        type: DELETE_SPOT,
        spots
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
        // console.log(response)
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

export const deleteSpot = (spotId) => async (dispatch) => {
    console.log(spotId)
    const response = await csrfFetch(`/api/spots/${spotId.id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spotId)
    })
    const spot = await response.json()
    console.log(spot)
    dispatch(deleteASpot(spotId))
    return spot
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
        default:
            return state
    }
}

export default spotsReducer
