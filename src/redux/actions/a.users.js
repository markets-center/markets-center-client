import axios from 'axios';

import {DEL_ONE_USER, SET_ALERT, ERRORS, MESSAGE, UPDATE_USER, GET_USER_HISTORY, LOADING_OFF, LOADING_ON} from './ctes';

export function postNewUser (user, currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const response = await axios.post(`/api/private/users/add`, user,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({type: UPDATE_USER, payload: response.data.data})
            dispatch({type: MESSAGE, payload:response.data.msg});
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg});
        }
    }
}

export function updateUser (user, currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const newUser = await axios.put(`/api/private/users/update`, user, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({type: UPDATE_USER, payload: newUser.data.data})
            dispatch({type: SET_ALERT, payload: newUser.data.msg});
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function userById (id, currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const newUser = await axios.get(`/api/private/users/byid/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({type: MESSAGE, payload: newUser.data.msg});
            dispatch({type: UPDATE_USER, payload: newUser.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function userHistory(id, currentUser){
    const token = currentUser.auth.currentUser.accessToken
    return async function(dispatch) {
        try {
            dispatch({type: LOADING_ON})
            const history = await axios.get(`/api/private/users/history/${id}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            })
            dispatch({type: GET_USER_HISTORY, payload:history.data.data});
            dispatch({type:MESSAGE, payload: history.data.msg})
            dispatch({LOADING_OFF})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function delOneUser() {
    return {type: DEL_ONE_USER, payload:''}
}

