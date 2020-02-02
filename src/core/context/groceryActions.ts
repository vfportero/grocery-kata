import ApiService from "../services/ApiService/ApiService";
import { ProductModel } from "../models/ProductModel";
import { DispatchAction } from "./groceryReducer";

export enum ActionType {
    FetchProducts = "FetchProducts",
    FetchProductsSuccess = "FetchProductsSuccess",
    FetchProductsError = "FetchProductsError",

    FetchFavoriteProducts = "FetchFavoriteProducts",
    FetchFavoriteProductsSuccess = "FetchFavoriteProductsSuccess",
    FetchFavoriteProductsError = "FetchFavoriteProductsError",

    RemoveOneProductUnitFromCart = "RemoveOneProductUnitFromCart",
    AddOneProductUnitToCart = "AddOneProductUnitToCart",

    SetProductAsFavorite = "SetProductAsFavorite",
    SetProductAsNotFavorite = "SetProductAsNotFavorite",
}

export interface GroceryActionsDispatcher {
    fetchProducts(page?: number): void;
    fetchFavoriteProducts(): void;
    removeOneProductUnitFromCart(productId: string): void;
    addOneProductUnitToCart(productId: string): void;
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
        removeOneProductUnitFromCart: (productId: string) => {
            dispatch({ type: ActionType.RemoveOneProductUnitFromCart, payload: productId })
        },
        addOneProductUnitToCart: (productId: string) => {
            dispatch({ type: ActionType.AddOneProductUnitToCart, payload: productId })
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
            ).catch(error => {
                dispatch({ type: ActionType.FetchProductsError, payload: error })
            });
        },
        fetchFavoriteProducts: () => {
            dispatch({ type: ActionType.FetchFavoriteProducts })
            ApiService.getFavoriteProducts().then(
                (apiResponse) => {
                    if (apiResponse.status === 200) {
                        dispatch({ type: ActionType.FetchFavoriteProductsSuccess, payload: apiResponse.data })
                    } else {
                        dispatch({ type: ActionType.FetchFavoriteProductsError, payload: apiResponse.statusText })
                    }
                    
                }
            ).catch(error => {
                dispatch({ type: ActionType.FetchProductsError, payload: error })
            });;
        },
        setProductAsFavorite: (product: ProductModel) => {
            dispatch({ type: ActionType.SetProductAsFavorite, payload: product.id });
            // OPTIMISTIC PATCH... CHANGE STATE WITHOUT WAIT API RESPONSE
            ApiService.patchProduct(product.id, {...product, favorite: 1});
        },
        setProductAsNotFavorite: (product: ProductModel) => {
            dispatch({ type: ActionType.SetProductAsNotFavorite, payload: product.id })
            // OPTIMISTIC PATCH... CHANGE STATE WITHOUT WAIT API RESPONSE
            ApiService.patchProduct(product.id, {...product, favorite: 0});
        }
    };
  }
  
  export default createActions;