import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Project from '../components/Project'; // adjust path
import '@testing-library/jest-dom';

// Mock child components you don't want to test here
jest.mock('../components/List', () => () => <div>Mock List</div>);
jest.mock('../components/CreateList', () => () => <div>Mock CreateList</div>);
jest.mock('../components/ConfirmDialog', () => () => <div>Mock ConfirmDialog</div>);
jest.mock('../components/AddMemberModal', () => () => <div>Mock AddMemberModal</div>);
jest.mock('../components/RemoveMemberModal', () => () => <div>Mock RemoveMemberModal</div>);
jest.mock('../components/CreateComment', () => () => <div>Mock CreateComment</div>);
jest.mock('../components/Comment', () => () => <div>Mock Comment</div>);
jest.mock('../components/UploadFile', () => () => <div>Mock UploadFile</div>);
jest.mock('../components/FileItem', () => () => <div>Mock FileItem</div>);

// Mock fetch globally
beforeEach(() => {
    global.fetch = jest.fn();
    localStorage.setItem("jwtToken", "fake-token"); // mock token
});

afterEach(() => {
    jest.resetAllMocks();
});

describe('Project Component', () => {

    it('shows error if project fetch fails', async () => {
        fetch.mockImplementationOnce(() =>
            Promise.reject(new Error('Network error'))
        );

        render(<Project id="1" />);

        await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    });

    it('renders project when data is fetched', async () => {
        // Mock project fetch
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ name: 'Test Project', lists: {}, comments: {}, files: {} }),
            })
        );

        // Mock user fetch
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ userID: 1 }),
            })
        );

        // Mock isTeamLead fetch
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ isTeamLead: true }),
            })
        );

        render(<Project id="1" />);

        expect(await screen.findByText('Test Project')).toBeInTheDocument();
        expect(screen.getByText('Mock CreateList')).toBeInTheDocument();
    });

    it('allows toggling comments and files tabs', async () => {
        fetch
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ name: 'Project With Tabs', lists: {}, comments: {}, files: {} }),
                })
            )
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ userID: 1 }),
                })
            )
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ isTeamLead: true }),
                })
            );

        render(<Project id="1" />);

        // Wait for project to load
        await screen.findByText('Project With Tabs');

        // Click on Comments Tab
        fireEvent.click(screen.getByText(/Comments/i));
        expect(await screen.findByText('Mock CreateComment')).toBeInTheDocument();

        // Click on Files Tab
        fireEvent.click(screen.getByText(/Files/i));
        expect(await screen.findByText('Mock UploadFile')).toBeInTheDocument();
    });

    it('shows Add/Remove Member buttons if user is team lead', async () => {
        fetch
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ name: 'Project', lists: {}, comments: {}, files: {} }),
                })
            )
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ userID: 1 }),
                })
            )
            .mockImplementationOnce(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ isTeamLead: true }),
                })
            );

        render(<Project id="1" />);

        expect(await screen.findByText('Add Member')).toBeInTheDocument();
        expect(await screen.findByText('Remove Member')).toBeInTheDocument();
        expect(await screen.findByText('Delete Project')).toBeInTheDocument();
    });

});
