import { ProductModel } from "./ProductModel";
import { CartModel } from "./CartItemModel";

export interface NormalizedObjects<T> {
    byId: { [id: string]: T };
    allIds: string[];
}

export interface ProductsState {
    items: NormalizedObjects<ProductModel>,
    page: number
}


export interface GroceryState {
    products: ProductsState,
    cart: CartModel,
    loadingData: boolean,
    error: string
}