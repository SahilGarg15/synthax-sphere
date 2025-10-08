// Mock Auth API Functions
// All functions simulate network delay for realistic UX

import { storage } from '@/utils/localStorage';
import { mockUser, mockMentorUser, mockAdminUser } from '@/data/mockData';
import type { User } from '@/types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface LoginResponse {
  success: boolean;
  user?: User;
  message?: string;
  requiresOTP?: boolean;
}

export interface SignupResponse {
  success: boolean;
  user?: User;
  message?: string;
  requiresOTP?: boolean;
}

export interface OTPResponse {
  success: boolean;
  message?: string;
}

/**
 * Mock login function
 * Backend integration point: POST /api/auth/login
 * 
 * Test Accounts:
 * - Learner: learner@test.com / password123
 * - Mentor: mentor@test.com / password123
 * - Admin: admin@test.com / password123
 */
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  await delay(800); // Simulate network delay

  // Mock validation
  if (!email || !password) {
    return {
      success: false,
      message: 'Email and password are required',
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: 'Invalid credentials',
    };
  }

  // Check for specific test accounts
  let user: User;
  
  if (email.toLowerCase() === 'mentor@test.com' || email.toLowerCase().includes('mentor')) {
    user = { ...mockMentorUser, email };
  } else if (email.toLowerCase() === 'admin@test.com' || email.toLowerCase().includes('admin')) {
    user = { ...mockAdminUser, email };
  } else {
    // Default to learner account
    user = { ...mockUser, email };
  }
  
  storage.setUser(user);

  return {
    success: true,
    user,
    message: 'Login successful',
  };
}

/**
 * Mock signup function
 * Backend integration point: POST /api/auth/signup
 */
export async function signupUser(
  name: string,
  email: string,
  password: string
): Promise<SignupResponse> {
  await delay(1000); // Simulate network delay

  // Mock validation
  if (!name || !email || !password) {
    return {
      success: false,
      message: 'All fields are required',
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: 'Password must be at least 6 characters',
    };
  }

  if (!email.includes('@')) {
    return {
      success: false,
      message: 'Invalid email format',
    };
  }

  // Create new user
  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    role: 'learner',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    bio: '',
    streak: 0,
    badges: [],
    joinedAt: new Date().toISOString(),
  };

  storage.setUser(newUser);

  return {
    success: true,
    user: newUser,
    message: 'Account created successfully',
    requiresOTP: true, // Indicate OTP verification needed
  };
}

/**
 * Mock OTP verification function
 * Backend integration point: POST /api/auth/verify-otp
 */
export async function verifyOTP(email: string, otp: string): Promise<OTPResponse> {
  await delay(600); // Simulate network delay

  // Mock validation - accept any 6-digit OTP
  if (!otp || otp.length !== 6) {
    return {
      success: false,
      message: 'Please enter a valid 6-digit OTP',
    };
  }

  // For demo: "123456" is the correct OTP
  if (otp === '123456') {
    return {
      success: true,
      message: 'Email verified successfully',
    };
  }

  return {
    success: false,
    message: 'Invalid OTP. Please try again.',
  };
}

/**
 * Mock send OTP function
 * Backend integration point: POST /api/auth/send-otp
 */
export async function sendOTP(email: string): Promise<OTPResponse> {
  await delay(500); // Simulate network delay

  console.log(`📧 Mock OTP sent to ${email}: 123456`);

  return {
    success: true,
    message: 'OTP sent successfully. Use 123456 for demo.',
  };
}

/**
 * Mock Google OAuth function
 * Backend integration point: GET /api/auth/google
 */
export async function loginWithGoogle(): Promise<LoginResponse> {
  await delay(1200); // Simulate OAuth flow

  const user = { ...mockUser, email: 'google-user@synthaxsphere.com' };
  storage.setUser(user);

  return {
    success: true,
    user,
    message: 'Google login successful',
  };
}

/**
 * Mock logout function
 * Backend integration point: POST /api/auth/logout
 */
export async function logoutUser(): Promise<{ success: boolean }> {
  await delay(300);
  
  storage.removeUser();
  
  return {
    success: true,
  };
}

/**
 * Get current user from localStorage
 * Backend integration point: GET /api/auth/me
 */
export function getCurrentUser(): User | null {
  return storage.getUser();
}
