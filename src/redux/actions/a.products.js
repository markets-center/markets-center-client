import axios from "axios";
import { GET_ALL_PRODUCTS, ERRORS, MESSAGE, GET_PROTUCT_BY_NAME, GET_PRODUCT_BY_ID, GET_PRODUCT_BY_SELLER_AND_CAT, RESET_SLIDERS, ORDER, FILTER_BY_PRICE, RESET_FILTER_BY_PRICE, ACTIVE_SELLER, ACTIVE_CATEGORY } from "./ctes";


export function getAllProducts(){
    return async function (dispatch) {
        try {
            const products = await axios.get('/api/public/products');
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
            const products = await axios.get(`/api/public/products?name=${name}`);
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
            const product = await axios.get(`/api/public/product/${id}`);
            dispatch({type: MESSAGE, payload:product.data.msg});
            dispatch({type: GET_PRODUCT_BY_ID, payload: product.data.data});
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg});
        }
    }
}

export function filterBySellerAndCategories (id, idcategories) {
    return async function (dispatch) {
        try {
            const result = await axios.get(`/api/public/filter?id=${id}&categories=${idcategories}`);
            dispatch({type: MESSAGE, payload: result.data.msg})
            dispatch({type: GET_PRODUCT_BY_SELLER_AND_CAT, payload: result.data.data})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}

export function deleteProduct (id) {
    return async function (dispatch) {
        try {
            const result = await axios.delete(`/api/public/product/${id}`);
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
export function ordenamientos (payload) {
    return async function (dispatch) {
        try {
            dispatch({type: MESSAGE})
            dispatch({type: ORDER, payload})
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
export function resetFilterByPrice (){
    return async function (dispatch){
        try {
            dispatch({type: MESSAGE})
            dispatch({type: RESET_FILTER_BY_PRICE})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}
export function idActiveSeller(id){
    return async function (dispatch){
        try {
            dispatch({type: MESSAGE})
            dispatch({type: ACTIVE_SELLER, payload: id})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}
export function idActiveCategory(id){
    return async function (dispatch){
        try {
            dispatch({type: MESSAGE})
            dispatch({type: ACTIVE_CATEGORY, payload: id})
        } catch (err) {
            dispatch({type: ERRORS, payload: err.msg})
        }
    }
}
