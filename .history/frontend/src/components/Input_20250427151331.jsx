test("email input renders correctly", () => {
  const { getByLabelText } = render(<YourComponent />);

  // Using getByLabelText to find the email input by its label text
  const emailInput = getByLabelText(/email/i);
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toHaveAttribute("type", "email");
});
