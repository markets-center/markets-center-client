import axios from "axios";
import { GET_ALL_PRODUCTS, ERRORS, MESSAGE, GET_PROTUCT_BY_NAME, GET_PRODUCT_BY_ID } from "./ctes";


export function getAllProducts(){
    return async function (dispatch) {
        try {
            const products = await axios.get('http://localhost:4000/api/public/products');
            dispatch({type: MESSAGE, payload: products.msg})
            dispatch({type: GET_ALL_PRODUCTS, payload: products.data})
        } catch (err) {
            dispatch({type: ERRORS, payload:err.data.msg})
        }
    }
}

export function getProductByName(name) {
    return async function (dispatch) {
        try {
            const products = await axios.get(`http://localhost:4000/api/public/products&name=${name}`);
            dispatch({type: MESSAGE, payload: products.msg});
            dispatch({type: GET_PROTUCT_BY_NAME, payload: products.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.data.msg})
        }
    }
}

export function getProductById (id) {
    return async function (dispatch) {
        try {
            const product = await axios.get(`http://localhost:4000/api/public/product/${id}`);
            dispatch({type: MESSAGE, payload:product.msg});
            dispatch({type: GET_PRODUCT_BY_ID, payload: product.data});
        } catch (err) {
            dispatch({type: ERRORS, payload: err.data.msg});
        }
    }
}

export function deleteProduct (id) {
    return async function (dispatch) {
        try {
            const result = await axios.delete(`http://localhost:4000/api/public/product/${id}`);
            dispatch({type: MESSAGE, payload: result.msg})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.data.msg})
        }
    }
}
