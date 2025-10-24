import { RotateCw, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StateComponentProps } from "./types";

const StateComponent = ({
  state,
  message,
  className,
  showGoBackButton = false,
  onGoBack,
  goBackButtonText = "Inicio",
}: StateComponentProps) => {
  return (
    <div
      className={cn(
        "flex min-h-[calc(100vh-200px)] flex-col items-center justify-center gap-6",
        className
      )}
    >
      {state === "loading" && (
        <RotateCw className="size-12 animate-spin text-primary" />
      )}
      {state === "error" && <TriangleAlert className="size-12" />}
      <p className="cursor-default text-lg font-medium text-foreground">
        {message}
      </p>

      {state === "error" && showGoBackButton && onGoBack && (
        <Button onClick={onGoBack} className="gap-2" size="lg">
          Volver a {goBackButtonText}
        </Button>
      )}
    </div>
  );
};

export { StateComponent };
