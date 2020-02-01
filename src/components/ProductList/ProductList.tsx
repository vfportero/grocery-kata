import * as React from 'react';
import './ProductList.scss';
import Product from '../Product/Product';
import Spinner from '../Spinner/Spinner';
import createActions from '../../core/context/groceryActions';
import GroceryContext from '../../core/context/GroceryContext';
import { useContext, useEffect } from 'react';
import { ProductModel } from '../../core/models/ProductModel';
import { GroceryState } from '../../core/models/StateModel';


const ProductList: React.FC = () => {

    const {state, dispatch} = useContext<any>(GroceryContext);
    const dispatcher = createActions(dispatch)
    const groceryState = state as GroceryState;

    useEffect(() => {
        if (groceryState.products.allIds.length === 0 && groceryState.loadingData === false) {
            dispatcher.fetchProducts();
        }
    }, [groceryState.products, groceryState.loadingData]);

    const renderProducts = () => {
        if (groceryState.loadingData) {
            return <Spinner />;
        } else {
            return groceryState.products.allIds.map((productId: string) => {
                return <Product {...groceryState.products.byId[productId]} key={productId}></Product>
            })
        }
        
    }

    return (
        
        <div className="product-list">
            <img className="logo" src="/logo192.png" alt="Grocery-Kata"/>
            <div className="grid">
                {renderProducts()}
            </div>
        </div>
        
    
    );
  
}

export default ProductList;
