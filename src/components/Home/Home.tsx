import * as React from 'react';
import './Home.scss';
import ProductList from '../ProductList/ProductList';
import Cart from '../Cart/Cart';
import MediaQuery from 'react-responsive'
import FloatingLink from '../FloatingLink/FloatingLink';


interface Props {}

interface State {
};


export default class Home extends React.Component<Props, State> {
  state: State = {  };

  render () {
    return (
        <div className="main-grid card">
            <div className="main-col">
                <ProductList />
            </div>
            <MediaQuery minWidth={1024}>
              <div className="aside-col">
                <Cart />
              </div>
            </MediaQuery>
            <MediaQuery maxWidth={1024}>
              <FloatingLink href="/cart" label="Cart" icon="🛒"></FloatingLink>
            </MediaQuery>
        </div>
    );
  }
}