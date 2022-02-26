import React from 'react';
import { renderInContext } from './test-utils';
import Header from '../src/components/header';

describe('Header component', () => {
  it('should contain a Checkout button', () => {
    const { queryByRole } = renderInContext(<Header showMessage={() => {}}/>);

    expect(
      queryByRole('button', {
        name: 'shopping card',
      })
    ).toBeInTheDocument();
  });

});
