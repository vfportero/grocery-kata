import * as React from 'react';
import './ProductList.scss';
import Product from '../Product/Product';
import Spinner from '../Spinner/Spinner';
import createActions from '../../core/context/groceryActions';
import GroceryContext from '../../core/context/GroceryContext';
import { useContext, useEffect, useState } from 'react';
import { GroceryState } from '../../core/models/StateModel';
import InfiniteScroll from 'react-infinite-scroll-component';
import { selectProduct } from '../../core/context/gorcerySelector';

enum ProductFilter {
    All,
    OnlyFavorites
}

const ProductList: React.FC = () => {

    const {state, dispatch} = useContext<any>(GroceryContext);
    const dispatcher = createActions(dispatch)
    const groceryState = state as GroceryState;
    const [productFilter, setProductFilter] = useState(ProductFilter.All);

    useEffect(() => {
        if (groceryState.products.items.allIds.length === 0 && groceryState.loadingData === false) {
            loadMoreProducts();
        }
    }, [groceryState.products, groceryState.loadingData]);

    const filteredProductIds = () => {
        let filteredProductIds = groceryState.products.items.allIds;

        if (productFilter === ProductFilter.OnlyFavorites) {
            filteredProductIds = groceryState.products.items.favoriteIds;
        }

        return filteredProductIds;
    }

    const renderProducts = () => {
        return filteredProductIds().map((productId: string) => {
            return <Product {...groceryState.products.items.byId[productId]} key={productId}></Product>
        }) 
    }

    const loadMoreProducts = () => {
        if (productFilter === ProductFilter.All) {
            dispatcher.fetchProducts(groceryState.products.page);
        }
    }

    const filterAll = () => {
        setProductFilter(ProductFilter.All);
    }

    const filterOnlyFavorites = () => {
        dispatcher.fetchFavoriteProducts();
        setProductFilter(ProductFilter.OnlyFavorites);
    }


    return (
        
        <div className="product-list">
            <img className="logo" src="/logo192.png" alt="Grocery-Kata"/>
            <div className="filters">
                <span onClick={filterAll} className={productFilter === ProductFilter.All ? 'active': ''}>All</span> | <span onClick={filterOnlyFavorites} className={productFilter === ProductFilter.OnlyFavorites ? 'active': ''}>Only favorites</span>
            </div>
            <div id="productGrid">
                <InfiniteScroll
                    dataLength={filteredProductIds().length}
                    next={loadMoreProducts}
                    hasMore={productFilter === ProductFilter.All}
                    loader={<Spinner />}
                    scrollableTarget="productGrid"
                >
                    {renderProducts()}
                </InfiniteScroll>
           
            </div>
        </div>
        
    
    );
  
}

export default ProductList;
