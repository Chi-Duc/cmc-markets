import React from 'react';
import { render } from '@testing-library/react';

import ThankyouPage from '../pages/thankyou';

describe('Thank you page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThankyouPage />);
    expect(baseElement).toBeTruthy();
  });
});
