import axios from "axios";
import { GET_ALL_PRODUCTS, ERRORS, MESSAGE, GET_PROTUCT_BY_NAME, GET_PRODUCT_BY_ID, GET_PRODUCT_BY_SELLER } from "./ctes";


export function getAllProducts(){
    return async function (dispatch) {
        try {
            const products = await axios.get('http://localhost:4000/api/public/products');
            dispatch({type: MESSAGE, payload: products.data.msg})
            dispatch({type: GET_ALL_PRODUCTS, payload: products.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload:err.msg})
        }
    }
}

export function getProductByName(name) {
    return async function (dispatch) {
        try {
            const products = await axios.get(`http://localhost:4000/api/public/products&name=${name}`);
            dispatch({type: MESSAGE, payload: products.data.msg});
            dispatch({type: GET_PROTUCT_BY_NAME, payload: products.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function getProductById (id) {
    return async function (dispatch) {
        try {
            const product = await axios.get(`http://localhost:4000/api/public/product/${id}`);
            dispatch({type: MESSAGE, payload:product.data.msg});
            dispatch({type: GET_PRODUCT_BY_ID, payload: product.data.data});
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg});
        }
    }
}

export function productBySeller (id) {
    return async function (dispatch) {
        try {
            const result = await axios.delete(`http://localhost:4000/api/public/filter/bySeller/${id}`);
            dispatch({type: MESSAGE, payload: result.data.msg})
            dispatch({type: GET_PRODUCT_BY_SELLER, payload: result.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function deleteProduct (id) {
    return async function (dispatch) {
        try {
            const result = await axios.delete(`http://localhost:4000/api/public/product/${id}`);
            dispatch({type: MESSAGE, payload: result.data.msg})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}
