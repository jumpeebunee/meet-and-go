import { fireEvent, screen } from '@testing-library/react';
import { renderStructure } from './testing/renderStructure';

describe('Searching', () => {
  test('Is open/close', () => {
    renderStructure();
    const searchBtn = screen.getByTestId('search-btn');
    expect(screen.queryByTestId('events-btn')).toBeInTheDocument();
    fireEvent.click(searchBtn);
    expect(screen.queryByTestId('events-btn')).toBeNull();
    fireEvent.click(searchBtn);
    expect(screen.queryByTestId('events-btn')).toBeInTheDocument();
  })
})

describe('Active events', () => {
  test('Created', () => {
    renderStructure();
    const eventsBtn = screen.getByTestId('events-btn');
    expect(eventsBtn).toBeInTheDocument();
  })
  test('Is open/close', () => {
    renderStructure();
    const eventsBtn = screen.getByTestId('events-btn');
    screen.debug()
    // expect(screen.queryByTestId('modal-events')).toBeVisible();
  })
})