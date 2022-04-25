import axios from 'axios';

import {ERRORS, MESSAGE, POST_ORDER, ADD_ORDER_CAR, DELETE_ORDER_CAR, PAYMENT} from './ctes';

export function postOrder(order) {
    return async function (dispatch) {
        try {
            const newOrder = await axios.post('/api/private/addOrder', order);
            dispatch({type: MESSAGE, payload: newOrder.data.msg});
            dispatch({type: POST_ORDER, payload: newOrder.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

//busca orden por id
export function getOrderById (id) {
    return async function (dispatch){
        try {
            const newOrder = await axios.get(`/api/private/sendOrder/${id}`);
            dispatch({type: MESSAGE, payload: newOrder.data.msg});
            dispatch({type: POST_ORDER, payload: newOrder.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function addOrderCar (item) {
    return {   
        type: ADD_ORDER_CAR,
        payload: item
    } 
    // async function (dispatch){
    //     try {
    //         const orderCar = await axios.get(``);
    //         dispatch({type: MESSAGE, payload: newOrder.data.msg});
    //         dispatch({type: POST_ORDER, payload: newOrder.data.data})
    //     } catch (err) {
    //         dispatch({type: ERRORS, payload: err.msg})
    //     }
    // }
}
export function deleteOrderCar (id) {
    return {   
        type: DELETE_ORDER_CAR,
        payload: id
    } 
    // async function (dispatch){
    //     try {
    //         const orderCar = await axios.get(``);
    //         dispatch({type: MESSAGE, payload: newOrder.data.msg});
    //         dispatch({type: POST_ORDER, payload: newOrder.data.data})
    //     } catch (err) {
    //         dispatch({type: ERRORS, payload: err.msg})
    //     }
    // }
}

export function payment(data){
    return {
        type: PAYMENT,
        payload: data
    }
}