import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Search, ArrowUpDown } from "lucide-react";
import { cn } from "../lib/utils";
import PropTypes from 'prop-types';

export default function SearchBar({
  search,
  setSearch,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) {
  return (
    <div className="search-container">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Pokémon..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="pl-8 bg-background/50 border-primary/20 focus:border-primary/50 text-muted-foreground"
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={sortBy}
            onValueChange={setSortBy}
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
  );
}

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
};