// import '@testing-library/jest-dom';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import Project from '../components/Project';

// // Mock child components
// jest.mock('../components/List', () => () => <div data-testid="mock-list" />);
// jest.mock('../components/CreateList', () => () => <div data-testid="mock-create-list" />);
// jest.mock('../components/CreateComment', () => () => <div data-testid="mock-create-comment" />);
// jest.mock('../components/Comment', () => ({ comment }) => <div data-testid="mock-comment">{comment?.content}</div>);
// jest.mock('../components/UploadFile', () => () => <div data-testid="mock-upload-file" />);
// jest.mock('../components/FileItem', () => ({ file }) => <div data-testid="mock-file-item">{file?.filename}</div>);
// jest.mock('../components/ConfirmDialog', () => () => <div data-testid="mock-confirm-dialog" />);
// jest.mock('../components/AddMemberModal', () => () => <div data-testid="mock-add-member" />);
// jest.mock('../components/RemoveMemberModal', () => () => <div data-testid="mock-remove-member" />);

// // Mock localStorage
// beforeEach(() => {
//     Storage.prototype.getItem = jest.fn(() => 'mocked-token');
// });

// afterEach(() => {
//     jest.clearAllMocks();
// });

// // Mock fetch
// global.fetch = jest.fn();

// describe('Project Component', () => {
//     const mockProjectData = {
//         name: 'Test Project',
//         teamSize: 3,
//         lists: {
//             1: { listID: 1, title: 'List 1' },
//         },
//         comments: {
//             1: { commentID: 1, content: 'Comment 1' },
//         },
//         files: {
//             1: { fileID: 1, filename: 'file1.txt' }
//         }
//     };

//     const mockUserData = {
//         userID: 123,
//     };

//     const mockIsTeamLead = {
//         isTeamLead: true
//     };

//     function mockFetchResponses() {
//         fetch
//         .mockResolvedValueOnce({
//             ok: true,
//             json: async () => mockProjectData,  // First fetch for the project
//         })
//         .mockResolvedValueOnce({
//             ok: true,
//             json: async () => mockUserData,    // Second fetch for user data
//         })
//         .mockResolvedValueOnce({
//             ok: true,
//             json: async () => mockIsTeamLead,   // Third fetch for isTeamLead data
//         });
//     }

//     it('displays error if fetch fails', async () => {
//         fetch
//           .mockRejectedValueOnce(new Error('Fetch failed')) // Mock first fetch to fail (project data fetch fails)
//           .mockResolvedValueOnce({                         // Mock second fetch to succeed (user fetch mock)
//             ok: true,
//             json: async () => ({ userID: '123' })
//           });

//         render(<Project id="1" />);

//         await waitFor(() => {
//             // Expect error message and retry button to be in the document
//             expect(screen.getByText(/Error:/)).toBeInTheDocument();
//             expect(screen.getByText('Retry')).toBeInTheDocument();
//         });
//     });
    

//     // it('renders project data after successful fetch', async () => {
//     //     mockFetchResponses();
//     //     render(<Project id="1" />);

//     //     await waitFor(() => {
//     //         expect(screen.getByText('Test Project')).toBeInTheDocument();
//     //         expect(screen.getByText('3 members')).toBeInTheDocument();
//     //     });

//     //     expect(screen.getByTestId('mock-list')).toBeInTheDocument();
//     //     expect(screen.getByTestId('mock-create-list')).toBeInTheDocument();
//     // });

//     // it('opens Comments tab and displays comments', async () => {
//     //     mockFetchResponses();
//     //     render(<Project id="1" />);

//     //     await waitFor(() => screen.getByText('Test Project'));

//     //     fireEvent.click(screen.getByText('Comments'));

//     //     await waitFor(() => {
//     //         expect(screen.getByText('Comments')).toBeInTheDocument();
//     //         expect(screen.getByTestId('mock-comment')).toBeInTheDocument();
//     //         expect(screen.getByTestId('mock-create-comment')).toBeInTheDocument();
//     //     });
//     // });

//     // it('opens Files tab and displays files', async () => {
//     //     mockFetchResponses();
//     //     render(<Project id="1" />);

//     //     await waitFor(() => screen.getByText('Test Project'));

//     //     fireEvent.click(screen.getByText('Files'));

//     //     await waitFor(() => {
//     //         expect(screen.getByText('Files')).toBeInTheDocument();
//     //         expect(screen.getByTestId('mock-file-item')).toBeInTheDocument();
//     //         expect(screen.getByTestId('mock-upload-file')).toBeInTheDocument();
//     //     });
//     // });

//     // it('shows Add Member modal when Add Member button is clicked (for team lead)', async () => {
//     //     mockFetchResponses();
//     //     render(<Project id="1" />);

//     //     await waitFor(() => screen.getByText('Test Project'));

//     //     fireEvent.click(screen.getByText('Add Member'));

//     //     await waitFor(() => {
//     //         expect(screen.getByTestId('mock-add-member')).toBeInTheDocument();
//     //     });
//     // });

//     // it('shows Confirm Dialog when Delete Project is clicked', async () => {
//     //     mockFetchResponses();
//     //     render(<Project id="1" />);

//     //     await waitFor(() => screen.getByText('Test Project'));

//     //     fireEvent.click(screen.getByText('Delete Project'));

//     //     await waitFor(() => {
//     //         expect(screen.getByTestId('mock-confirm-dialog')).toBeInTheDocument();
//     //     });
//     // });
// });
