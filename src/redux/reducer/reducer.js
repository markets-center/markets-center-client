import {
    ERRORS,
    GET_ALL_PRODUCTS,
    GET_ALL_SELLERS,
    GET_ALL_CATEGORIES,
    MESSAGE,
    POST_PRODUCT,
    UPDATE_PRODUCT,
    GET_PROTUCT_BY_NAME,
    GET_PRODUCT_BY_ID,
    ADMIN_UPDATE_ADD_CATEGORY,
    GET_ALL_USERS,
    UPDATE_USER,
    POST_ORDER,
    GET_PRODUCT_BY_SELLER,
    RESET_SLIDERS,
    GET_PRODUCT_BY_CATEGORY,
    GET_USER_HISTORY,
    ORDER_BY_PRICE,
    ORDER_BY_ALPH
} from '../actions/ctes'

import { orderByPrice, orderByAlph } from '../functions/functions'


const initialState = {
    allProducts: [], //aqui van los productos con todos los detalles
    addedProduct:{},
    searchedProducts: [], //no se si lo prefieren aqui o que lo guarde en allProducts
    productsBySeller: [],
    allCategories: [],
    newCategory: {},
    allSellers: [],
    allUsers:[],
    oneUser:{},
    history:[],
    newOrder:{},
    errors: '',
    message: ''
}
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload
            }
        case POST_PRODUCT:
            return {
                ...state,
                addedProduct: action.payload
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                addedProduct: action.payload
            }
        case GET_PROTUCT_BY_NAME:
            return {
                ...state,
                searchedProducts: action.payload
            }
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                searchedProducts: action.payload
            }
        case GET_PRODUCT_BY_SELLER:
            return {
                ...state,
                searchedProducts: action.payload
            }
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                allCategories: action.payload
            }
        case GET_ALL_SELLERS:
            return {
                ...state,
                allSellers: action.payload
            }
        case GET_PRODUCT_BY_CATEGORY:
            return {
                ...state,
                searchedProducts: action.payload
            }
        case ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        case MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        case ADMIN_UPDATE_ADD_CATEGORY:
            return {
                ...state,
                newCategory: action.payload
            }
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                oneUser: { ...action.payload }
            }
        case POST_ORDER:
            return {
                ...state,
                newOrder: action.payload
            }

        case GET_USER_HISTORY:
            return {
                ...state,
                history: action.payload
            }
        case RESET_SLIDERS:
            return {
                ...state,
                searchedProducts: state.allProducts

            }
        case ORDER_BY_PRICE:
            let orden = orderByPrice(action.payload, state.searchedProducts);
            console.log(orden)
            return{
                ...state,
                searchedProducts: orden
            }
        case ORDER_BY_ALPH:
            let ordenAlph = orderByAlph(action.payload, state.searchedProducts);
            console.log(ordenAlph)
            return{
                ...state,
                searchedProducts: ordenAlph
            }
        default:
            return {
                ...state
            }
    }
}