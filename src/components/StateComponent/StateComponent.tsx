import { RotateCw, TriangleAlert } from "lucide-react";
import { cn } from "@/utils/styles/cn";
import { Button } from "@/components/ui/Button";
import { StateComponentProps } from "./types";

const StateComponent = ({
  state,
  message,
  className,
  showGoBackButton = false,
  onGoBack,
  goBackButtonText = "Inicio",
  showRetryButton = false,
  onRetry,
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

      {state === "error" && (
        <div className="flex flex-col gap-3 sm:flex-row">
          {showRetryButton && onRetry && (
            <Button onClick={onRetry} className="gap-2" size="lg">
              Reintentar
            </Button>
          )}
          {showGoBackButton && onGoBack && (
            <Button
              onClick={onGoBack}
              className="gap-2"
              size="lg"
              variant="secondary"
            >
              Volver a {goBackButtonText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export { StateComponent };
