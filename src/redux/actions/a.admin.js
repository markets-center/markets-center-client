import axios from 'axios';

import {ADMIN_UPDATE_ADD_CATEGORY, GET_ALL_USERS, ERRORS, MESSAGE} from './ctes'

export function adminUpdateCategory (id, category) {
    return async function (dispatch) {
        try {
            const newCategory = await axios.put(`http://localhost:4000/api/admin/categories/${id}`, category);
            dispatch({type: MESSAGE, payload: newCategory.msg});
            dispatch({type: ADMIN_UPDATE_ADD_CATEGORY, payload: newCategory.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function adminAddCategory (category) {
    return async function (dispatch) {
        try {
            const newCategory = await axios.post('http://localhost:4000/api/admin/category', category);
            dispatch({type: MESSAGE, payload: newCategory.msg})
            dispatch({type: ADMIN_UPDATE_ADD_CATEGORY, payload: newCategory.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function adminDeleteCategory (id) {
    return async function (dispatch) {
        try {
            const response = await axios.delete(`http://localhost:4000/api/admin/categories/${id}`);
            dispatch({type: MESSAGE, payload: response.msg})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function getAllUsers(){
    return async function (dispatch) {
        try {
            const users = await axios.get('http://localhost:4000/api/private/users');
            dispatch({type: MESSAGE, payload: users.data.msg})
            dispatch({type: GET_ALL_USERS, payload: users.data.data})

        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}