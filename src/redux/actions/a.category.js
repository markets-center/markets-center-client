import axios from 'axios';

import {ERRORS, GET_ALL_CATEGORIES, MESSAGE, LOADING_ON, LOADING_OFF} from './ctes';

export function getAllCategories() {
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            const categories = await axios.get('/api/public/categories');
            dispatch({type: MESSAGE, payload: categories.data.msg})
            dispatch({type: GET_ALL_CATEGORIES, payload: categories.data.data})
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}
