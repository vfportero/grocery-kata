import React from 'react';
import { render } from '@testing-library/react';
import Product from './Product';
import { ProductModel } from '../../core/models/ProductModel';
import { GroceryProvider } from '../../core/context/GroceryContext';
import { initialState } from '../../core/context/groceryReducer';
import { MemoryRouter } from 'react-router-dom';

describe('When Product render', () => {
  test('renders Product', () => {
    const context = { dispatch: jest.fn(), state: initialState }
    const model : ProductModel = {
      productName: 'THE PRODUCT',
      id: 'id',
      image_url: '',
      productDescription: '',
      stock: 1,
      price: 100,
      favorite: 0
    }
    const renderResult = render(
      <GroceryProvider value={context}>
        <MemoryRouter>
          <Product {...model} />
        </MemoryRouter>
      </GroceryProvider>
    );
  
    expect(renderResult.getByText(model.productName)).toBeDefined();
  });
  
})
