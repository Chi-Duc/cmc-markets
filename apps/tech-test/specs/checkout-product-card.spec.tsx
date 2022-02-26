import React from 'react';
import { renderInContext } from './test-utils';
import CheckoutProductCard from '../src/components/checkout-product-card';

describe('Checkout card', () => {
  it('should contain a Remove button', () => {
    const mockProductWithQuantity = {
      product: {
        id: 1,
        name: 'Test product',
        description: 'Test product description',
        priceInAUD: 100,
      },
      quantity: 1
    };

    const { queryByRole } = renderInContext(
      <CheckoutProductCard productWithQuantity={mockProductWithQuantity} />
    );

    expect(
      queryByRole('button', {
        name: 'Remove',
      })
    ).toBeInTheDocument();
  });

});
