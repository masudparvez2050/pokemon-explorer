import { useState, useEffect } from "react";
import Header from "./Header";
import PropTypes from "prop-types";

export default function Layout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate loading for 3 seconds
  }, []);

  return (
    <div className="min-h-screen bg-background pokemon-bg ">
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#26547c] ">
          <img src="/pokemon.gif" alt="Loading..." />
        </div>
      ) : (
        <div className="min-h-screen dark:bg-black/20 bg-white/20  backdrop-blur">
          <Header />
          <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-[2000px] mx-auto">{children}</div>
          </main>
        </div>
      )}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
