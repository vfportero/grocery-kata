import React from 'react';
import { render } from '@testing-library/react';
import Product from './Product';
import { ProductModel } from '../../core/models/ProductModel';

test('renders Product', () => {
  const model : ProductModel = {
    productName: 'THE PRODUCT',
    id: 'id',
    image_url: '',
    productDescription: '',
    stock: 1,
    price: 100,
    favorite: 0
  }
  const renderResult = render(<Product {...model} />);
  expect(true).toBeTruthy();
});
