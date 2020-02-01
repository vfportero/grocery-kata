import * as React from 'react';
import './Cart.scss';
import GroceryContext from '../../core/context/GroceryContext';
import { ProductModel } from '../../core/models/ProductModel';
import CartItem from '../CartItem/CartItem';
import { CartItemModel } from '../../core/models/CartItemModel';

const Cart: React.FC = () => {

  const {state, dispatch} = React.useContext<any>(GroceryContext);

  const renderCartProducts = () => {
    return state.cart.items.map((p: CartItemModel) => {
        return <CartItem {...p} key={p.product.id}></CartItem>
    })
  }


  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart-items">
        {renderCartProducts()}
      </div>
      <div className="checkout">
        <button className="large">Checkout</button>
        <div className="total-price">{state.cart.totalPrice}$</div>
      </div>
    </div>
  );

}

export default Cart;