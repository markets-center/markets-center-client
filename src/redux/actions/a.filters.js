import axios from 'axios';
import { GET_PRODUCT_BY_CATEGORY, ERRORS, MESSAGE } from '../actions/ctes'

export function productByCategory(query) {
    return async function (dispatch) {
        try {
            const result = await axios.get(`http://localhost:4000/api/public//filter/byCategory?categories=${query}`);
            dispatch({ type: MESSAGE, payload: result.data.msg })
            dispatch({ type: GET_PRODUCT_BY_CATEGORY, payload: result.data.data })
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }
    }
}