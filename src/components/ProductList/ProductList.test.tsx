import React from 'react';
import { render } from '@testing-library/react';
import ProductList from './ProductList';
import { GroceryProvider } from '../../core/context/GroceryContext';
import { initialState } from '../../core/context/groceryReducer';
import {  MemoryRouter } from 'react-router-dom';

describe('When ProductList render', () => {
  const context = { dispatch: jest.fn(), state: initialState }
  context.state.products.items.allIds = ['p1','p2'];
  context.state.products.items.favoriteIds = ['p1'];
  context.state.products.items.byId = {
    p1: {
      id: 'p1', productName: 'product 1', favorite: 1, image_url: 'https://dummyimage.com/400x400/28200e/000&text=Unbranded Metal Chair', price: 100, productDescription: 'descr 1', stock: 10
    },
    p2: {
      id: 'p2', productName: 'product 2', favorite: 0, image_url: 'https://dummyimage.com/400x400/28200e/000&text=Unbranded Metal Chair', price: 100, productDescription: 'descr 2', stock: 10
    }
  }

  const renderResult = render(
    <GroceryProvider value={context}>
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    </GroceryProvider>
  );

  test('a list of products are rendered', () => {    
    expect(renderResult.container.querySelectorAll('.product').length).toBe(2);
  });


  
})
