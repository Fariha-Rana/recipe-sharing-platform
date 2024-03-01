import React, { useState } from "react";

const RecipeCard = ({ recipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={`rounded-xl shadow-xl bg-gray-100`}>
      <img
        className="h-48 w-full object-cover rounded-xl"
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />

      <div className="p-4 ">
        <p className="text-gray-600 my-2 ">
        🍽️{recipe.strCategory} | {recipe.strArea}
        </p>
        <h2 className="font-bold md:text-xl text-sm  my-2">🥘{recipe.strMeal}</h2>
        <button
          className="bg-green-600 text-gray-300  px-3 py-2 rounded my-2"
          onClick={openModal}
        >
          View Recipe
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 rounded-md overflow-auto md:m-16 m-12 font-serif">
          <div className="modal px-6 py-4">
             <div className="flex justify-between ">
              <p className="font-mono mb-4 underline">
              🥘{recipe.strCategory} | {recipe.strArea}
              </p>
             <button className="text-black bg-white p-2 border border-black" onClick={closeModal}>
             Close
              </button>
             </div>
              <h3 className="font-semibold text-lg mb-2">Ingredients:</h3>
              <ul className="list-disc list-inside">
                {Object.keys(recipe).map((key) => {
                  if (key.startsWith("strIngredient") && recipe[key]) {
                    const ingredientKeyNumber = key.replace(
                      "strIngredient",
                      ""
                    );
                    const measureKey = `strMeasure${ingredientKeyNumber}`;
                    return (
                      <li
                        key={key}
                      >{`${recipe[key]} - ${recipe[measureKey]}`}</li>
                    );
                  }
                  return null;
                })}
              </ul>
              <h3 className="font-semibold text-lg my-2">Instructions:</h3>
              <p className="text-gray-700">{recipe.strInstructions}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
