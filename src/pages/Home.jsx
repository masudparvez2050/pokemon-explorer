import { useState, useEffect } from "react";
import LoadingCard from "../components/LoadingCard";
import PokemonList from "../components/PokemonList";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 8;

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const data = await response.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (p) => {
            const detailsResponse = await fetch(p.url);
            const details = await detailsResponse.json();
            return { ...p, details };
          })
        );

        setPokemon(detailedPokemon);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const sortPokemon = (pokemonList) => {
    return [...pokemonList].sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy.startsWith("stat-")) {
        const statName = sortBy.replace("stat-", "");
        const statA =
          a.details?.stats.find((s) => s.stat.name === statName)?.base_stat ||
          0;
        const statB =
          b.details?.stats.find((s) => s.stat.name === statName)?.base_stat ||
          0;
        return sortOrder === "asc" ? statA - statB : statB - statA;
      }
      return 0;
    });
  };

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedPokemon = sortPokemon(filteredPokemon);

  const totalPages = Math.ceil(sortedPokemon.length / ITEMS_PER_PAGE);
  const paginatedPokemon = sortedPokemon.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <LoadingCard key={i} />
          ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 ">
      <SearchBar
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <PokemonList paginatedPokemon={paginatedPokemon} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
