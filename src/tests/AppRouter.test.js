import React from 'react'
import AppRouter from '../routes/AppRouter'
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Pruebas en el AppRouter', () => {
  const history = createMemoryHistory();
    test('Debe de mostrar el componente AppRouter', () => {
      const wrapper = render(
        <Router location={history.location} navigator={history}> <AppRouter /> </Router>);
      expect(wrapper).toMatchSnapshot();
      
    }
    );
})
