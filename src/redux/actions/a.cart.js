import axios from 'axios';

import { ERRORS, MESSAGE, SET_ALERT, DEL_ALERT, EMPTY_CART, GET_OR_UPDATE_CART } from './ctes'

export function getOrUpdateCart(cart, currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const response = await axios.put(`api/private/cart`, cart, {
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            });
            dispatch({ type: GET_OR_UPDATE_CART, payload: response.data.data })
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }

    }
}

export function emptyCart(cart, currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const response = await axios.put(`api/private/emptyCart`, cart, {
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            });
            dispatch({ type: EMPTY_CART, payload: response.data.data })
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }

    }
}