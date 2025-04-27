import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FileItem from '../components/FileItem';
import { File, Eye, ChevronUp, ChevronDown } from 'lucide-react';

describe('FileItem Component', () => {
    const mockFile = {
        fileID: '123',
        fileName: 'test-file.pdf',
    };

    it('renders file name and icon', () => {
        const { container } = render(<FileItem file={mockFile} />);

        // Check if the file name is rendered
        expect(screen.getByText(mockFile.fileName)).toBeInTheDocument();

        // Query the element by its class directly using the container
        const fileIcon = container.querySelector('.file-icon'); // Use container.querySelector for class
        expect(fileIcon).toHaveClass('pdf-file'); // Should match the class for PDF
    });


    it('renders the View file button with correct label', () => {
        render(<FileItem file={mockFile} />);

        // Check if the "View" button is displayed correctly
        const viewButton = screen.getByRole('button', { name: /view/i });
        expect(viewButton).toBeInTheDocument();

        // Check that the button shows "View" initially
        expect(screen.getByText('View')).toBeInTheDocument();
    });

    it('toggles file preview on button click', () => {
        render(<FileItem file={mockFile} />);

        const viewButton = screen.getByRole('button', { name: /view/i });

        // Initially, the preview is hidden
        expect(screen.queryByText('Hide')).not.toBeInTheDocument();
        expect(screen.queryByText('View')).toBeInTheDocument();

        // Click the "View" button to show the file
        fireEvent.click(viewButton);

        // Now, the preview should be shown and the button label should toggle
        expect(screen.getByText('Hide')).toBeInTheDocument();
        expect(screen.queryByText('View')).not.toBeInTheDocument();

        // Ensure the correct icon (ChevronUp) is rendered when the file is visible
        expect(screen.getByRole('button', { name: /hide/i })).toContainHTML('<svg');
    });

    it('hides file preview when Hide button is clicked', () => {
        render(<FileItem file={mockFile} />);

        const viewButton = screen.getByRole('button', { name: /view/i });

        // Click the "View" button to show the file
        fireEvent.click(viewButton);

        // Now the file is visible, and the button should display "Hide"
        fireEvent.click(screen.getByRole('button', { name: /hide/i }));

        // Ensure the preview is hidden again
        expect(screen.queryByText('Hide')).not.toBeInTheDocument();
        expect(screen.queryByText('View')).toBeInTheDocument();
    });

});
