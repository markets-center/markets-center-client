import axios from 'axios';

import {ERRORS, MESSAGE, UPDATE_USER} from './ctes';

export function postNewUser (user) {
    return async function (dispatch) {
        try {
            const response = await axios.post(`http://localhost:4000/api/private/users/add`, user);
            dispatch({type: MESSAGE, payload:response.data.msg});
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg});
        }
    }
}

export function updateUser (user) {
    return async function (dispatch) {
        try {
            const newUser = await axios.put(`http://localhost:4000/api/private/users/update`, user);
            console.log(newUser)
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
            console.log(id);
            const newUser = await axios.get(`http://localhost:4000/api/private/users/byid/${id}`);
            dispatch({type: MESSAGE, payload: newUser.data.msg});
            dispatch({type: UPDATE_USER, payload: newUser.data.data[0]})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}
