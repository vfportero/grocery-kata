import React from 'react';
import { render } from '@testing-library/react';
import Layout from './Layout';

test('renders Layout with children component', () => {
  const testMessage = 'TEST';
  const renderResult = render(<Layout><h1>{testMessage}</h1></Layout>);
  const text = renderResult.getByText(testMessage);
  expect(text).toBeInTheDocument();
});
