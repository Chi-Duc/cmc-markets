import React from 'react';
import { renderInContext } from './test-utils';
import CheckOutCard from '../src/components/checkout-card';

describe('Checkout card', () => {
  it('should contain a Place order button', () => {
    const { queryByRole } = renderInContext(<CheckOutCard />);

    expect(
      queryByRole('button', {
        name: 'Place Order',
      })
    ).toBeInTheDocument();
  });

});
