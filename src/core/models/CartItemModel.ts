import { NormalizedObjects } from "./StateModel";

export interface CartModel {
    items: NormalizedObjects<CartItemModel>,
    totalPrice: number
}

export interface CartItemModel {
    productId: string,
    quantity: number, 
    totalPrice: number
}