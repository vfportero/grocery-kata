import React from "react";
import GroceryContext from "./GroceryContext";

const GroceryContextProvider: React.FC<any> = (children) => { 
    const state = {};
    return (
        <GroceryContext.Provider value={state}>
            {children}
        </GroceryContext.Provider>
    );
}

export default GroceryContextProvider;