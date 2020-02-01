import * as React from 'react';
import './Cart.scss';
import GroceryContext from '../../core/context/GroceryContext';
import CartItem from '../CartItem/CartItem';
import { GroceryState } from '../../core/models/StateModel';
import MediaQuery from 'react-responsive';
import { useHistory } from 'react-router-dom';

const Cart: React.FC = () => {

  const {state, dispatch} = React.useContext<any>(GroceryContext);
  const groceryState = state as GroceryState;
  const history = useHistory();

  const renderCartProducts = () => {
    return groceryState.cart.items.allIds.map((productId: string) => {
        return <CartItem {...groceryState.cart.items.byId[productId]} key={productId}></CartItem>
    })
  }

  const backToProductList = () => {
    history.push("/");
  }


  return (
    <div className="cart">
      <div className="title">
        <MediaQuery maxDeviceWidth={1024}>
          <div className="back" onClick={backToProductList}>
            <span>🡄</span>
          </div>
        </MediaQuery>
        <h2>Cart</h2>
      </div>
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