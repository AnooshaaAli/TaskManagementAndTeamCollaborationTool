import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '../pages/RegisterPage';
import Input from '../components/Input';

describe("LoginPage Component", () => {

    test('renders all fields correctly', () => {
        render(<RegisterPage />);
      
        const usernameField = screen.getByLabelText(/username/i);
        const emailField = screen.getByLabelText(/email/i);
        const inputs = screen.getAllByLabelText(/password/i);
        const passwordField = inputs[0]; 
        const confirmPasswordField = screen.getByLabelText(/confirm password/i);
      
        expect(usernameField).toBeInTheDocument();
        expect(emailField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();
        expect(confirmPasswordField).toBeInTheDocument();
      });

      test('shows error messages when fields are empty', async () => {
        render(<RegisterPage />);
      
        const submitButton = screen.getByRole('button', { name: /register/i });
        fireEvent.click(submitButton);
      
        const usernameError = await screen.findByText(/Username is required/i);
        const emailError = await screen.findByText(/Email is required/i);
        const passwordError = await screen.findByText(/Password is required/i);
      
        expect(usernameError).toBeInTheDocument();
        expect(emailError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();
      });
      
      test('shows error for invalid email', async () => {
        render(<RegisterPage />);
      
        const emailField = screen.getByLabelText(/email/i);
        const submitButton = screen.getByRole('button', { name: /register/i });
      
        fireEvent.change(emailField, { target: { value: 'invalid-email' } });
        fireEvent.click(submitButton);
      
        const emailError = await screen.findByText(/Email is invalid/i);
        expect(emailError).toBeInTheDocument();
      });  
      
      test('shows error for short password', async () => {
        render(<RegisterPage />);
      
        const inputs = screen.getAllByLabelText(/password/i);
        const passwordField = inputs[0]; 
        const submitButton = screen.getByRole('button', { name: /register/i });
      
        fireEvent.change(passwordField, { target: { value: '123' } });
        fireEvent.click(submitButton);
      
        const passwordError = await screen.findByText(/Password must be at least 6 characters/i);
        expect(passwordError).toBeInTheDocument();
      });

      test('shows error when passwords do not match', async () => {
        render(<RegisterPage />);
      
        const inputs = screen.getAllByLabelText(/password/i);
        const passwordField = inputs[0]; 
        const confirmPasswordField = screen.getByLabelText(/confirm password/i);
        const submitButton = screen.getByRole('button', { name: /register/i });
      
        fireEvent.change(passwordField, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordField, { target: { value: 'differentPassword123' } });
        fireEvent.click(submitButton);
      
        const confirmPasswordError = await screen.findByText(/Passwords do not match/i);
        expect(confirmPasswordError).toBeInTheDocument();
      });      
});