import { useState, useEffect } from "react";
import { /*useLocation,*/ useNavigate } from "react-router-dom";
import DetailedRecipeCard from "../components/DetailedRecipeCard.jsx";
import { getRecipeInformation, getSimilarRecipes } from "../services/apiServices";
import useScrollToTop from "../services/utils.js";

const Recipe = () => {
  //const location = useLocation();
  useScrollToTop()
  const navigate = useNavigate();
  const recipeId = location.state?.recipe?.id;
  const [recipe, setRecipe] = useState(null);


   // Effettua lo scroll verso l'alto ogni volta che cambia la location
  
  // Recupero della ricetta attuale
  useEffect(() => {
    if (recipeId) {
      const fetchRecipe = async () => {
        try {
          const data = await getRecipeInformation(recipeId);
          setRecipe(data);
        } catch (error) {
          console.error("Errore durante il recupero della ricetta:", error);
        }
      };
      fetchRecipe();
    } else {
      navigate("/similar-recipes");
    }
  }, [recipeId, navigate]);

  // Funzione per ottenere ricette simili e navigare verso SimilarRecipes
  const handleSimilarRecipes = async () => {
    try {
      await getSimilarRecipes(recipeId); // Non assegno a `data`
      navigate("/similar-recipes", {
        state: { recipeId, recipeTitle: recipe.title },
      });
    } catch (error) {
      console.error("Errore durante il recupero delle ricette simili:", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 mt-10 mb-20">
        {recipe && <DetailedRecipeCard recipe={recipe} />}
        <button
          onClick={handleSimilarRecipes}
          className="px-4 py-2 mt-4 mx-auto block rounded-md border border-gray-300 bg-[#4CAF50] text-sm font-bold text-white"
          id="similar-recipes_button"
        >
          Similar Recipes
        </button>
      </div>
    </div>
  );
};

export default Recipe;
