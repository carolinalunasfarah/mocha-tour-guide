import { useNavigate } from "react-router-dom";
import { useAuth } from "@/modules/auth/hooks/useAuth";

import type { ProtectedRouteProps } from "./types";

import { StateComponent } from "@/components/StateComponent";

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthorized, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <StateComponent state="loading" />;
  }

  if (!isAuthorized) {
    return (
      <StateComponent
        state="error"
        message="No tienes acceso a esta página. Por favor, inicia sesión."
        showGoBackButton
        onGoBack={() => navigate("/login")}
        goBackButtonText="Iniciar sesión"
      />
    );
  }

  return <>{children}</>;
};

export { ProtectedRoute };
