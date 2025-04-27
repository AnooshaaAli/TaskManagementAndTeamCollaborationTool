import '@testing-library/jest-dom';
// CreateList.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateList from '../components/CreateList.jsx';

// Mock fetch
global.fetch = jest.fn();

describe('CreateList Component', () => {
    beforeEach(() => {
        fetch.mockClear();
        localStorage.setItem('jwtToken', 'fake-token');
    });

    it('shows input field when Add List button is clicked', () => {
        render(<CreateList projectID="123" onListCreated={jest.fn()} />);

        fireEvent.click(screen.getByRole('button', { name: /Add List/i }));

        expect(screen.getByPlaceholderText(/Enter list name/i)).toBeInTheDocument();
    });

    it('creates a list successfully', async () => {
        const onListCreatedMock = jest.fn();
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ listID: '1', name: 'New List' })
        });

        render(<CreateList projectID="123" onListCreated={onListCreatedMock} />);

        fireEvent.click(screen.getByRole('button', { name: /Add List/i }));

        const input = screen.getByPlaceholderText(/Enter list name/i);
        fireEvent.change(input, { target: { value: 'New List' } });

        fireEvent.click(screen.getByRole('button', { name: /Save/i }));

        await waitFor(() => {
            expect(onListCreatedMock).toHaveBeenCalledWith({ listID: '1', name: 'New List' });
        });
    });

    it('cancels creating a list when Cancel is clicked', () => {
        render(<CreateList projectID="123" onListCreated={jest.fn()} />);

        fireEvent.click(screen.getByRole('button', { name: /Add List/i }));
        fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

        expect(screen.queryByPlaceholderText(/Enter list name/i)).not.toBeInTheDocument();
    });

    it('does not call create if input is empty', () => {
        render(<CreateList projectID="123" onListCreated={jest.fn()} />);

        fireEvent.click(screen.getByRole('button', { name: /Add List/i }));
        fireEvent.click(screen.getByRole('button', { name: /Save/i }));

        expect(fetch).not.toHaveBeenCalled();
    });

});
