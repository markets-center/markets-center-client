import axios from 'axios';

import {GET_ALL_CATEGORIES, ADMIN_UPDATE_ADD_CATEGORY, GET_ALL_USERS, ERRORS, MESSAGE} from './ctes'

export function adminUpdateCategory (id, category) {
    return async function (dispatch) {
        try {
            const allCategories = await axios.put(`/api/admin/categories/${id}`, category);
            dispatch({type: MESSAGE, payload: allCategories.data.msg});
            dispatch({type: GET_ALL_CATEGORIES, payload: allCategories.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function adminAddCategory (category) {
    return async function (dispatch) {
        try {
            const allCategories = await axios.post('/api/admin/category', category);
            dispatch({type: MESSAGE, payload: allCategories.data.msg})
            dispatch({type: GET_ALL_CATEGORIES, payload: allCategories.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function adminDeleteCategory (id) {
    return async function (dispatch) {
        try {
            const response = await axios.delete(`/api/admin/categories/${id}`);
            dispatch({type:GET_ALL_CATEGORIES, payload:response.data.data})
            dispatch({type: MESSAGE, payload: response.data.msg})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function getAllUsers(){
    return async function (dispatch) {
        try {
            const users = await axios.get('/api/private/users');
            dispatch({type: MESSAGE, payload: users.data.msg})
            dispatch({type: GET_ALL_USERS, payload: users.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}


export function deleteUser(id) {
    return async function (dispatch) {
        try {
            const result = await axios.delete(`/api/admin/userDelete/${id}`);
            dispatch({type: MESSAGE, payload: result.data.msg})
            dispatch({type: GET_ALL_USERS, payload: result.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function upgradeUser(id){
    return async function (dispatch) {
        try {
            const result = await axios.put(`/api/admin/userAdmin/${id}`);
            dispatch({type: MESSAGE, payload: result.data.msg})
            dispatch({type: GET_ALL_USERS, payload: result.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function blockPass(id){
    return async function (dispatch) {
        try {
            const result = await axios.get(`/api/admin/blockPass/${id}`);
            dispatch({type: MESSAGE, payload: result.data.msg})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}