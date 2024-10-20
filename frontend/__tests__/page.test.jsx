import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../src/app/(home)/page'
 
describe('Page', () => {

  beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
  });


  it('renders a heading', () => {
    render(<Page />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })

  it('renders the welcome message when no auth token is found', () => {
    render(<Page />);
    
    const welcomeMessage = screen.getByText(/welcome to the homepage, deployed with vercel/i);
    const noAuthTokenMessage = screen.getByText(/no auth token found/i);
    
    expect(welcomeMessage).toBeInTheDocument();
    expect(noAuthTokenMessage).toBeInTheDocument();
  });

  it('renders authenticated message with token and user details', () => {
    //Test is local storage is working as intended
    localStorage.setItem('auth_token', 'mockAuthToken');
    localStorage.setItem('is_admin', 'true');
    localStorage.setItem('is_mod', 'false');
    localStorage.setItem('is_analyst', 'true');
    localStorage.setItem('email', 'test@example.com');

    render(<Page />);

    const authenticatedMessage = screen.getByText(/authenticated with token: mockauthtoken/i);
    const adminStatus = screen.getByText(/admin: true/i);
    const modStatus = screen.getByText(/mod: false/i);
    const analystStatus = screen.getByText(/analyst: true/i);
    const emailStatus = screen.getByText(/email: test@example.com/i);

    expect(authenticatedMessage).toBeInTheDocument();
    expect(adminStatus).toBeInTheDocument();
    expect(modStatus).toBeInTheDocument();
    expect(analystStatus).toBeInTheDocument();
    expect(emailStatus).toBeInTheDocument();
  });
})