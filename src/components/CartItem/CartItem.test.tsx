import React from 'react';
import { render } from '@testing-library/react';
import { GroceryProvider } from '../../core/context/GroceryContext';
import { initialState } from '../../core/context/groceryReducer';
import { MemoryRouter } from 'react-router-dom';
import { CartItemModel } from '../../core/models/CartItemModel';
import CartItem from './CartItem';

describe('When CartItem render', () => {
  test('renders CartItem', () => {
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
    const model : CartItemModel = {
      productId: 'p1',
      quantity: 1, 
      totalPrice: 10
    }
    const renderResult = render(
      <GroceryProvider value={context}>
        <MemoryRouter>
          <CartItem {...model} />
        </MemoryRouter>
      </GroceryProvider>
    );
  
    expect(renderResult.getByText('product 1')).toBeDefined();
  });
  
})
