import { MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-foreground">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/icons/logo-cream.svg"
            alt="Mocha tour logo"
            className="h-10 w-10 transition-transform group-hover:rotate-12"
          />
          <span className="text-base font-semibold md:text-lg text-primary">
            Mocha Tour
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  to="/mochas"
                  className={
                    isActive("/mochas")
                      ? "text-accent font-semibold"
                      : "text-foreground"
                  }
                >
                  Mochas
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/reposteria"
                  className={
                    isActive("/reposteria")
                      ? "text-accent font-semibold"
                      : "text-foreground"
                  }
                >
                  Repostería
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/visitados"
                  className={
                    isActive("/visitados")
                      ? "text-accent font-semibold"
                      : "text-foreground"
                  }
                >
                  Visitados
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/mochas"
              className={
                isActive("/mochas")
                  ? "text-accent font-semibold"
                  : "text-foreground"
              }
            >
              Mochas
            </Link>
            <Link
              to="/reposteria"
              className={
                isActive("/reposteria")
                  ? "text-accent font-semibold"
                  : "text-foreground"
              }
            >
              Repostería
            </Link>
            <Link
              to="/visitados"
              className={
                isActive("/visitados")
                  ? "text-accent font-semibold"
                  : "text-foreground"
              }
            >
              Visitados
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
