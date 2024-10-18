// AdminPage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminPage from '../src/app/(admin)/admin/users/page'; // Adjust the path if needed
import React, { act } from 'react';
import '@testing-library/jest-dom';

// Mocking fetch globally
global.fetch = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
    global.confirm = jest.fn(() => true)
    localStorage.setItem("is_admin", "true"); // Set admin access for tests
});

describe('AdminPage', () => {

    it('displays error message on fetch failure', async () => {
        (fetch as jest.Mock).mockImplementation(() =>
            Promise.reject(new Error('Failed to fetch users'))
        );

        await act(async () => {
            render(<AdminPage />);
        });
        await waitFor(() => expect(screen.getByText(/Failed to fetch users/i)).toBeInTheDocument());
    });

    it('renders users correctly after successful fetch', async () => {
        const mockUsers = [
            { email: 'user1@example.com', passwordHash: 'hash1', isAdmin: true, authToken: 'token1', isMod: false, isAnalyst: false },
            { email: 'user2@example.com', passwordHash: 'hash2', isAdmin: false, authToken: 'token2', isMod: true, isAnalyst: false },
        ];

        (fetch as jest.Mock).mockImplementation(() =>
            Promise.resolve({ ok: true, json: () => Promise.resolve(mockUsers) })
        );

        await act(async () => {
            render(<AdminPage />);
        });
        await waitFor(() => {
            expect(screen.getByText(/user1@example.com/i)).toBeInTheDocument();
            expect(screen.getByText(/user2@example.com/i)).toBeInTheDocument();
        });
    });
    // it('toggles user roles correctly', async () => {
    //     const mockUsers = [
    //         { email: 'user1@example.com', passwordHash: 'hash1', isAdmin: true, authToken: 'token1', isMod: false, isAnalyst: false },
    //     ];

    //     (fetch as jest.Mock).mockImplementationOnce(() =>
    //         Promise.resolve({ ok: true, json: () => Promise.resolve(mockUsers) })
    //     );

    //     (fetch as jest.Mock).mockImplementationOnce(() =>
    //         Promise.resolve({ ok: true, json: () => Promise.resolve({ ...mockUsers[0], isAdmin: false }) }) // Mock role toggle response
    //     );

    //     await act(async () => {
    //         render(<AdminPage />);
    //     });

    //     await waitFor(() => expect(screen.getByText(/user1@example.com/i)).toBeInTheDocument());

    //     const toggleButton = screen.getByText(/Yes/i);
    //     await act(async () => {
    //         fireEvent.click(toggleButton);
    //     });

    //     await waitFor(
    //         () => expect(toggleButton.textContent).toBe('No'),
    //         { timeout: 3000 }
    //     );
    // });
    // it('deletes a user successfully', async () => {
    //     const mockUsers = [
    //         { email: 'user1@example.com', passwordHash: 'hash1', isAdmin: true, authToken: 'token1', isMod: false, isAnalyst: false },
    //     ];

    //     (fetch as jest.Mock).mockImplementationOnce(() =>
    //         Promise.resolve({ ok: true, json: () => Promise.resolve(mockUsers) })
    //     );

    //     (fetch as jest.Mock).mockImplementationOnce(() =>
    //         Promise.resolve({ ok: true }) // Mock delete response
    //     );

    //     await act(async () => {
    //         render(<AdminPage />);
    //     });

    //     await waitFor(() => expect(screen.getByText(/user1@example.com/i)).toBeInTheDocument());

    //     const deleteButton = screen.getByText(/Delete/i);
    //     await act(async () => {
    //         fireEvent.click(deleteButton);
    //     });

    //     // Simulating user confirmation
    //     window.confirm = jest.fn(() => true);

    //     await waitFor(
    //         () => expect(screen.queryByText(/user1@example.com/i)).not.toBeInTheDocument(),
    //         { timeout: 3000 }
    //     );
    // });
    it('displays access denied message when not admin', async () => {
        localStorage.setItem("is_admin", "false"); // Set non-admin access
        await act(async () => {
            render(<AdminPage />);
        });
        expect(screen.getByText(/Access denied/i)).toBeInTheDocument();
    });
});
