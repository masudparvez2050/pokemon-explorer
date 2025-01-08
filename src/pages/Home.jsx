import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Search, Heart, ArrowUpDown } from "lucide-react";
import { usePokemon } from "../context/PokemonContext";
import { cn } from "../lib/utils";

const ITEMS_PER_PAGE = 8;

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const { isFavorite, addFavorite, removeFavorite } = usePokemon();

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

  const LoadingCard = () => (
    <Card className="overflow-hidden group pokemon-card card-hover">
      <CardContent className="p-6">
        <div className="aspect-square relative rounded-lg overflow-hidden">
          <div className="w-full h-full skeleton" />
        </div>
        <div className="mt-4 space-y-3">
          <div className="h-6 w-2/3 mx-auto skeleton rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full skeleton rounded" />
            <div className="h-4 w-3/4 skeleton rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const getImageUrl = (url) => {
    const id = url.split("/")[6];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  };

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
    <div className="space-y-6">
      <div className="search-container">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Pokémon..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 bg-background/50 border-primary/20 focus:border-primary/50 text-muted-foreground"
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={sortBy}
              onValueChange={(value) => {
                setSortBy(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[180px] bg-background/50 text-muted-foreground">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent className=" bg-background/50 backdrop-blur border-0">
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="stat-hp">HP</SelectItem>
                <SelectItem value="stat-attack">Attack</SelectItem>
                <SelectItem value="stat-defense">Defense</SelectItem>
                <SelectItem value="stat-speed">Speed</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setSortOrder((order) => (order === "asc" ? "desc" : "asc"))
              }
              className="bg-background/50 border-primary/20 text-muted-foreground"
            >
              <ArrowUpDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  sortOrder === "desc" && "rotate-180"
                )}
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedPokemon.map((p) => (
          <Card
            key={p.name}
            className="overflow-hidden group pokemon-card card-hover relative"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                isFavorite(p.name)
                  ? removeFavorite(p.name)
                  : addFavorite(p.name)
              }
              className="favorite-button"
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-colors",
                  isFavorite(p.name)
                    ? "fill-red-500 stroke-red-500"
                    : "stroke-current hover:fill-red-500/20"
                )}
              />
            </Button>
            <CardContent className="p-6">
              <div className="aspect-square relative">
                <img
                  src={getImageUrl(p.url)}
                  alt={p.name}
                  className="w-full h-full object-contain transition-transform group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <h2 className="text-xl font-semibold capitalize text-center mt-4">
                {p.name}
              </h2>
              {p.details && (
                <div className="mt-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>
                      HP:{" "}
                      {
                        p.details.stats.find((s) => s.stat.name === "hp")
                          ?.base_stat
                      }
                    </span>
                    <span>
                      ATK:{" "}
                      {
                        p.details.stats.find((s) => s.stat.name === "attack")
                          ?.base_stat
                      }
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Link to={`/pokemon/${p.name}`} className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="bg-background/80 border-primary/20"
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "hidden sm:inline-flex",
                currentPage !== page && "bg-background/80 border-primary/20"
              )}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="bg-background/50 border-primary/20"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
