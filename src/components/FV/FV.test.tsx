import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FV from './FV';

describe('<FV />', () => {
  test('it should mount', () => {
    render(<FV rate={0.08} pv = {2000} nper = {5} functionname = {'FV'}/>);

    const fv = screen.getByTestId('FV');

    expect(fv).toBeInTheDocument();
  });
});