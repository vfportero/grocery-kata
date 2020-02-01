import ApiService from "../services/ApiService/ApiService";
import { ProductModel } from "../models/ProductModel";
import { DispatchAction } from "./groceryReducer";

export enum ActionType {
    FetchProducts = "FetchProducts",
    FetchProductsSuccess = "FetchProductsSuccess",
    FetchProductsError = "FetchProductsError",

    AddToCart = "AddToCart",
    RemoveOneUnitFromCart = "RemoveOneUnitFromCart",
    AddOneUnitFromCart = "AddOneUnitFromCart"
}

export interface GroceryActionsDispatcher {
    fetchProducts(): void;
    addToCart(product: ProductModel): void;
    removeOneUnitFromCart(productId: string): void;
    addOneUnitFromCart(productId: string): void;
};

export const fetchProductsSuccess = (products: ProductModel[]): DispatchAction => {
    return {
        type: ActionType.FetchProductsSuccess, 
        payload: products
    }
}

export const createActions = (dispatch: React.Dispatch<any>) : GroceryActionsDispatcher => {
    return {
        addToCart: (product: ProductModel) => {
            dispatch({ type: ActionType.AddToCart, payload: product.id })
        },
        removeOneUnitFromCart: (productId: string) => {
            dispatch({ type: ActionType.RemoveOneUnitFromCart, payload: productId })
        },
        addOneUnitFromCart: (productId: string) => {
            dispatch({ type: ActionType.AddOneUnitFromCart, payload: productId })
        },
        fetchProducts: () => {
            ApiService.getAllProducts().then(
                (apiResponse) => {
                    if (apiResponse.status === 200) {
                        dispatch({ type: ActionType.FetchProductsSuccess, payload: apiResponse.data })
                    } else {
                        dispatch({ type: ActionType.FetchProductsError, payload: apiResponse.statusText })
                    }
                    
                }
            );
            dispatch({ type: ActionType.FetchProducts })
        },
    };
  }
  
  export default createActions;