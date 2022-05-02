import axios from 'axios';

import {SET_ALERT, ERRORS, MESSAGE, POST_ORDER, ADD_ORDER_CAR, DELETE_ORDER_CAR, PAYMENT, UDPATE_ORDER} from './ctes';

export function postOrder(currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const newOrder = await axios.post('/api/private/addOrder', {idUser: currentUser.uid}, {
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            });
            dispatch({type: SET_ALERT, payload: newOrder.data.msg});
            dispatch({type: POST_ORDER, payload: newOrder.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

//busca orden por id
export function getOrderById (id, currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch){
        try {
            const newOrder = await axios.get(`/api/private/sendOrder/${id}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            });
            dispatch({type: MESSAGE, payload: newOrder.data.msg});
            dispatch({type: POST_ORDER, payload: newOrder.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

// export function addOrderCar (item) {
//     return {   
//         type: ADD_ORDER_CAR,
//         payload: item
//     } 
    // async function (dispatch){
    //     try {
    //         const orderCar = await axios.get(``);
    //         dispatch({type: MESSAGE, payload: newOrder.data.msg});
    //         dispatch({type: POST_ORDER, payload: newOrder.data.data})
    //     } catch (err) {
    //         dispatch({type: ERRORS, payload: err.msg})
    //     }
    // }
// }
// export function deleteOrderCar (id) {
//     return {   
//         type: DELETE_ORDER_CAR,
//         payload: id
//     } 
    // async function (dispatch){
    //     try {
    //         const orderCar = await axios.get(``);
    //         dispatch({type: MESSAGE, payload: newOrder.data.msg});
    //         dispatch({type: POST_ORDER, payload: newOrder.data.data})
    //     } catch (err) {
    //         dispatch({type: ERRORS, payload: err.msg})
    //     }
    // }
// }

export function payment(data){
    return {
        type: PAYMENT,
        payload: data
    }
}

export function UpdateOrder(cart, status, currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const response = await axios.put(`api/private/updateOrder`, {idOrder: cart._id, status: status}, {
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            });
            dispatch({ type: UDPATE_ORDER, payload: response.data.data })
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }

    }
}