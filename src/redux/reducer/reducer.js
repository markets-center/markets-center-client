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
    GET_PRODUCT_BY_SELLER_AND_CAT,
    GET_PRODUCT_BY_SELLER,
    RESET_SLIDERS,
    GET_PRODUCT_BY_CATEGORY,
    GET_USER_HISTORY,
    ORDER,
    PAYMENT,
    ACTIVE_SELLER,
    ACTIVE_CATEGORY,
    FILTER_BY_PRICE,
    RESET_FILTER_BY_PRICE,
    GET_ALL_ORDERS_OF_SELLER,
    ADD_ORDER_CAR,
    DELETE_ORDER_CAR,
    LOADING_ON,
    LOADING_OFF,
    SET_ALERT,
    DEL_ALERT,
    POST_REVIEW,
    UDPATE_ORDER,
    EMPTY_CART,
    GET_OR_UPDATE_CART,
    DEL_ONE_USER,
    ORDER_FILTERED,
    GET_FAVS,
    GET_FAV_DETAIL,
    GET_ALL_ORDERS,
    GET_ALL_CATEGORIES_ADMIN,
    GET_PRODUCTS_OF_SELLER

} from '../actions/ctes'

import { order, filterByPrice } from '../functions/functions'


const initialState = {
    allProducts: [], //aqui van los productos con todos los detalles
    addedProduct: {},
    searchedProducts: [], //no se si lo prefieren aqui o que lo guarde en allProducts
    productsBySeller: [],
    allProductsSeller: [],
    filteredByPrice: [],
    allCategories: [],
    adminCategories: [],
    newCategory: {},
    allSellers: [],
    allUsers: [],
    oneUser: {},
    history: [],
    newOrder: {},
    activeSeller: '',
    activeCategory: '',
    errors: '',
    message: '',
    addOrdercar: {},
    loading: false,
    alert: '',
    payment: [],
    review: [],
    favs:[],
    favsDetail:[],
    offerArray: []
}
export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case LOADING_ON:
            return {
                ...state,
                loading: true
            }
        case LOADING_OFF:
            return {
                ...state,
                loading: false
            }
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload,
            }
        case GET_PRODUCTS_OF_SELLER:
            return {
                ...state,
                allProductsSeller: action.payload
            }
        case POST_PRODUCT:
            return {
                ...state,
                addedProduct: action.payload,
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                addedProduct: action.payload,
                productsBySeller: action.payload
            }
        case GET_PROTUCT_BY_NAME:
            return {
                ...state,
                searchedProducts: action.payload,
            }
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                searchedProducts: action.payload,
            }
        case GET_PRODUCT_BY_SELLER_AND_CAT:
            return {
                ...state,
                productsBySeller: action.payload,
                searchedProducts: action.payload,
                offerArray: action.payload,
                filteredByPrice: [],
                loading: false,
            }
        case GET_PRODUCT_BY_SELLER:
            return {
                ...state,
                offerArray: action.payload,
                loading: false,
            }
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                allCategories: action.payload,
            }
        case GET_ALL_CATEGORIES_ADMIN:
            return {
                ...state,
                adminCategories: action.payload
            }
        case GET_ALL_SELLERS:
            return {
                ...state,
                allSellers: action.payload,
            }
        case GET_PRODUCT_BY_CATEGORY:
            return {
                ...state,
                searchedProducts: action.payload,
            }
        case ERRORS:
            return {
                ...state,
                errors: action.payload,
            }
        case MESSAGE:
            return {
                ...state,
                message: action.payload,
            }
        case ADMIN_UPDATE_ADD_CATEGORY:
            return {
                ...state,
                newCategory: action.payload
            }
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload,
            }
        case UPDATE_USER:
            return {
                ...state,
                oneUser: { ...action.payload }
            }
        case DEL_ONE_USER:
            return {
                ...state,
                oneUser: ''
            }
        case POST_ORDER:
            return {
                ...state,
                newOrder: action.payload
            }

        case PAYMENT:
            return {
                ...state,
                payment: [...state.payment, action.payload]
            }

        case GET_USER_HISTORY:
            return {
                ...state,
                history: action.payload,
            }
        case GET_ALL_ORDERS_OF_SELLER:
            return {
                ...state,
                history: action.payload,
            }
        case GET_ALL_ORDERS:
            return {
                ...state,
                history: action.payload
            }
        case RESET_SLIDERS:
            return {
                ...state,
                searchedProducts: state.allProducts

            }
        case ADD_ORDER_CAR:
            return {
                ...state,
                addOrdercar: [...state.addOrdercar, action.payload],
                alert: 'Producto agregado correctamente'
            }
        case DELETE_ORDER_CAR:
            return {
                ...state,
                addOrdercar: state.addOrdercar.filter((f) => f.id !== action.payload)
            }
        case ORDER:
            let orden = order(action.payload, state.searchedProducts);
            return {
                ...state,
                searchedProducts: orden
            }
        case ORDER_FILTERED:
            let ordenfiltered = order(action.payload, state.filteredByPrice);
            return {
                ...state,
                filteredByPrice: ordenfiltered
            }
        case FILTER_BY_PRICE:
            let filter = filterByPrice(action.payload, state.searchedProducts)
            return {
                ...state,
                filteredByPrice: filter
            }
        case RESET_FILTER_BY_PRICE:
            return {
                ...state,
                filteredByPrice: []
            }
        case ACTIVE_SELLER:
            return {
                ...state,
                activeSeller: action.payload
            }
        case ACTIVE_CATEGORY:
            return {
                ...state,
                activeCategory: action.payload
            }
        case DEL_ALERT:
            return {
                ...state,
                alert: ''
            }
        case SET_ALERT:
            return {
                ...state,
                alert: action.payload
            }
        case POST_REVIEW:
            return {
                ...state,
                review: action.payload,
                alert: 'Reseña agregada correctamente'
            }
        case UDPATE_ORDER:
            return {
                ...state,
                newOrder: action.payload
            }
        case EMPTY_CART:
            return {
                ...state,
                addOrdercar: action.payload
            }
        case GET_OR_UPDATE_CART:
            return {
                ...state,
                addOrdercar: action.payload
            }
        case GET_FAVS:
            return {
                ...state,
                favs: action.payload
            }
        case GET_FAV_DETAIL:
            return {
                ...state,
                favsDetail: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

