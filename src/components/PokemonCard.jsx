import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { usePokemon } from "../context/PokemonContext";
import { cn } from "../lib/utils";
import PropTypes from "prop-types";

const getImageUrl = (url) => {
  const id = url.split("/")[6];
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export default function PokemonCard({ pokemon }) {
  const { isFavorite, addFavorite, removeFavorite } = usePokemon();

  return (
    <div className="card-container">
      <div className="card-flipper">
        <div className="front ">
          <Card className="overflow-hidden group pokemon-card card-hover relative animate-fade-up animate-once animate-ease-in">
            <CardContent className="p-0 flex items-center justify-center">
              <img
                src="/pokemon_card.jpg"
                alt={pokemon.name}
                className="w-full h-full object-contain "
                loading="lazy"
              />
            </CardContent>
          </Card>
          <p className="absolute bottom-0 left-0 right-0 text-center text-xl capitalize text-yellow-500 text-outline bg-background/40 backdrop-blur rounded-b-md p-2 animate-fade-up animate-once animate-ease-in pokemon-font  shadow-md ">
            {pokemon.name}
          </p>
        </div>
        <div className="back md:mt-[-600px] lg:mt-[-400px] mt-[-140%]">
          <Card className="overflow-hidden group pokemon-card card-hover relative">
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
            <CardContent className="p-6">
              <div className="aspect-square relative">
                <img
                  src={getImageUrl(pokemon.url)}
                  alt={pokemon.name}
                  className="w-full h-full object-contain bounce-animation "
                  loading="lazy"
                />
              </div>
              <h2 className="text-xl font-semibold capitalize text-center mb-4 pokemon-font text-yellow-500 text-outline">
                {pokemon.name}
              </h2>
              {pokemon.details && (
                <div className="mt-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  capitalize">
                      HP:{" "}
                      {
                        pokemon.details.stats.find((s) => s.stat.name === "hp")
                          ?.base_stat
                      }
                    </span>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  capitalize">
                      ATK:{" "}
                      {
                        pokemon.details.stats.find(
                          (s) => s.stat.name === "attack"
                        )?.base_stat
                      }
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Link to={`/pokemon/${pokemon.name}`} className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    details: PropTypes.shape({
      stats: PropTypes.arrayOf(
        PropTypes.shape({
          stat: PropTypes.shape({
            name: PropTypes.string.isRequired,
          }).isRequired,
          base_stat: PropTypes.number.isRequired,
        })
      ),
    }),
  }).isRequired,
};
