import { Card, CardContent } from "./ui/card";
import PropTypes from 'prop-types';

export default function PokemonImage({ pokemon }) {
    const bgStyle = {
        backgroundImage: `url(${pokemon.sprites.other["official-artwork"].front_default})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
  return (
    <Card className="pokemon-card overflow-hidden">
      <CardContent className="p-6">
        <div
          className="aspect-square relative rounded-lg overflow-hidden"
          style={bgStyle}
        >
          <div className="absolute inset-0 bg-black/10" />
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-full h-full object-contain relative z-10"
          />
        </div>
      </CardContent>
    </Card>
  );
}

PokemonImage.propTypes = {
    pokemon: PropTypes.shape({
        name: PropTypes.string.isRequired,
        sprites: PropTypes.shape({
            other: PropTypes.shape({
                "official-artwork": PropTypes.shape({
                    front_default: PropTypes.string.isRequired
                }).isRequired
            }).isRequired
        }).isRequired
    }).isRequired
}