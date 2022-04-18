import {ERRORS, GET_ALL_PRODUCTS, GET_ALL_SELLERS, GET_ALL_CATEGORIES, MESSAGE, POST_PRODUCT, UPDATE_PRODUCT, GET_PROTUCT_BY_NAME, GET_PRODUCT_BY_ID, ADMIN_UPDATE_ADD_CATEGORY, GET_ALL_USERS, UPDATE_USER, POST_ORDER, GET_PRODUCT_BY_SELLER} from '../actions/ctes'

const initialState = {
    allProducts: [], //aqui van los productos con todos los detalles
    addedProduct:{},
    searchedProducts: [], //no se si lo prefieren aqui o que lo guarde en allProducts
    allCategories: [],
    newCategory:{},
    allSellers: [],
    allUsers:[],
    oneUser:{},
    newOrder:{},
    errors: '',
    message: ''
}
export default function rootReducer(state = initialState, action){
    switch(action.type){
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
                oneUser: {...action.payload[0]}
            }
        case POST_ORDER:
            return {
                ...state,
               newOrder: action.payload 
            }
        default:
            return {
                ...state
            }
    }
 }