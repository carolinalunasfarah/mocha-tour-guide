import { Link, useLocation } from "react-router-dom";
import { Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="Mocha logo"
            className="h-10 w-10 transition-transform group-hover:rotate-12"
          />
          <span className="font-semibold text-lg text-foreground">
            Mocha Tour
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/mochas"
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              isActive("/mochas") ? "text-accent" : "text-foreground"
            )}
          >
            Mochas
          </Link>
          <Link
            to="/food"
            className={cn(
              "text-sm font-medium transition-colors hover:text-accent",
              isActive("/food") ? "text-accent" : "text-foreground"
            )}
          >
            Food
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
