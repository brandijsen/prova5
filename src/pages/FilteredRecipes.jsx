import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import { getRecipesByDiet } from "../services/apiServices";
import SmallRecipeCard from "../components/SmallRecipeCard.jsx";
import Footer from "../components/Footer.jsx";

const FilteredRecipes = () => {
  const { diet } = useParams(); // Ottieni il parametro "diet" dalla URL
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipesByDiet(diet); // Chiamata API per ottenere le ricette
        setRecipes(data);
        console.log("Ricette ricevute:", data); // Mostra le ricette in console
      } catch (err) {
        console.error("Errore durante il caricamento delle ricette:", err); // Mostra l'errore in console
      } 
    };

    fetchRecipes();
  }, [diet]);


  return (
    <>
      <Header />

      <div className="container min-h-screen flex flex-col mx-auto mt-8 px-4">
        <h2 className="text-2xl font-semibold my-4">
          {diet
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          recipes
          <small className="text-red-500"> ({recipes.length})</small>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="mb-4">
              <SmallRecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FilteredRecipes;
