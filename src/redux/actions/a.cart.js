import axios from 'axios';

import { ERRORS, MESSAGE, SET_ALERT, DEL_ALERT, EMPTY_CART, GET_OR_UPDATE_CART } from './ctes'

export function getOrUpdateCart(cart) {
    return async function (dispatch) {
        try {
            const response = await axios.put(`api/private/cart`, cart);
            dispatch({ type: GET_OR_UPDATE_CART, payload: response.data.data })
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }

    }
}

export function emptyCart(cart) {
    return async function (dispatch) {
        try {
            const response = await axios.put(`api/private/emptyCart`, cart);
            dispatch({ type: EMPTY_CART, payload: response.data.data })
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }

    }
}