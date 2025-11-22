import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "@/modules/auth/services/login";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

import type { LoginFormData, LoginFormProps } from "./types";

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setLoading(true);

    try {
      const result = await login(data);
      if (result.success) {
        onSuccess?.();
      } else {
        setError(result.error || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error inesperado al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu@email.com"
          {...register("email", {
            required: "El email es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-sm text-destructive cursor-default">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password", {
              required: "La contraseña es requerida",
            })}
            className={errors.password ? "border-destructive" : ""}
          />
          <Button
            type="button"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent hover:text-primary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeIcon className="size-4" />
            ) : (
              <EyeOffIcon className="size-4" />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive cursor-default">
            {errors.password.message}
          </p>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive cursor-default">{error}</p>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>
    </form>
  );
};

export { LoginForm };
