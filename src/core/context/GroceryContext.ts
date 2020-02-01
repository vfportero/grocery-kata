import React from "react";
import { GroceryState } from "../models/StateModel";

const GroceryContext = React.createContext({});
export const GroceryProvider = GroceryContext.Provider;
export const GroceryConsumer = GroceryContext.Consumer;
export default GroceryContext;

export interface IGroceryContext {
    state: GroceryState,
    dispatch: React.Dispatch<any>
}