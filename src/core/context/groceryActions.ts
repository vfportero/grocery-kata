import ApiService from "../services/ApiService/ApiService";
import { ProductModel } from "../models/ProductModel";
import { DispatchAction } from "./groceryReducer";

export enum ActionType {
    FetchProducts = "FetchProducts",
    FetchProductsSuccess = "FetchProductsSuccess",
    FetchProductsError = "FetchProductsError",

    AddToCart = "AddToCart",
    RemoveOneUnitFromCart = "RemoveOneUnitFromCart",
    AddOneUnitFromCart = "AddOneUnitFromCart",

    SetProductAsFavorite = "SetProductAsFavorite",
    SetProductAsNotFavorite = "SetProductAsNotFavorite",
}

export interface GroceryActionsDispatcher {
    fetchProducts(page?: number): void;
    addToCart(product: ProductModel): void;
    removeOneUnitFromCart(productId: string): void;
    addOneUnitFromCart(productId: string): void;
    setProductAsFavorite(product: ProductModel): void;
    setProductAsNotFavorite(product: ProductModel): void;
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
        fetchProducts: (page: number) => {
            dispatch({ type: ActionType.FetchProducts })
            ApiService.getProductsPage(page + 1).then(
                (apiResponse) => {
                    if (apiResponse.status === 200) {
                        dispatch({ type: ActionType.FetchProductsSuccess, payload: apiResponse.data })
                    } else {
                        dispatch({ type: ActionType.FetchProductsError, payload: apiResponse.statusText })
                    }
                    
                }
            );            
        },
        setProductAsFavorite: (product: ProductModel) => {
            dispatch({ type: ActionType.SetProductAsFavorite, payload: product.id });
            // OPTIMISTIC PATCH... CHANGE STATE WITHOUT WAIT API RESPONSE
            ApiService.patchProduct(product.id, {...product, favorite: true});
        },
        setProductAsNotFavorite: (product: ProductModel) => {
            dispatch({ type: ActionType.SetProductAsNotFavorite, payload: product.id })
            // OPTIMISTIC PATCH... CHANGE STATE WITHOUT WAIT API RESPONSE
            ApiService.patchProduct(product.id, {...product, favorite: false});
        }
    };
  }
  
  export default createActions;