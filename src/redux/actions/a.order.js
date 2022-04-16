import axios from 'axios';

import {ERRORS, MESSAGE, POST_ORDER} from './ctes';

export function postOrder(order) {
    return async function (dispatch) {
        try {
            const newOrder = await axios.post('http://localhost:5000/api/private/addOrder', order);
            dispatch({type: MESSAGE, payload: newOrder.msg});
            dispatch({type: POST_ORDER, payload: newOrder.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

//busca orden por id
export function getOrderById (id) {
    return async function (dispatch){
        try {
            const newOrder = await axios.get(`http://localhost:5000/api/private/sendOrder/${id}`);
            dispatch({type: MESSAGE, payload: newOrder.msg});
            dispatch({type: POST_ORDER, payload: newOrder.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}