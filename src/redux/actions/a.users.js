import axios from 'axios';

import {ERRORS, MESSAGE, UPDATE_USER} from './ctes';

export function postNewUser (user) {
    return async function (dispatch) {
        try {
            const response = await axios.post(`http://localhost:4000/api/private/users/add`, user);
            dispatch({type: MESSAGE, payload:response.msg});
        } catch (err) {
            dispatch({type: ERRORS, payload: err.data.msg});
        }
    }
}

export function uptadeUser (user) {
    return async function (dispatch) {
        try {
            const newUser = await axios.put(`http://localhost:4000/api/private/users/update`);
            dispatch({type: MESSAGE, payload: newUser.msg});
            dispatch({type: UPDATE_USER, payload: newUser.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.data.msg})
        }
    }
}
