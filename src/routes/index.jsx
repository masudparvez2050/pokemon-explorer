import { Routes, Route } from "react-router-dom";

import PokemonDetails from "../pages/PokemonDetails";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:name" element={<PokemonDetails />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}
