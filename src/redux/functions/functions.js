

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

export function filterByPrice(payload,state){
    let filter= [];

    if(payload === '0-500'){
        filter = state.filter(s=> s.price >= '0' && s.price < '500');
        return filter;
    }
    if(payload === '500-1500'){
        filter = state.filter(s=> s.price >= '500' && s.price < '1500');
        return filter;
    }
    if(payload === '1500-3000'){
        filter = state.filter(s=> s.price >= '1500' && s.price < '3000');
        return filter;
    }
    if(payload === '>3000'){
        filter = state.filter(s=> s.price >= '3000');
        return filter;
    }
    return state;

    

    
}