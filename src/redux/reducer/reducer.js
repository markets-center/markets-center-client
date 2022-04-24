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
<<<<<<< HEAD
    GET_USER_HISTORY,
    ORDER,
    ACTIVE_SELLER,
    ACTIVE_CATEGORY,
    FILTER_BY_PRICE,
    RESET_FILTER_BY_PRICE,
    ADD_ORDER_CAR,
    DELETE_ORDER_CAR,
    LOADING
=======
    GET_USER_HISTORY
>>>>>>> parent of bd7eb33... Changes at Loading and Error component
} from '../actions/ctes'


const initialState = {
    allProducts: [], //aqui van los productos con todos los detalles
    addedProduct: {},
    searchedProducts: [], //no se si lo prefieren aqui o que lo guarde en allProducts // Esta Perfecto :D
    allCategories: [],
    newCategory: {},
    allSellers: [],
    allUsers:[],
    oneUser:{},
    history:[],
    newOrder:{},
    errors: '',
<<<<<<< HEAD
    message: '',
    addOrdercar:[],
    loading: false
=======
    message: ''
>>>>>>> parent of bd7eb33... Changes at Loading and Error component
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
<<<<<<< HEAD
                searchedProducts: action.payload,
                productsBySeller: action.payload,
                searchedProducts: action.payload,
                loading: false
=======
                searchedProducts: action.payload
>>>>>>> parent of bd7eb33... Changes at Loading and Error component
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
<<<<<<< HEAD
                searchedProducts: state.allProducts,
                loading: false
            }
        case ADD_ORDER_CAR:
            return {
                ...state,
                addOrdercar: [...state.addOrdercar, action.payload]
            }
        case DELETE_ORDER_CAR:
            return {
                ...state,
                addOrdercar: state.addOrdercar.filter((f) => f.id !== action.payload)
            }
        case ORDER:
            let orden = order(action.payload, state.searchedProducts);
            return{
                ...state,
                searchedProducts: orden
            }
        case FILTER_BY_PRICE:
            let filter = filterByPrice(action.payload,state.searchedProducts)
            return{
                ...state,
                filteredByPrice: filter,
                loading: false
            }                    
        case RESET_FILTER_BY_PRICE:
            return{
                ...state,
                filteredByPrice: [],
                loading: false
            }    
        case ACTIVE_SELLER:
            return{
                ...state,
                activeSeller: action.payload
            }
        case ACTIVE_CATEGORY:
            return{
                ...state,
                activeCategory: action.payload
=======
                searchedProducts: state.allProducts

>>>>>>> parent of bd7eb33... Changes at Loading and Error component
            }
        default:
            return {
                ...state
            }
    }
}