import React from 'react';
import { renderInContext } from './test-utils';
import CheckoutPage from '../pages/checkout';

describe('Checkout page', () => {
  beforeEach(async () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');

    useRouter.mockImplementation(() => ({
      push: jest.fn(),
    }));
  });

  it('should render successfully', () => {
    const { baseElement } = renderInContext(<CheckoutPage />);
    expect(baseElement).toBeTruthy();
  });

});
