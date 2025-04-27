import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import Input from '../components/Input';

describe("LoginPage Component", () => {
  test("renders LoginPage component", () => {
    render(<LoginPage />);
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByText(/Log in to your account/i)).toBeInTheDocument();
  });

  test('email input renders correctly', () => {
    const handleChange = jest.fn();
    render(
      <Input 
        label="Email" 
        type="email" 
        id="email" 
        placeholder="you@example.com" 
        value="" 
        onChange={handleChange} 
      />
    );

    screen.debug();
    
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
  });  

  test('password field shows error when left empty', () => {
    render(
        <Input 
          label="Email" 
          type="email" 
          id="email" 
          placeholder="you@example.com" 
          value="" 
          onChange={handleChange} 
        />
      );
  
    const passwordInput = screen.getByLabelText(/password/i); 
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.blur(passwordInput); 
    expect(screen.queryByText(/Password is required/i)).toBeInTheDocument();
  });  

  test("form submission with valid credentials", async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Log In/i }); 

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: "mock-jwt-token" }),
      })
    );

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    fireEvent.click(loginButton);

    await waitFor(() => expect(screen.getByText(/Login Successful!/i)).toBeInTheDocument());
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/auth/login",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
        }),
      })
    );
  });

  test("form submission with invalid credentials shows error", async () => {
    render(<LoginPage />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Log In/i }); 

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid email or password." }),
      })
    );

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    fireEvent.click(loginButton);

    await waitFor(() => expect(screen.getByText(/Invalid email or password./i)).toBeInTheDocument());
  });

  test("form submission shows general error on network failure", async () => {
    render(<LoginPage />);
  
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole('button', { name: /Log In/i }); 
  
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));
  
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
    fireEvent.click(loginButton);

    await waitFor(() => expect(screen.getByText(/Something went wrong. Please try again./i)).toBeInTheDocument());
  });  
});
