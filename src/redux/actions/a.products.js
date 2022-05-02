import axios from "axios";
import { SET_ALERT, GET_ALL_PRODUCTS, LOADING_ON, LOADING_OFF, ERRORS, MESSAGE, GET_PROTUCT_BY_NAME, GET_PRODUCT_BY_ID, GET_PRODUCT_BY_SELLER_AND_CAT, RESET_SLIDERS, ORDER, FILTER_BY_PRICE, RESET_FILTER_BY_PRICE, ACTIVE_SELLER, ACTIVE_CATEGORY, POST_REVIEW, ORDER_FILTERED, GET_PRODUCTS_OF_SELLER } from "./ctes";


export function getAllProducts() {
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            const products = await axios.get('/api/public/products');
            dispatch({ type: MESSAGE, payload: products.data.msg })
            dispatch({ type: GET_ALL_PRODUCTS, payload: products.data.data })
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }
    }
}

export function getProductByName(name) {
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            const products = await axios.get(`/api/public/products?name=${name}`);
            dispatch({ type: MESSAGE, payload: products.data.msg });
            dispatch({ type: GET_PROTUCT_BY_NAME, payload: products.data.data })
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }
    }
}

export function getProductById(id) {
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            const product = await axios.get(`/api/public/product/${id}`);
            dispatch({ type: MESSAGE, payload: product.data.msg });
            dispatch({ type: GET_PRODUCT_BY_ID, payload: product.data.data });
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg });
        }
    }
}

export function filterBySellerAndCategories(id, idcategories) {
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            let result
            idcategories ? result = await axios.get(`/api/public/filter?id=${id}&categories=${idcategories}`) :
                result = await axios.get(`/api/public/filter?id=${id}`);
            dispatch({ type: MESSAGE, payload: result.data.msg })
            dispatch({ type: GET_PRODUCT_BY_SELLER_AND_CAT, payload: result.data.data })
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }
    }
}

export function deleteProduct(id, currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            const result = await axios.put(`/api/private/product/deleted/${id}`,null, {
                headers:{
                    'Authorization': `Bearer ${token}`
                  }
            });
            dispatch({ type: SET_ALERT, payload: result.data.msg })
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }
    }
}

export function disableProduct(id, currentUser) {
    console.log(id, currentUser)
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            const result = await axios.put(`/api/private/product/disable/${id}`,null, {
                headers:{
                    'Authorization': `Bearer ${token}`
                  }
            });
            dispatch({ type: SET_ALERT, payload: result.data.msg })
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }
    }
}

export function enableProduct(id, currentUser) {
    console.log(id, currentUser)
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            const result = await axios.put(`/api/private/product/enable/${id}`,null, {
                headers:{
                    'Authorization': `Bearer ${token}`
                  }
            });
            dispatch({ type: SET_ALERT, payload: result.data.msg })
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }
    }
}

export function resetSliders() {
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            dispatch({ type: MESSAGE })
            dispatch({ type: RESET_SLIDERS })
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }
    }
}
export function ordenamientos(payload) {
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            dispatch({ type: MESSAGE })
            dispatch({ type: ORDER, payload })
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }
    }
}
export function ordenamientosFiltered(payload) {
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            dispatch({ type: MESSAGE })
            dispatch({ type: ORDER_FILTERED, payload })
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }
    }
}
export function filterByPrice(payload) {
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            dispatch({ type: MESSAGE })
            dispatch({ type: FILTER_BY_PRICE, payload })
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }
    }
}
export function resetFilterByPrice() {
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            dispatch({ type: MESSAGE })
            dispatch({ type: RESET_FILTER_BY_PRICE })
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }
    }
}
export function idActiveSeller(id) {
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            dispatch({ type: MESSAGE })
            dispatch({ type: ACTIVE_SELLER, payload: id })
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }
    }
}
export function idActiveCategory(id) {
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            dispatch({ type: MESSAGE })
            dispatch({ type: ACTIVE_CATEGORY, payload: id })
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }
    }
}

export function createProductReview(productId, review, currentUser) {
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            dispatch({type: LOADING_ON});
            const response = await axios.post(`/api/public/product/${productId}/review/add`, review, {
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            });
            dispatch({ type: SET_ALERT, payload: response.data.msg })
            dispatch({ type: POST_REVIEW, payload: response.data.data })
            dispatch({type: GET_ALL_PRODUCTS,payload: response.data.data})
            dispatch({type: LOADING_OFF});
        } catch (err) {
            dispatch({ type: ERRORS, payload: err.msg })
        }

    }
}

export function GetAllProductsOfSeller(id, currentUser) {
    console.log(`GetAllProductsOfSeller`,id, currentUser)
    const token = currentUser.auth.currentUser.accessToken
    return async function (dispatch) {
        try {
            const response = await axios.get(`/api/private/productSeller/${id}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                  }
            });
            dispatch({ type: MESSAGE, payload: response.data.msg })
            dispatch({ type: GET_PRODUCTS_OF_SELLER, payload: response.data.data })
            dispatch({type: LOADING_OFF});
        } catch (error) {
            dispatch({ type: ERRORS, payload: error.msg })
        }
    }
}