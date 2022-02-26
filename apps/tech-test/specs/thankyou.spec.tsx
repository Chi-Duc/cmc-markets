import React from 'react';
import { renderInContext } from './test-utils';
import ThankyouPage from '../pages/thankyou';

describe('Thank you page', () => {
  it('should render successfully', () => {
    const { baseElement } = renderInContext(<ThankyouPage />);
    expect(baseElement).toBeTruthy();
  });

  it('should contain a Thankyou message', () => {
    const { getByText } = renderInContext(<ThankyouPage />);

    expect(getByText('Thank you for shopping with us!')).toBeInTheDocument();
  });

  it('should contain a Continue shopping button', () => {
    const { queryByRole } = renderInContext(<ThankyouPage />);

    expect(
      queryByRole('button', {
        name: 'Continue shopping',
      })
    ).toBeInTheDocument();
  });

});
