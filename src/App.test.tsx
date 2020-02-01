import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  const renderResult = render(<App />);
  
  expect(renderResult).toBeDefined();
});
