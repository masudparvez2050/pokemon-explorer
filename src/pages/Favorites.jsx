import { useState, useEffect } from "react";

import EmptyFavorites from "../components/EmptyFavorites";
import { usePokemon } from "../context/PokemonContext";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Heart } from "lucide-react";

export default function Favorites() {
  const { favorites, removeFavorite } = usePokemon();
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const data = {};
      for (const name of favorites) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        data[name] = await response.json();
      }
      setPokemonData(data);
      setLoading(false);
    };

    if (favorites.length > 0) {
      fetchPokemonData();
    } else {
      setLoading(false);
    }
  }, [favorites]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-6">
      {favorites.map((name) => {
        const pokemon = pokemonData[name];
        if (!pokemon) return null;

        return (
          <div key={name} className="card-container">
            {" "}
            <div className="card-flipper">
              <div className="front ">
                <Card className="overflow-hidden group pokemon-card card-hover ">
                  <CardContent className="p-0 flex items-center justify-center">
                    <img
                      src="/pokemon_card.png"
                      alt={name}
                      className="w-full h-full object-contain "
                      loading="lazy"
                    />
                  </CardContent>
                </Card>
                <p className=" absolute bottom-0 left-0 right-0 text-center text-xl capitalize text-yellow-500 text-outline bg-background/40 backdrop-blur rounded-b-md p-2 animate-fade-up animate-once animate-ease-in pokemon-font  shadow-md ">
                  {pokemon?.name}
                </p>
              </div>
              <div className="back ">
                <Card className="overflow-hidden group pokemon-card animate-fade-right">
                  <CardContent className="p-6">
                    <div className="aspect-square relative">
                      <img
                        src={
                          pokemon.sprites.other["official-artwork"]
                            .front_default
                        }
                        alt={name}
                        className="w-full h-full object-contain transition-transform  bounce-animation"
                      />
                    </div>
                    <h2 className="text-xl font-semibold capitalize text-center mt-4 pokemon-font text-yellow-500 text-outline ">
                      {name}
                    </h2>
                  </CardContent>
                  <CardFooter className="flex justify-between p-6 pt-0">
                    <Link to={`/pokemon/${name}`}>
                      <Button>View Details</Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFavorite(name)}
                    >
                      <Heart className="h-5 w-5 fill-red-500 stroke-red-500" />
                    </Button>
                  </CardFooter>
                </Card>{" "}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
