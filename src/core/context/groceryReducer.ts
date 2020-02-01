import { ProductModel } from "../models/ProductModel";

import { Action } from "redux";
import { ActionType } from "./groceryActions";
import { CartItemModel, CartModel } from "../models/CartItemModel";


export interface GroceryState {
    products: ProductModel[],
    cart: CartModel,
    loadingData: boolean,
    error: string
}

export const initialState: GroceryState = {
    products: [],
    cart: {
      items: [],
      totalPrice: 0
    },
    loadingData: false,
    error: ''
};

export interface DispatchAction extends Action {
    payload: any;
}


export const groceryReducer = (state = initialState, action: DispatchAction) => {
    console.log("ACTION DISPATCHED", action);
    switch (action.type) {
        case ActionType.FetchProducts: {
            return {
              ...state,
              error: '',
              loadingData: true
            };
        }
        case ActionType.FetchProductsSuccess: {
            return {
              ...state,
              products: [
                ...action.payload
              ],
              loadingData: false
            };
        }
        case ActionType.FetchProductsError: {
          return {
            ...state,
            loadingData: false,
            error: action.payload
          };
        }
        case ActionType.AddToCart: {
          let cartItem = state.cart.items.find(c => c.product.id === action.payload.id);
          if (!cartItem) {
            cartItem = {
              product: action.payload,
              quantity: 0, 
              totalPrice: action.payload.price
            }

            state.cart.items = [
              ...state.cart.items,
              cartItem
            ]

          } 
          cartItem.quantity++;
          cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
          
          return {
            ...state,
            cart: {
              items: state.cart.items,
              totalPrice: state.cart.totalPrice + cartItem.product.price
            }
          }
        }
        default:
            return state;
    }
};

