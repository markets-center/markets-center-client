

export function order(payload,state){
    let sorted = state
    if(payload === 'low'){
        state.sort(function(a,b){
            if(a.price > b.price){
                return 1;
            }
            if(b.price > a.price){
                return -1;
            }
            return 0;
        })
    }
    if(payload === 'high'){
        state.sort(function(a,b){
            if(a.price > b.price){
                return -1;
            }
            if(b.price > a.price){
                return 1;
            }
            return 0;
        }) 
    }  
    if(payload === 'a-z'){
        state.sort(function(a,b){
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return 1;
            }
            if(b.name.toLowerCase() > a.name.toLowerCase()){
                return -1;
            }
            return 0;
        })
    }
    if(payload === 'z-a'){
        state.sort(function(a,b){
            if(a.name.toLowerCase() > b.name.toLowerCase()){
                return -1;
            }
            if(b.name.toLowerCase() > a.name.toLowerCase()){
                return 1;
            }
            return 0;
        })
    }
    return sorted
}

export function filterByPrice(payload,state){
    let filter= [];

    if(payload === '0-500'){
        filter = state.filter(s=> s.price >= '0' && s.price < '5');
        if(!filter.length){
            alert('No se encuentra productos con en este rango')
       }
        return filter;
    }
    if(payload === '500-1500'){
        filter = state.filter(s=> s.price >= '5' && s.price < '15');
        if(!filter.length){
            alert('No se encuentra productos con en este rango')
       }
        return filter;
    }
    if(payload === '1500-3000'){
        filter = state.filter(s=> s.price >= '15' && s.price < '30');
        if(!filter.length){
            alert('No se encuentra productos con en este rango')
       }
        return filter;
    }
    if(payload === '>3000'){
        filter = state.filter(s=> s.price >= '30');
        if(!filter.length){
             alert('No se encuentra productos con en este rango')
        }
        return filter;
    }

    return filter;

    

    
}