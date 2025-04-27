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

  test('password field shows error when left empty', async () => {
    const handleChange = jest.fn();
    render(
      <Input 
        label="Password" 
        type="password" 
        id="password" 
        placeholder="••••••••"
        value="" 
        onChange={handleChange} 
        error="Password is required"
      />
    );
  
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.blur(passwordInput);
  
    const errorMessage = await screen.findByText(/Password is required/i);
    expect(errorMessage).toBeInTheDocument();
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

  test('redirects to login on successful registration', async () => {
    render(<RegisterPage />);
  
    const assignMock = jest.fn();
    const originalLocation = window.location;
    delete window.location;
    window.location = { href: "", assign: assignMock };  

    fireEvent.change(screen.getByPlaceholderText('johndoe718'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'testuser@example.com' } });
    fireEvent.change(screen.getAllByLabelText(/password/i)[0], { target: { value: 'password123' } });
    fireEvent.change(screen.getAllByLabelText(/password/i)[1], { target: { value: 'password123' } });
  
    fireEvent.click(screen.getByText('Register'));
  
    await waitFor(() => {
      expect(window.location.href).toBe("/login");  // Check the href redirection
    });
  
    window.location = originalLocation;
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
