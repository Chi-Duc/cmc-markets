import React from 'react';
import { render } from '@testing-library/react';

import CheckoutPage from '../pages/checkout';

describe('Checkout page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckoutPage />);
    expect(baseElement).toBeTruthy();
  });
});
