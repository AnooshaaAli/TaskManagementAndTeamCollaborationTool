import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../pages/RegisterPage';
import Input from '../components/Input';

describe("LoginPage Component", () => {

    test('renders all fields correctly', () => {
        render(<RegisterPage />);
      
        const usernameField = screen.getByLabelText(/username/i);
        const emailField = screen.getByLabelText(/email/i);
        const passwordField = screen.getByLabelText(/password/i);
        const confirmPasswordField = screen.getByLabelText(/confirm password/i);
      
        expect(usernameField).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();
        expect(confirmPasswordField).toBeInTheDocument();
      });
});