import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ModeratorPage from '../src/app/(moderator)/moderator/page';

describe('ModeratorPage', () => {
  beforeEach(() => {
    render(<ModeratorPage />);
  });

  it('renders the moderator page with the correct titles', () => {
    expect(screen.getByText(/Moderator Page/i)).toBeInTheDocument();
    expect(screen.getByText(/Unmoderated Articles/i)).toBeInTheDocument();
    expect(screen.getByText(/Accepted Articles/i)).toBeInTheDocument();
    expect(screen.getByText(/Denied Articles/i)).toBeInTheDocument();
  });

  it('renders the show article list component for unmoderated articles', () => {
    expect(screen.getByText(/Unmoderated Articles/i)).toBeInTheDocument();
  });

  it('renders the show article list component for accepted articles', () => {
    expect(screen.getByText(/Accepted Articles/i)).toBeInTheDocument();
  });

  it('renders the show article list component for denied articles', () => {
    expect(screen.getByText(/Denied Articles/i)).toBeInTheDocument();
  });
});
