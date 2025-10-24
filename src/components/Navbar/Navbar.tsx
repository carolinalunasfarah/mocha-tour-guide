import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary-foreground">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/icons/logo-cream.png"
            alt="Mocha tour logo"
            className="h-10 w-10 transition-transform group-hover:rotate-12"
          />
          <span className="text-base font-semibold md:text-lg text-primary">
            Mocha Tour
          </span>
        </Link>

        <div className="flex items-center gap-8">
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
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
