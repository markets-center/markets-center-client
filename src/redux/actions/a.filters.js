import axios from 'axios';
import { GET_PRODUCT_BY_CATEGORY, ERRORS, MESSAGE, LOADING_ON, LOADING_OFF, } from '../actions/ctes'

export function productByCategory(query) {
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            const result = await axios.get(`/api/public/filter/byCategory?categories=${query}`);
            dispatch({ type: MESSAGE, payload: result.data.msg })
            dispatch({ type: GET_PRODUCT_BY_CATEGORY, payload: result.data.data })
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }
    }
}