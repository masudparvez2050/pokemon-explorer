import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";

export default function EmptyFavorites() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] op w-full space-y-4 bg-white/40 dark:bg-background/60 backdrop-blur rounded-md">
      <Heart className="h-16 w-16 text-muted-foreground" />
      <h2 className="text-2xl font-semibold">No Favorites Yet</h2>
      <p className="text-muted-foreground">
        Start adding some Pokémon to your favorites!
      </p>
      <Link to="/">
        <Button>Browse Pokémon</Button>
      </Link>
    </div>
  );
}