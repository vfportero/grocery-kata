import * as React from 'react';
import './Home.scss';
import ProductList from '../ProductList/ProductList';
import Cart from '../Cart/Cart';
import MediaQuery from 'react-responsive'


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
            <MediaQuery minDeviceWidth={1024}>
              <div className="aside-col">
                <Cart />
              </div>
            </MediaQuery>
        </div>
    );
  }
}