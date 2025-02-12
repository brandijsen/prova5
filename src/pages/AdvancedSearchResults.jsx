import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmallRecipeCard from "../components/SmallRecipeCard";

const AdvancedSearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];
  const { query, diet, maxCalories, dishType, excludeIngredients, highHealthScore } = location.state || {};

  // Log per fare il debug
  console.log("Received Parameters:", { query, diet, maxCalories, dishType, excludeIngredients, highHealthScore });

  // Costruzione dinamica del titolo basato sui parametri
  const selectedParameters = [
    query && `"${query}"`,
    diet && `${diet}`,
    maxCalories && `Max ${maxCalories} kcal`,
    dishType && `${dishType}`,
    excludeIngredients && `exclude: ${excludeIngredients}`,
    highHealthScore && "Healthy",
  ]
    .filter(Boolean) // Rimuove i valori falsi (null, undefined, "")
    .join(" | "); // Unisce i parametri con un separatore

  return (
    <div>
      <Header />
      <div className="container min-h-screen mx-auto px-4 mt-4">
        <h2 className="mb-4 text-xl font-semibold">
          Results for: <br />
          {selectedParameters || "your search"}{" "}
          <small className="text-red-500">({results.length})</small>
        </h2>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((recipe) => (
              <div key={recipe.id} className="mb-4">
                <SmallRecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-4 text-gray-500">
            No results found. Please refine your search.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdvancedSearchResults;
