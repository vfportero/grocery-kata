import { ProductModel } from "../models/ProductModel";
import { ActionType } from "./groceryActions";
import { selectProduct, selectCartItem } from "./gorcerySelector";
import { GroceryState } from "../models/StateModel";




export const initialState: GroceryState = {
    products: {
      items: {
        allIds: [],
        byId: {},
      },
      page: 1
    },
    cart: {
      items: {
        allIds: [],
        byId: {}  
      },
      totalPrice: 0
    },
    loadingData: false,
    error: ''
};

export interface DispatchAction {
  type: ActionType
  payload: any;
}


export const groceryReducer = (state: GroceryState = initialState, action: DispatchAction) => {
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
            const products = action.payload as ProductModel[];
            
            state.products.page++;
            for (const product of products) {
              state.products.items.allIds.push(product.id);
              state.products.items.byId[product.id] = product;
            }

            return {
              ...state,
              products: {
                page: state.products.page + 1,
                items: state.products.items
              },
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
          const productId = action.payload as string;
          const product = selectProduct(state, productId);

          if (!product || product.stock <= 0) {
            return state;
          }
          let cartItem = selectCartItem(state, productId);
          if (!cartItem) {
            cartItem = {
              productId,
              quantity: 0,
              totalPrice: product.price
            }

            state.cart.items.allIds.push(productId);
            state.cart.items.byId[productId] = cartItem;
          }

          cartItem.quantity++;
          cartItem.totalPrice = cartItem.quantity * product.price;
          product.stock --;
          
          
          return {
            ...state,
            cart: {
              items: state.cart.items,
              totalPrice: state.cart.totalPrice + product.price
            }
          }
        }
        case ActionType.RemoveOneUnitFromCart: {
          const productId = action.payload as string;
          const cartItem = selectCartItem(state, productId);
          const product = selectProduct(state, productId);
          if (!cartItem || !product) {
            return state;
          }

          state.cart.totalPrice -= product.price;
          cartItem.totalPrice -= product.price;
          product.stock++;

          if (cartItem.quantity === 1) {
            delete state.cart.items.byId[productId];
            state.cart.items.allIds = state.cart.items.allIds.filter(i => i !== productId);
          } else {
            cartItem.quantity--;
          }

          return {
            ...state,
            cart: {
              ...state.cart
            }
          }
        }
        case ActionType.AddOneUnitFromCart: {
          const productId = action.payload as string;
          const cartItem = selectCartItem(state, productId);
          const product = selectProduct(state, productId);
          if (!cartItem || !product || product.stock <= 0) {
            return state;
          }

          state.cart.totalPrice += product.price;
          cartItem.totalPrice += product.price;
          product.stock--;
          cartItem.quantity++;

          return {
            ...state,
            cart: {
              ...state.cart
            }
          }
        }
        default:
            return state;
    }
};

