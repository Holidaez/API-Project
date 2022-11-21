// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_ERROR = 'session/setError'
const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};
// const setError = (err) => {
//     return {
//         type: SET_ERROR,
//         payload:err
//     }
// }
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    // try{
        const response = await csrfFetch('/api/session', {
            method: 'POST',
            body: JSON.stringify({
                credential,
                password,
            }),
        });

        const data = await response.json();
        dispatch(setUser(data.user));
        return response;

    // }catch (error) {
    //     if (error.status === 401) {
    //         const err = await error.json()
    //         dispatch(setError(err))
    //     }
    // }

};
//! Thunks Restore user
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};
//!
//! Thunk2 Signup
export const signup = (user) => async (dispatch) => {
    const { username, email, password, firstName, lastName } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        firstName,
        lastName,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };
//!
//!Thunk 3 Logout
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };
//!
const initialState = { user: null };
// newState {{invalid:"invalid credientials"} user:null}
const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.error = null
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            newState.error = null
            return newState;
        // case SET_ERROR:
        //     newState = Object.assign({}, state);
        //     newState.error = action.payload
        //     return newState
        default:
            return state;
    }
};

export default sessionReducer;
