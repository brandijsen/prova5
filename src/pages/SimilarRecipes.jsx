import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";
import SmallRecipeCard from "../components/SmallRecipeCard.jsx";
import { getSimilarRecipes, getRecipeInformation } from "../services/apiServices";
import Footer from "../components/Footer.jsx";

const SimilarRecipes = () => {
  const location = useLocation();
  const [detailedRecipes, setDetailedRecipes] = useState(null); // Initialize as null
  const recipeId = location.state?.recipeId; // Starting recipe ID
  const recipeTitle = location.state?.recipeTitle; // Starting recipe title

  useEffect(() => {
    const fetchSimilarAndDetails = async () => {
      try {
        const similarRecipes = await getSimilarRecipes(recipeId);

        if (!similarRecipes || similarRecipes.length === 0) {
          console.warn("No similar recipes found");
          setDetailedRecipes([]); // Set state to an empty array to handle the message
          return;
        }

        const detailedData = await Promise.all(
          similarRecipes.map((recipe) =>
            getRecipeInformation(recipe.id).catch((err) => {
              console.error(`Error with recipe ${recipe.id}:`, err);
              return null; // Return null to avoid interruptions
            })
          )
        );

        // Filtra solo le ricette vegetariane
        const vegetarianRecipes = detailedData.filter(
          (data) => data !== null && data.vegetarian
        );

        setDetailedRecipes(vegetarianRecipes);
      } catch (error) {
        console.error("Error retrieving similar recipes:", error);
        setDetailedRecipes([]); // Empty state in case of error
      }
    };

    if (recipeId) {
      fetchSimilarAndDetails(); // Start fetching recipes
    } else {
      console.error("recipeId not found!");
      setDetailedRecipes([]); // Empty state if ID is missing
    }
  }, [recipeId]);

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 mt-4">
        <h2 className="text-2xl font-bold mb-4">
          Similar recipes to "{recipeTitle}"{" "}
          {detailedRecipes && detailedRecipes.length > 0 && (
            <small className="text-red-500">({detailedRecipes.length})</small>
          )}
        </h2>
        {detailedRecipes === null ? (
          // Show nothing if the state is null
          <></>
        ) : detailedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {detailedRecipes.map((recipe) => (
              <div key={recipe.id} className="mb-4">
                <SmallRecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-5 text-gray-500">
            No similar recipes found for the recipe you viewed.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SimilarRecipes;
