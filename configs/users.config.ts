/**
 * User credentials configuration for different test scenarios
 */
export interface UserCredentials {
  username: string;
  password: string;
  role: string;
}

export const testUsers = {
  manager: {
    username: 'democsr',
    password: 'crmsfa',
    role: 'Sales Manager'
  },
  invalidUser: {
    username: 'invaliduser',
    password: 'wrongpass',
    role: 'Invalid User'
  }
} as const;

export type UserType = keyof typeof testUsers;
