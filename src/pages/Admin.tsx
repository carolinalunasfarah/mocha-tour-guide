import { useNavigate } from "react-router-dom";

import { logout } from "@/modules/auth/services/logout";

import { Button } from "@/components/ui/Button";
import { DataForm } from "@/components/DataForm";

import { LogOut } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background pt-16 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-primary cursor-default">
            Panel de Administración
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Cerrar sesión</span>
          </Button>
        </div>

        <DataForm />
      </div>
    </div>
  );
};

export { Admin };
