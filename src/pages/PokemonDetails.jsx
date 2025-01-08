import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Heart, ArrowLeft } from "lucide-react";
import { usePokemon } from "../context/PokemonContext";
import { cn } from "../lib/utils";

const typeColors = {
  normal: "bg-zinc-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-300",
  fighting: "bg-red-600",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-blue-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-700",
  ghost: "bg-purple-600",
  dragon: "bg-purple-700",
  dark: "bg-zinc-700",
  steel: "bg-zinc-500",
  fairy: "bg-pink-400",
};

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

  const bgStyle = {
    backgroundImage: `url(${pokemon.sprites.other["official-artwork"].front_default})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </Link>
        <Button
          variant="ghost"
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
              "h-5 w-5 transition-colors",
              isFavorite(pokemon.name)
                ? "fill-red-500 stroke-red-500"
                : "stroke-current hover:fill-red-500/20"
            )}
          />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="pokemon-card overflow-hidden">
          <CardContent className="p-6">
            <div
              className="aspect-square relative rounded-lg overflow-hidden"
              style={bgStyle}
            >
              <div className="absolute inset-0 bg-black/10" />
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                className="w-full h-full object-contain relative z-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="pokemon-card">
            <CardHeader>
              <CardTitle className="capitalize text-3xl">
                {pokemon.name}
              </CardTitle>
              <div className="flex gap-2 mt-2">
                {pokemon.types.map(({ type }) => (
                  <Badge
                    key={type.name}
                    className={cn("capitalize", typeColors[type.name])}
                  >
                    {type.name}
                  </Badge>
                ))}
              </div>
            </CardHeader>
          </Card>

          <Card className="pokemon-card">
            <CardHeader>
              <CardTitle>Abilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map(({ ability }) => (
                  <Badge
                    key={ability.name}
                    variant="outline"
                    className="capitalize"
                  >
                    {ability.name.replace("-", " ")}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="pokemon-card">
            <CardHeader>
              <CardTitle>Base Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pokemon.stats.map(({ base_stat, stat }) => (
                <div key={stat.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium capitalize">
                      {stat.name.replace("-", " ")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {base_stat}
                    </span>
                  </div>
                  <Progress value={base_stat} max={255} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
