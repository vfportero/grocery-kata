import * as React from 'react';
import './Cart.scss';

interface Props {}

interface State {
};

export default class Cart extends React.Component<Props, State> {
  state: State = {  };

  render () {
    return (
      <div className="cart">
        <h2>Cart</h2>
      </div>
    );
  }
}