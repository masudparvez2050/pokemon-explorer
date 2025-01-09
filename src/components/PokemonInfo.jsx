import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { cn } from "../lib/utils";
import PropTypes from "prop-types";

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

export default function PokemonInfo({ pokemon }) {
  return (
    <div className="space-y-6">
      <Card className="pokemon-card animate-fade-left">
        <CardHeader>
          <CardTitle className="text-4xl mt-[-15px] mb-5 capitalize pokemon-font text-yellow-500 text-outline">
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

      <Card className="pokemon-card animate-fade-left">
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

      <Card className="pokemon-card animate-fade-left">
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
  );
}

PokemonInfo.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    abilities: PropTypes.arrayOf(
      PropTypes.shape({
        ability: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        base_stat: PropTypes.number.isRequired,
        stat: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};
