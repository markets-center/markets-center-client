import axios from 'axios';

import {ERRORS, MESSAGE, UPDATE_USER, GET_USER_HISTORY} from './ctes';

export function postNewUser (user) {
    return async function (dispatch) {
        try {
            const response = await axios.post(`/api/private/users/add`, user);
            dispatch({type: MESSAGE, payload:response.data.msg});
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg});
        }
    }
}

export function updateUser (user) {
    return async function (dispatch) {
        try {
            const newUser = await axios.put(`/api/private/users/update`, user);
            dispatch({type: UPDATE_USER, payload: newUser.data.data})
            dispatch({type: MESSAGE, payload: newUser.data.msg});
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function userById (id) {
    return async function (dispatch) {
        try {
            const newUser = await axios.get(`/api/private/users/byid/${id}`);
            dispatch({type: MESSAGE, payload: newUser.data.msg});
            dispatch({type: UPDATE_USER, payload: newUser.data.data[0]})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function userHistory(id){
    return async function(dispatch) {
        try {
            const history = await axios.get(`/api/private/users/history/${id}`)
            dispatch({type: GET_USER_HISTORY, payload:history.data.data});
            dispatch({type:MESSAGE, payload: history.data.msg})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}