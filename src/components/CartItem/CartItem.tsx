import * as React from 'react';
import './CartItem.scss';
import GroceryContext from '../../core/context/GroceryContext';
import createActions from '../../core/context/groceryActions';
import { CartItemModel } from '../../core/models/CartItemModel';
import { selectProduct } from '../../core/context/gorcerySelector';

const CartItem: React.FC<CartItemModel> = (cartItem) => {

  const {state, dispatch} = React.useContext<any>(GroceryContext);
  const product = selectProduct(state, cartItem.productId);
  const dispatcher = createActions(dispatch)

  let removeOneUnitFromCart = () => {
    dispatcher.removeOneProductUnitFromCart(cartItem.productId);
  }
  
  let addOneUnitFromCart = () => {
    if (productAvailable()) {
      dispatcher.addOneProductUnitToCart(cartItem.productId);
    }
    
  }

  let productAvailable = () => {
    return product && product.stock > 0;
  }


  if (product) {
    return (
      <div className="cart-item">
        <img className="image" src={product.image_url} alt={product.productName} />
        <div className="cart-item-product">
          <div className="name">{product.productName}</div>
          <div className="quantity">
            <button onClick={removeOneUnitFromCart} className="small">-</button>
            <span> {cartItem.quantity} </span>
            <button onClick={addOneUnitFromCart} className={productAvailable() ? "small" : "small disabled"}>+</button>
          </div>
        </div>
        <div className="price">{cartItem.totalPrice}$</div>
      </div>
    );
  } else {
    return null;
  }


}

export default CartItem;