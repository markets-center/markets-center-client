import axios from 'axios';
import {GET_FAVS, ERRORS, GET_FAV_DETAIL, LOADING_OFF, LOADING_ON} from './ctes';

export function getFavs(currentUser) {
    const token = currentUser.auth.currentUser.accessToken;
    return async function(dispatch) {
        try {
            const favs = await axios.get(`/api/private/favs/${currentUser.uid}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({type: GET_FAVS, payload: favs.data.data.favs})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function addFav(id, currentUser) {
    const token = currentUser.auth.currentUser.accessToken;
    return async function(dispatch) {
        try {
            const favs = await axios.put(`/api/private/favs`,{
                userId: currentUser.uid,
                productId: id
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({type: GET_FAVS, payload: favs.data.data.favs})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function delFav(id, currentUser) {
    const token = currentUser.auth.currentUser.accessToken;
    return async function(dispatch) {
        try {
            const favs = await axios.put(`/api/private/favs/delete`,{
                userId: currentUser.uid,
                productId: id
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({type: GET_FAVS, payload: favs.data.data.favs})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function getFavsDetails(currentUser) {
    const token = currentUser.auth.currentUser.accessToken;
    return async function(dispatch) {
        try {
            dispatch({type: LOADING_ON})
            const favs = await axios.get(`/api/private/favs/detail/${currentUser.uid}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({type: GET_FAV_DETAIL, payload: favs.data.data.favs})
            dispatch({type: LOADING_OFF})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function delFavDetail(id, currentUser) {
    const token = currentUser.auth.currentUser.accessToken;
    return async function(dispatch) {
        try {
            const favs = await axios.put(`/api/private/favs/delete/detail`,{
                userId: currentUser.uid,
                productId: id
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            dispatch({type: GET_FAV_DETAIL, payload: favs.data.data.favs})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}