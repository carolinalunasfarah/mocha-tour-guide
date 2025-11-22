import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/Card";
import { LoginForm } from "@/components/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12 md:px-8">
      <Card className="w-full max-w-md p-6 md:p-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-primary cursor-default">
              Mocha Tour Admin
            </h1>
            <p className="text-sm text-muted-foreground cursor-default">
              Inicia sesión para acceder al panel de administración
            </p>
          </div>

          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </Card>
    </div>
  );
};

export { Login };
