interface MarketState {
    state: string[]
};

type Action = {type: "GET_PRODUCTS", payload: string};

const initialState = {
    state: []
}


export default function rootReducer(state: MarketState = initialState, action: Action){
    switch(action.payload){
        case "GET_PRODUCTS":
            return state
        default:
            return state
    }
 }