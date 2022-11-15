import { csrfFetch } from "./csrf"

const GET_SPOTS = 'spots/getSpots'
const CREATE_SPOT = 'spots/createSpot'

export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

export const createSpot = (spots) => {
    return {
        type:CREATE_SPOT,
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
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if (response.ok){
        const newSpot = await response.json()
        dispatch(createSpot(newSpot))
        return newSpot
    }
}

const spotsReducer = (state={}, action) => {
    switch (action.type){
        case GET_SPOTS:
            const newState = {}
            action.spots.forEach((spot)=> (newState[spot.id]= spot))
            return newState
        // case CREATE_SPOT:
        //     return {...state, ...[action.spots]}
        default:
            return state
    }
}

export default spotsReducer
