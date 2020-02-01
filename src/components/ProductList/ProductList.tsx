import * as React from 'react';
import './ProductList.scss';
import Product from '../Product/Product';
import Spinner from '../Spinner/Spinner';
import createActions from '../../core/context/groceryActions';
import GroceryContext from '../../core/context/GroceryContext';
import { useContext, useEffect } from 'react';
import { GroceryState } from '../../core/models/StateModel';
import InfiniteScroll from 'react-infinite-scroll-component';


const ProductList: React.FC = () => {

    const {state, dispatch} = useContext<any>(GroceryContext);
    const dispatcher = createActions(dispatch)
    const groceryState = state as GroceryState;

    useEffect(() => {
        if (groceryState.products.items.allIds.length === 0 && groceryState.loadingData === false) {
            loadMoreProducts();
        }
    }, [groceryState.products, groceryState.loadingData]);

    const renderProducts = () => {

        return groceryState.products.items.allIds.map((productId: string) => {
            return <Product {...groceryState.products.items.byId[productId]} key={productId}></Product>
        })
        
        
    }

    const loadMoreProducts = () => {
        dispatcher.fetchProducts(groceryState.products.page);
      }

    return (
        
        <div className="product-list">
            <img className="logo" src="/logo192.png" alt="Grocery-Kata"/>
            <div id="productGrid">
                <InfiniteScroll
                    dataLength={groceryState.products.items.allIds.length} //This is important field to render the next data
                    next={loadMoreProducts}
                    hasMore={true}
                    loader={<Spinner />}
                    scrollableTarget="productGrid"
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                        <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {renderProducts()}
                </InfiniteScroll>
           
            </div>
        </div>
        
    
    );
  
}

export default ProductList;
