import * as React from 'react';
import './ProductList.scss';
import Product from '../Product/Product';
import Spinner from '../Spinner/Spinner';
import createActions from '../../core/context/groceryActions';
import GroceryContext from '../../core/context/GroceryContext';
import { useContext, useEffect } from 'react';
import { ProductModel } from '../../core/models/ProductModel';


const ProductList: React.FC = () => {

    const {state, dispatch} = useContext<any>(GroceryContext);
    const dispatcher = createActions(dispatch)

    useEffect(() => {
        if (state.products.length === 0 && state.loadingData === false) {
            dispatcher.fetchProducts();
        }
    }, [state.products]);

    const renderProducts = () => {
        if (state.loadingData) {
            return <Spinner />;
        } else {
            return state.products.map((p: ProductModel) => {
                return <Product {...p} key={p.id}></Product>
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
