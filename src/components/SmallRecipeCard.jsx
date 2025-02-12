import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { filterDiets, filterDishTypes } from "../services/utils";

const SmallRecipeCard = ({ recipe }) => {
  const [isHovered, setIsHovered] = useState(false); // Stato per gestire il hover
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`, { state: { recipe } });
  };

  const filteredDiets = recipe.diets ? filterDiets(recipe.diets) : [];
  const filteredDishTypes = recipe.dishTypes ? filterDishTypes(recipe.dishTypes) : [];

  return (
    <div
      className="relative flex flex-col justify-between cursor-pointer overflow-hidden text-center rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white w-[300px] h-[350px]"
      onClick={handleCardClick}
    >
      {/* Immagine */}
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-[200px] object-cover rounded-t-xl"
      />

      {/* Contenuto */}
      <div className="p-4 flex flex-col items-center">
        {/* Titolo */}
        <h5
          className="text-lg font-bold text-gray-800 mb-2 px-2 line-clamp-1"
          title={recipe.title} // Imposta il titolo completo
          onMouseEnter={() => setIsHovered(true)} // Imposta isHovered a true quando il mouse è sopra
          onMouseLeave={() => setIsHovered(false)} // Imposta isHovered a false quando il mouse lascia
        >
          {recipe.title}
        </h5>

        {/* Tooltip personalizzato */}
        {isHovered && (
          <div className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white py-1 px-2 text-sm rounded-md z-10 whitespace-nowrap">
            {recipe.title}
          </div>
        )}

        {/* Sezione Diete (con placeholder per mantenere altezza costante) */}
        <div className="flex flex-wrap justify-center gap-4 mt-2 h-[24px]">
  {filteredDiets.length > 0 ? (
    filteredDiets.map((diet) => (
      <span
        key={diet}
        className="text-sm text-gray-700 capitalize font-medium"
      >
        {diet}
      </span>
    ))
  ) : null}
</div>

        {/* Tipo di piatto (con placeholder per mantenere altezza costante) */}
        <div className="flex flex-wrap justify-center gap-1 mt-2 h-[24px]">
          {filteredDishTypes.length > 0 ? (
            <span className="text-sm text-gray-500 capitalize font-medium">
              {filteredDishTypes[0]}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SmallRecipeCard;
