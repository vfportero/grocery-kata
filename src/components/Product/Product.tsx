import * as React from 'react';
import { ProductModel } from '../../core/models/ProductModel';
import './Product.scss';
import GroceryContext from '../../core/context/GroceryContext';
import createActions from '../../core/context/groceryActions';

const Product: React.FC<ProductModel> = (product) => {

    const {state, dispatch} = React.useContext<any>(GroceryContext);
    const dispatcher = createActions(dispatch)

    let productAvailable = () => {
        return product.stock > 0;
    }

    let addToCart = () => {
        if (productAvailable()) {
            dispatcher.addToCart(product);
        }
    }

  
    return (
        <div className="product">
            <img className="image" src={product.image_url} alt={product.productName} />
            <div className={product.favorite ? "favorite-icon favorite" : "favorite-icon"}></div>
            <div className="content">
                <div className="header">
                    <div className="name">{product.productName}</div>
                    <div className="price">{product.price}$</div>
                </div>
                <div className="description">{product.productDescription}</div>
                <div className="footer">
                    <div className="stock">{product.stock} left</div>
                    <button onClick={addToCart} className={productAvailable() ? "" : "disabled"}>Add</button>
                </div>
            </div>
            
            
        </div>
        );
  
}

export default Product;