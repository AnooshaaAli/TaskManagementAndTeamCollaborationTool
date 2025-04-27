import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';

describe("LoginPage Component", () => {
  test("renders LoginPage component", () => {
    render(<LoginPage />);
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByText(/Log in to your account/i)).toBeInTheDocument();
  });

  test("email field shows error when left empty", () => {
    render(<LoginPage />);
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.blur(emailInput); // Simulate losing focus
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
  });

  test("email field shows error for invalid email format", () => {
    render(<LoginPage />);
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.blur(emailInput);
    expect(screen.getByText(/Email is invalid/i)).toBeInTheDocument();
  });

  test("password field shows error when left empty", () => {
    render(<LoginPage />);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.blur(passwordInput); 
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
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
