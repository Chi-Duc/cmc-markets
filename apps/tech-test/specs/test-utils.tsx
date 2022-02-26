import React from 'react';
import { render } from '@testing-library/react';
import { AppContextWrapper } from '../src/context/use-app-context';

export function renderInContext(children: JSX.Element) {
  return render(<AppContextWrapper>{children}</AppContextWrapper>);
}