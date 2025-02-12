import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import SmallRecipeCard from "../components/SmallRecipeCard.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const SearchResult = () => {
  const location = useLocation();
  const query = location.state?.query || ""; // Ottiene la query passata tramite state

  // Usa useMemo per memorizzare il valore di results ed evitare cambiamenti a ogni render
  const results = useMemo(() => location.state?.results || [], [location.state?.results]);

  // Stato per gestire il caricamento
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (results.length > 0 || query === "") {
      setLoading(false);
    }
  }, [results, query]); // Ora results è stabile grazie a useMemo

  return (
    <div>
      <Header />
      <div className="container min-h-screen flex flex-col mx-auto px-4 mt-4">
        <h2 className="mb-4 text-xl font-semibold">
          Results for "{query}" 
          <small className="text-sm text-gray-500"> ({results.length})</small>
        </h2>

        {/* Mostra i risultati solo dopo il caricamento */}
        {!loading && (
          results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((recipe) => (
                <div key={recipe.id} className="mb-4">
                  <SmallRecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-4 text-gray-500">
              No recipes found for "{query}".
            </p>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResult;
