type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormProps = { onSuccess?: () => void };

export type { LoginFormData, LoginFormProps };
