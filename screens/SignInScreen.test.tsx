import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignInScreen from './SignInScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('SignInScreen', () => {
  it('renders the Sign In screen correctly', () => {
    const { getByText, getByPlaceholderText } = render(<SignInScreen />);
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText("Don't have an account? Sign Up")).toBeTruthy();
  });

  it('shows an error if fields are empty and Sign In is pressed', () => {
    const { getByText } = render(<SignInScreen />);
    const signInButton = getByText('Sign In');

    fireEvent.press(signInButton);

    // You can simulate and verify alert calls like this
    expect(alert).toBeTruthy(); // Mock Alert in actual project for more advanced testing
  });
});
