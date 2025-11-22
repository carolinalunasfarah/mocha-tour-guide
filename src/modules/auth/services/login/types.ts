type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  error?: string;
};

export type { LoginRequest, LoginResponse };
