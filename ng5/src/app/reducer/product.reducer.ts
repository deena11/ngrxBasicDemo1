import {Action} from '@ngrx/store'
import {Product} from './../models/product.model'
import * as ProductActios from './../actions/product.action'

 const initialState: Product = {
    
        "id":1,
        "name":"Samsung A10",
        "type":"mobile",
        "subType":"gadgets",
        "quantity":250,
        "price":10999
    
}

export function reducer(state: Product[]=[initialState],action: ProductActios.Actions){
    switch(action.type){
        case ProductActios.ADD_PRODUCT:
            return  [...state,action.payload];
        case ProductActios.UPDATE_PRODUCT:
            state = state.filter((element) => element.id != action.payload.id);
            
            return [...state,action.payload];
         case ProductActios.REMOVE_PRODUCT:
            state = state.filter((el, index) => index != action.payload);
            return state;
        default:
            return state;
    }
}

