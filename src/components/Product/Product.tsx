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

  productAvailable = () => {
    return this.props.product.stock > 0;
  }

  render () {
      const product = this.props.product;
        return (
        <div className="product">
            <img className="image" src={product.image_url} alt={product.productName} />
            <div className={product.favorite ? "favorite-icon favorite" : "favorite-icon"}></div>
            <div className="content">
                <div className="header">
                    <div className="name">{product.productName}</div>
                    <div className="price">{product.price}$</div>
                </div>
                <div className="description">{product.productDescription}</div>
                <div className="footer">
                    <div className="stock">{product.stock} left</div>
                    <div><button className={this.productAvailable() ? "" : "disabled"}>Add</button></div>
                </div>
            </div>
            
            
        </div>
        );
  }
}