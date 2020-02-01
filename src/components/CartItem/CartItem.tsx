import * as React from 'react';
import './CartItem.scss';
import GroceryContext from '../../core/context/GroceryContext';
import createActions from '../../core/context/groceryActions';
import { CartItemModel } from '../../core/models/CartItemModel';

const CartItem: React.FC<CartItemModel> = (cartItem) => {

  const {state, dispatch} = React.useContext<any>(GroceryContext);
  const dispatcher = createActions(dispatch)


  return (
    <div className="cart-item">
      <img className="image" src={cartItem.product.image_url} alt={cartItem.product.productName} />
      <div className="cart-item-product">
        <div className="name">{cartItem.product.productName}</div>
        <div className="quantity">- {cartItem.quantity} +</div>
      </div>
      <div className="price">{cartItem.totalPrice}$</div>
    </div>
  );

}

export default CartItem;