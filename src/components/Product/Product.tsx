import * as React from 'react';
import { ProductModel } from '../../core/models/ProductModel';
import './Product.scss';

interface Props {
    product: ProductModel
}

interface State {
};

export default class Product extends React.Component<Props, State> {
  state: State = {  };

  render () {
      const product = this.props.product;
        return (
        <div className="product">
            <img className="product-image" src={product.image_url} alt={product.productName} />
            <div >
                <div>{this.props.product.productName}</div>
            </div>
            
        </div>
        );
  }
}