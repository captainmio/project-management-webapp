import { apiBase } from "./base";

export const signUp = async (name: string, email: string, password: string): Promise<void> => {
  const response = await fetch(`${apiBase}/api/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to sign up');
  }

  return response.json();
}