import * as React from 'react';
import './Home.scss';
import ProductList from '../ProductList/ProductList';
import Cart from '../Cart/Cart';

interface Props {}

interface State {
};

export default class Home extends React.Component<Props, State> {
  state: State = {  };

  render () {
    return (
        <div className="main-grid">
            <div className="main-col">
                <ProductList />
            </div>
            <div className="aside-col">
                <Cart />
            </div>
        </div>
    );
  }
}