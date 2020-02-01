import { ProductModel } from "./ProductModel";
import { CartModel } from "./CartItemModel";

export interface NormalizedObjects<T> {
    byId: { [id: string]: T };
    allIds: string[];
}


export interface GroceryState {
    products: NormalizedObjects<ProductModel>,
    cart: CartModel,
    loadingData: boolean,
    error: string
}