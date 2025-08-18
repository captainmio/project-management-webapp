import { apiBase } from "./base";

interface SignupData {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  name: string;
  email: string;
}
interface SignUpSuccessResponse {
  data: SignupData;
  success: boolean;
}

export const signUp = async (name: string, email: string, password: string): Promise<SignUpSuccessResponse> => {
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



interface LoginSuccessResponse {
  data: unknown;
  success: boolean;
}
export const login = async (email: string, password: string): Promise<LoginSuccessResponse> => {
  const response = await fetch(`${apiBase}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  return data;
};