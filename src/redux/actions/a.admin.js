import axios from 'axios';

import {GET_ALL_CATEGORIES, GET_ALL_USERS, ERRORS, SET_ALERT, MESSAGE, GET_ALL_ORDERS, GET_ALL_CATEGORIES_ADMIN} from './ctes'


export function adminUpdateCategory (id, category, currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const allCategories = await axios.put(`/api/admin/categories/update/${id}`, category, {
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            });
            dispatch({type: SET_ALERT, payload: allCategories.data.msg});
            dispatch({type: GET_ALL_CATEGORIES, payload: allCategories.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function adminDisabledCategory (id, currentUser) {
    const token = currentUser?.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const allCategories = await axios.put(`/api/admin/categories/disabled/${id}`, null, {
                headers:{
                    'Authorization': `Bearer ${token}`
                  }
            });
            dispatch({type: SET_ALERT, payload: allCategories.data.msg});
            dispatch({type: GET_ALL_CATEGORIES, payload: allCategories.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function adminEnabledCategory (id, currentUser) {
    const token = currentUser?.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const allCategories = await axios.put(`/api/admin/categories/enabled/${id}`, null, {
                headers:{
                    'Authorization': `Bearer ${token}`
                  }
            });
            dispatch({type: SET_ALERT, payload: allCategories.data.msg});
            dispatch({type: GET_ALL_CATEGORIES, payload: allCategories.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function adminAddCategory (category, currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const allCategories = await axios.post('/api/admin/category', category, {
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            });
            dispatch({type: SET_ALERT, payload: allCategories.data.msg})
            dispatch({type: GET_ALL_CATEGORIES, payload: allCategories.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function adminDeleteCategory (id, currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const response = await axios.put(`/api/admin/categories/delete/${id}`, null, {
                headers:{
                    'Authorization': `Bearer ${token}`
                  }
            });
            dispatch({type:GET_ALL_CATEGORIES, payload:response.data.data})
            dispatch({type: SET_ALERT, payload: response.data.msg})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function getAllUsers(currentUser){
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const users = await axios.get('/api/admin/users', {
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            });
            dispatch({type: MESSAGE, payload: users.data.msg})
            dispatch({type: GET_ALL_USERS, payload: users.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}


export function deleteUser(id, hola, currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const result = await axios.put(`/api/admin/userDelete/${id}`, hola, {
                headers:{
                    'Authorization': `Bearer ${token}`
                  }
            });
            dispatch({type: SET_ALERT, payload: result.data.msg})
            dispatch({type: GET_ALL_USERS, payload: result.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function upgradeUser(id, hola, currentUser){
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const result = await axios.put(`/api/admin/userAdmin/${id}`,hola, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch({type: SET_ALERT, payload: result.data.msg})
            dispatch({type: GET_ALL_USERS, payload: result.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function blockPass(id, currentUser){
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const result = await axios.get(`/api/admin/blockPass/${id}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            });
            dispatch({type: SET_ALERT, payload: result.data.msg})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function allOrders(currentUser){
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const result = await axios.get('/api/admin/allOrders', {
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            });
            dispatch({type: GET_ALL_ORDERS, payload: result.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function banned(id, motivo, currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const result = await axios.put(`/api/admin/banned/${id}`, motivo,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({type: SET_ALERT, payload: result.data.msg})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function getAllAdminCategories(currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const categories = await axios.get('/api/admin/categories', {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({type: MESSAGE, payload: categories.data.msg})
            dispatch({type: GET_ALL_CATEGORIES_ADMIN, payload: categories.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}