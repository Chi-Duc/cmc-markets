import React from 'react';
import { render } from '@testing-library/react';
import { AppContext, IAppContext } from '../src/context/use-app-context';

const mockAppState: IAppContext = {
  countries: [
    {
      name: 'Australia',
      conversionRateFromAUD: 1,
      currencySymbol: '$',
    },
    {
      name: 'US',
      conversionRateFromAUD: 1.5,
      currencySymbol: '$',
    },
    {
      name: 'UK',
      conversionRateFromAUD: 2,
      currencySymbol: '£',
    },
  ],
  selectedCountry: {
    name: 'Australia',
    conversionRateFromAUD: 1,
    currencySymbol: '$',
  },
  setSelectedCountry: jest.fn(),
  shoppingCart: [],
  addProductToShoppingCart: jest.fn(),
  removeProductFromShoppingCart: jest.fn(),
  clearShoppingCart: jest.fn(),
  updateProductQuantity: jest.fn(),
  busy: false,
  setBusy: jest.fn(),
};

const MockAppContextWrapper = ({ children }) => {
  return (
    <AppContext.Provider value={mockAppState}>{children}</AppContext.Provider>
  );
}
  
export function renderInContext(children: JSX.Element) {
  return render(<MockAppContextWrapper>{children}</MockAppContextWrapper>);
}