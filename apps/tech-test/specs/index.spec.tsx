import React from 'react';
import { renderInContext } from './test-utils';
import Index from '../pages/index';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = renderInContext(<Index />);
    expect(baseElement).toBeTruthy();
  });
});
