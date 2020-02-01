import ApiService from "../services/ApiService/ApiService";
import { ProductModel } from "../models/ProductModel";
import { DispatchAction } from "./groceryReducer";

export enum ActionType {
    FetchProducts = "FetchProducts",
    FetchProductsSuccess = "FetchProductsSuccess",
    FetchProductsError = "FetchProductsError",

    AddToCart = "AddToCart"
}

export interface GroceryActionsDispatcher {
    fetchProducts(): void;
    addToCart(product: ProductModel): void;
};

export const fetchProductsSuccess = (products: ProductModel[]): DispatchAction => {
    return {
        type: ActionType.FetchProductsSuccess, 
        payload: products
    }
}

function createActions(dispatch: React.Dispatch<any>) : GroceryActionsDispatcher{
    return {
        // closeToast: () => dispatch({type: CLOSE_TOAST}),
        // setCharacterProperty: (propertyName:string, value: any) => dispatch({ type: SET_CHARACTER_PROPERTY, payload: { propertyName, value} }),
        // setCharacterStat: (stat: CharStatName, value: number) => dispatch({type: SET_CHARACTER_STAT, payload: {stat, value}}),
        // setCharacterIniciative: (value?: number) => dispatch({type: SET_CHARACTER_INICIATIVE, payload: {value}}),

        // postCharacter: (character: Character) => {
        //     console.log(character);
        //     DatabaseService.commitCharacter(character).then(
        //         (characterId) => {
        //             dispatch({ type: POST_CHARACTER_SUCCESS, payload: characterId })
        //         }
        //     );
        //     dispatch({ type: POST_CHARACTER })
        // },
        addToCart: (product: ProductModel) => {
            dispatch({ type: ActionType.AddToCart, payload: product })
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