
export function isEmpty(obj){
    let empty = true;
    for(key in obj){
        empty = false;
        break;
    };
    return empty;
}
export function calculateKeyValues(obj){
    let sum = 0;
    for(key in obj){
        sum += obj[key] ;
    }
    obj.sum = sum;
    return obj;
}
export function multiplyKeyValues(obj){
    for(key in obj){
        if(isFinite(obj[key])){
            obj[key] *= 2;
        }
    }
    return obj;
}
