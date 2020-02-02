import { ProductModel } from "../models/ProductModel";
import { ActionType } from "./groceryActions";
import { selectProduct, selectCartItem } from "./gorcerySelector";
import { GroceryState } from "../models/StateModel";




export const initialState: GroceryState = {
    products: {
      items: {
        allIds: [],
        favoriteIds: [],
        byId: {},
      },
      page: 0
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
        case ActionType.FetchFavoriteProducts:
        case ActionType.FetchProducts: {
            return {
              ...state,
              error: '',
              loadingData: true
            };
        }
        case ActionType.FetchProductsSuccess: {
            const products = action.payload as ProductModel[];
            
            for (const product of products) {
              if (state.products.items.favoriteIds.every(p => p !== product.id)) {
                state.products.items.allIds.push(product.id);
                state.products.items.byId[product.id] = product;

                if (product.favorite) {
                  state.products.items.favoriteIds.push(product.id);
                }
              }
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
        case ActionType.FetchFavoriteProductsSuccess: {
          const products = action.payload as ProductModel[];
          
          for (const product of products) {
            if (state.products.items.favoriteIds.every(p => p !== product.id)) {
              state.products.items.favoriteIds.push(product.id);
              state.products.items.allIds.push(product.id);
              state.products.items.byId[product.id] = product;
            }
          }

          return {
            ...state
          };
        }
        case ActionType.FetchFavoriteProductsError:
        case ActionType.FetchProductsError: {
          return {
            ...state,
            loadingData: false,
            error: action.payload
          };
        }
        case ActionType.RemoveOneProductUnitFromCart: {
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
        case ActionType.AddOneProductUnitToCart: {
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
              totalPrice: 0
            }

            state.cart.items.allIds.push(productId);
            state.cart.items.byId[productId] = cartItem;
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
        case ActionType.SetProductAsFavorite: {
          const productId = action.payload as string;
          const product = selectProduct(state, productId);
          if (!product) {
            return state;
          }
          state.products.items.favoriteIds.push(product.id);
          product.favorite = 1;

          return {
            ...state,
          };
        }
        case ActionType.SetProductAsNotFavorite: {
          const productId = action.payload as string;
          const product = selectProduct(state, productId);
          if (!product) {
            return state;
          }
          product.favorite = 0;
          state.products.items.favoriteIds = state.products.items.favoriteIds.filter(i => i !== productId);


          return {
            ...state,
          };
        }
        default:
            return state;
    }
};

