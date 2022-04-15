import axios from 'axios';

import {ERRORS, GET_ALL_CATEGORIES, MESSAGE} from './ctes';

export function getAllCategories() {
    return function async (dispatch) {
        try {
            const categories= await axios.get('http://localhost:5000/api/public/categories');
            dispatch({type: MESSAGE, payload: categories.msg})
            dispatch({type: GET_ALL_CATEGORIES, payload: categories.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}
