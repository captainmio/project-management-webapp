import { apiBase } from "./base";

export const signUp = async (name: string, email: string, password: string): Promise<T> => {
  const response = await fetch(`${apiBase}/api/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  return data
}