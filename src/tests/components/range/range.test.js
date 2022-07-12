import React from 'react'
import Range from '../../../components/range-input-slider/range/Range'
import { render } from '@testing-library/react';

jest.mock('../../../hooks/useFetchApi');

describe('Pruebas en el Range', () => {
  test('Debe de mostrar el componente Range', () => {
    const data = jest.fn();
    data.mockReturnValue({
      max: 100,
      min: 0
    });

    const wrapper = render(
      <Range min={data.min} max={data.max} />);
    expect(wrapper).toMatchSnapshot();
  }
  );
})