import * as React from 'react';
import './ProductList.scss';
import Product from '../Product/Product';
import ApiService from '../../core/services/ApiService/ApiService';
import { ProductModel } from '../../core/models/ProductModel';

interface Props {}

interface State {
    grocery: Array<ProductModel>
};

export default class ProductList extends React.Component<Props, State> {
    state: State = { 
          grocery: []
    };

    componentDidMount() {
        ApiService.getAllProducts().then(grocery => {
            this.setState({grocery: grocery.data})
        })
    }

    renderProducts() {
        if (this.state.grocery.length) {
            return this.state.grocery.map((p) => {
                return <Product product={p} key={p.id}></Product>
            })
        }
        return [];
    }

    render () {
        const products = this.renderProducts();
        return (
            
            <div className="product-list">
                <img className="logo" src="/logo192.png" alt="Grocery-Kata"/>
                <div className="grid">
                    {products}
                </div>
            </div>
            
        
        );
  }
}