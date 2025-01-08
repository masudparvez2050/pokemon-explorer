import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Heart, Home } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-between md:justify-start">
          <Link
            to="/"
            className="flex items-center space-x-2 transition-transform hover:scale-105"
          >
            <img
              src="/pokemon.png"
              alt="Pokémon Explorer"
              className="h-8 w-8 text-primary"
            />
            <span className=" dark:text-gray-300 font-bold text-md md:text-xl">
              Pokémon Explorer
            </span>
          </Link>
          <nav className="flex items-center space-x-4 md:ml-6">
            <Link
              to="/"
              className={cn(
                "transition-all hover:text-primary",
                location.pathname === "/"
                  ? "text-primary"
                  : "text-foreground/60"
              )}
            >
              <Button variant="ghost" className="gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </Link>
            <Link
              to="/favorites"
              className={cn(
                "transition-all hover:text-primary",
                location.pathname === "/favorites"
                  ? "text-primary"
                  : "text-foreground/60"
              )}
            >
              <Button variant="ghost" className="gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Favorites</span>
              </Button>
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
