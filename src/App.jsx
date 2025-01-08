import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import Layout from "./components/Layout";
import AppRoutes from "./routes";
import { PokemonProvider } from "./context/PokemonContext";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="pokemon-theme">
      <PokemonProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
        <Toaster />
      </PokemonProvider>
    </ThemeProvider>
  );
}

export default App;
