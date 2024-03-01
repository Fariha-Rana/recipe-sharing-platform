"use client"
import React, { useState } from 'react';

const RecipeCard = ({ recipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={` bg-white rounded-xl shadow-xl`}>
      <img className="h-48 w-full object-cover rounded-xl" src={recipe.strMealThumb} alt={recipe.strMeal} />

      <div className="p-6">
        <h2 className="font-bold text-xl mb-2">{recipe.strMeal}</h2>
        <button className="bg-blue-500  px-4 py-2 rounded" onClick={openModal}>
          View Recipe
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 z-50   overflow-auto m-16">
          <div className=" p-4   bg-gray-500 border rounded-md shadow-lg">
              <button className="text-red-700" onClick={closeModal}>
                Close
              </button>
              <p className="text-gray-600 mb-4">{recipe.strCategory} | {recipe.strArea}</p>
              <h3 className="font-semibold text-lg mb-2">Ingredients:</h3>
              <ul className="list-disc list-inside">
                {Object.keys(recipe).map(key => {
                  if (key.startsWith('strIngredient') && recipe[key]) {
                    const ingredientKeyNumber = key.replace('strIngredient', '');
                    const measureKey = `strMeasure${ingredientKeyNumber}`;
                    return <li key={key}>{`${recipe[key]} - ${recipe[measureKey]}`}</li>;
                  }
                  return null;
                })}
              </ul>
              <h3 className="font-semibold text-lg mb-2">Instructions:</h3>
              <p className="text-gray-700">{recipe.strInstructions}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
