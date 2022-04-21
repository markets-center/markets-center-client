import axios from "axios";
import { GET_ALL_PRODUCTS, ERRORS, MESSAGE, GET_PROTUCT_BY_NAME, GET_PRODUCT_BY_ID, GET_PRODUCT_BY_SELLER, RESET_SLIDERS, ORDER_BY_PRICE, ORDER_BY_ALPH, FILTER_BY_PRICE } from "./ctes";


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
            const products = await axios.get(`http://localhost:4000/api/public/products?name=${name}`);
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
            const result = await axios.get(`http://localhost:4000/api/public/filter/bySeller/${id}`);
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

export function resetSliders () {
    return async function (dispatch) {
        try {
            dispatch({type: MESSAGE})
            dispatch({type: RESET_SLIDERS})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}
export function orderByPrice (payload) {
    return async function (dispatch) {
        try {
            dispatch({type: MESSAGE})
            dispatch({type: ORDER_BY_PRICE, payload})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}
export function orderByAlph (payload) {
    return async function (dispatch) {
        try {
            dispatch({type: MESSAGE})
            dispatch({type: ORDER_BY_ALPH, payload})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}
export function filterByPrice (payload) {
    return async function (dispatch) {
        try {
            dispatch({type: MESSAGE})
            dispatch({type: FILTER_BY_PRICE, payload})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}
