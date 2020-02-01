import { ProductModel } from "../models/ProductModel";
import { GroceryState } from "../models/StateModel";
import { CartItemModel } from "../models/CartItemModel";

export const selectProduct = (state: GroceryState, productId: string) : ProductModel | null => {
    return state.products.items.byId[productId];
}

export const selectCartItem = (state: GroceryState, productId: string) : CartItemModel | null => {
    return state.cart.items.byId[productId];
}
