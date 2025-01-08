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

  console.log("Favorites:", favorites);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {favorites.map((name) => {
        const pokemon = pokemonData[name];
        if (!pokemon) return null;

        return (
          <Card key={name} className="overflow-hidden group pokemon-card">
            <CardContent className="p-6">
              <div className="aspect-square relative">
                <img
                  src={pokemon.sprites.other["official-artwork"].front_default}
                  alt={name}
                  className="w-full h-full object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <h2 className="text-xl font-semibold capitalize text-center mt-4">
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
          </Card>
        );
      })}
    </div>
  );
}
