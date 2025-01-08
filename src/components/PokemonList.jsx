import PokemonCard from "./PokemonCard";
import PropTypes from "prop-types";

export default function PokemonList({ paginatedPokemon }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
      {paginatedPokemon.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}

PokemonList.propTypes = {
  paginatedPokemon: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
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
    })
  ).isRequired,
};
