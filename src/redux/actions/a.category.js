import axios from 'axios';

import {ERRORS, GET_ALL_CATEGORIES, MESSAGE} from './ctes';

export function getAllCategories() {
    return async function (dispatch) {
        try {
            const categories = await axios.get('http://localhost:5001/api/public/categories');
            dispatch({type: MESSAGE, payload: categories.data.msg})
            dispatch({type: GET_ALL_CATEGORIES, payload: categories.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.data.msg})
        }
    }
}
