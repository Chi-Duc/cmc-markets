import React from 'react';
import { render } from '@testing-library/react';
import ProductCard from '../src/components/product-card';
import { TProduct } from '../src/services/product';

describe('Product card', () => {
  const testProduct: TProduct = {
    id: 1,
    name: 'Test product',
    description: 'Test product description',
    priceInAUD: 100,
  };

  it('should contain product name', () => {

    const { getByText } = render(<ProductCard product={testProduct} />);

    expect(getByText(testProduct.name)).toBeInTheDocument();
  });

  it('should have a button to add product to the shopping cart', () => {
    const { queryByRole } = render(
      <ProductCard product={testProduct} />
    );

    expect(queryByRole('button', { name: 'add to cart' })).toBeInTheDocument();
  });

});
