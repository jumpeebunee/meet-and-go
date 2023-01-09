import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('modal is open', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const map = screen.getByTestId('map');
  fireEvent.click(map);
  const createPoint = screen.getByTestId('create-point');
  expect(createPoint).toBeInTheDocument();
})