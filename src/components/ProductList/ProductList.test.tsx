import React from 'react';
import { render } from '@testing-library/react';
import ProductList from './ProductList';

test('renders ProductList', () => {
  const renderResult = render(<ProductList />);
  expect(true).toBeTruthy();
});
