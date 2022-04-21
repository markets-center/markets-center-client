

export function orderByPrice(payload, state){
    let sorted = payload === 'low' ?
            state.sort(function(a,b){
                if(a.price > b.price){
                    return 1;
                }
                if(b.price > a.price){
                    return -1;
                }
                return 0;
            }) :
            state.sort(function(a,b){
                if(a.price > b.price){
                    return -1;
                }
                if(b.price > a.price){
                    return 1;
                }
                return 0;
            })
    return sorted
}
export function orderByAlph(payload,state){
    let sortedArr = payload === 'a-z' ?
            state.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return -1;
                }
                return 0;
            }) :
            state.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return 1;
                }
                return 0;
            })
    return sortedArr
}