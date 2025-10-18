import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <img
          src="/sad-coffee.png"
          alt="404 sad coffee cup"
          className="w-1/2 mx-auto mb-4"
        />
        <h1 className="mb-4 text-4xl font-bold text-foreground cursor-default">
          404
        </h1>
        <p className="mb-6 text-xl text-muted-foreground cursor-default">
          ¡Ups! Página no encontrada
        </p>
        <Button onClick={() => navigate("/")}>
          Volver a la página principal
        </Button>
      </div>
    </div>
  );
};

export { NotFound };
