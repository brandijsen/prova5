import { useState, useEffect } from "react";
import { getRecipesByDiet } from "../services/apiServices"; // Importa la tua funzione
import Header from '../components/Header.jsx';
import SmallRecipeCard from "../components/SmallRecipeCard.jsx"; // Importa il componente
import Footer from "../components/Footer.jsx";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]); // Stato per memorizzare le ricette

  useEffect(() => {
    // Funzione per ottenere le ricette vegetariane
    const fetchRecipes = async () => {
      try {
        const vegetarianRecipes = await getRecipesByDiet(); // Chiama la funzione senza parametri
        console.log("Ricette recuperate:", vegetarianRecipes); // Log delle ricette per il controllo
        setRecipes(vegetarianRecipes); // Aggiorna lo stato con le ricette
      } catch (error) {
        console.error("Errore durante il recupero delle ricette:", error);
      }
    };

    fetchRecipes(); // Chiama la funzione al caricamento della pagina
  }, []); // Array vuoto per chiamare solo al primo render

  return (
    <div>
      <Header />
      <div className="container min-h-screen flex flex-col mx-auto mt-8 px-4">
        <h2 className="text-2xl font-bold mb-4">Discover and share delicious and healthy vegetarian recipes</h2>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 px-0">
          {recipes.map((recipe) => (
            <SmallRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
