import PokemonCard from "./PokemonCard";
import PropTypes from "prop-types";

export default function PokemonList({ paginatedPokemon }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
      {paginatedPokemon.map((pokemon, i) => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
          style={{
            animationDelay: `${(i + 1) * 100}ms`,
            opacity: 0,
            animation: `fade-up 600ms ease-out ${(i + 1) * 200}ms forwards`,
          }}
        />
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
