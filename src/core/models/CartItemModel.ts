import { ProductModel } from "./ProductModel";

export interface CartModel {
    items: CartItemModel[],
    totalPrice: number
}

export interface CartItemModel {
    product: ProductModel,
    quantity: number, 
    totalPrice: number
}