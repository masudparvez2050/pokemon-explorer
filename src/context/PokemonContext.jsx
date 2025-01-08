import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const PokemonContext = createContext(undefined);

export function PokemonProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("pokemon-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("pokemon-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (name) => {
    setFavorites((prev) => [...prev, name]);
    toast.success(`${name} added to favorites!`);
  };

  const removeFavorite = (name) => {
    setFavorites((prev) => prev.filter((pokemon) => pokemon !== name));
    toast.success(`${name} removed from favorites!`);
  };

  const isFavorite = (name) => favorites.includes(name);

  return (
    <PokemonContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
}
