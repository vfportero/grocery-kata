import * as React from 'react';
import { ProductModel } from '../../core/models/ProductModel';
import './Product.scss';
import GroceryContext from '../../core/context/GroceryContext';
import createActions from '../../core/context/groceryActions';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom'

const Product: React.FC<ProductModel> = (product) => {

    const {state, dispatch} = React.useContext<any>(GroceryContext);
    const dispatcher = createActions(dispatch)
    const isMobileResolution = useMediaQuery({
        query: '(max-device-width: 600px)'
    })
    const isDesktopResolution = useMediaQuery({
        query: '(min-device-width: 1024px)'
    })
    const history = useHistory();

    let productAvailable = () => {
        return product.stock > 0;
    }

    let addToCart = () => {
        if (productAvailable()) {
            dispatcher.addToCart(product);
            if (!isDesktopResolution) {
                history.push('/cart')
            }
        }
    }

    let mobileAddToCart = () => {
        if (isMobileResolution) {
            addToCart();
        }
    }

    let toggleFavorite = () => {
        if (product.favorite) {
            dispatcher.setProductAsNotFavorite(product);
        } else {
            dispatcher.setProductAsFavorite(product);
        }
    }

  
    return (
        <div className="product" onClick={mobileAddToCart}>
            <img className="image" src={product.image_url} alt={product.productName} />
            <div onClick={toggleFavorite} className={product.favorite ? "favorite-icon favorite" : "favorite-icon"}></div>
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