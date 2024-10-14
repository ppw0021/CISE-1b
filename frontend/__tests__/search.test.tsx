import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResults from '../src/app/(search)/search/results/page'; // Adjust the path if needed

// Mock useSearchParams
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: (key: string) => {
      const params: { [key: string]: string } = {
        method: 'method1',
        fromYear: '2000',
        toYear: '2020',
      };
      return params[key];
    },
  }),
}));

describe('SearchResults Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<SearchResults />);
    const expectedText = "Reviewed Articles for method1"; 
    expect(getByText(expectedText)).toBeInTheDocument();
  });

  it('displays the expected checkboxes', () => {
    render(<SearchResults />);

    // Check for all expected checkbox labels
    const columns = [
      'Title',
      'Year',
      'Journal/Conference',
      'SE Practice',
      'Claim',
      'Evidence Result',
      'Research Type',
      'Participant Type',
      'Authors',
      'Created At',
      'Updated At',
    ];

    columns.forEach((column) => {
      const labelElement = screen.getByLabelText(column);
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toBeChecked(); // Assuming checkboxes are checked by default
    });
  });

  it('renders the return button', () => {
    render(<SearchResults />);
    const returnButton = screen.getByRole('button', { name: /Return/i });
    expect(returnButton).toBeInTheDocument();
  });
});
