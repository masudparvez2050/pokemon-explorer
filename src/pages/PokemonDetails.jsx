import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import { usePokemon } from "../context/PokemonContext";
import { cn } from "../lib/utils";
import PokemonImage from "../components/PokemonImage";
import PokemonInfo from "../components/PokemonInfo";
import { Card, CardContent } from "../components/ui/card";

export default function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addFavorite, removeFavorite } = usePokemon();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      });
  }, [name]);

  if (loading || !pokemon) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="aspect-square relative skeleton rounded-lg" />
          </CardContent>
        </Card>
        <div className="space-y-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 space-y-4">
                  {Array(3)
                    .fill(0)
                    .map((_, j) => (
                      <div key={j} className="h-4 w-full skeleton rounded" />
                    ))}
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button
            variant="default"
            className="gap-2 dark:bg-background/80 bg-white text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </Link>
        <Button
          variant="default"
          size="icon"
          onClick={() =>
            isFavorite(pokemon.name)
              ? removeFavorite(pokemon.name)
              : addFavorite(pokemon.name)
          }
          className="favorite-button"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors ",
              isFavorite(pokemon.name)
                ? "fill-red-500 stroke-red-500"
                : "stroke-current hover:fill-red-500/20"
            )}
          />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <PokemonImage pokemon={pokemon} />
        <PokemonInfo pokemon={pokemon} />
      </div>
    </div>
  );
}
