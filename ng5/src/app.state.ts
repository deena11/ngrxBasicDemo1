import {Product} from './app/models/product.model'

export interface AppState{
    readonly product: Product[];
}