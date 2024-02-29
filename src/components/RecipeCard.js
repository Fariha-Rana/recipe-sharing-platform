import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-md">
      <img className="h-48 w-full object-cover" src={recipe.strMealThumb} alt={recipe.strMeal} />

      <div className="p-6">
        <h2 className="font-bold text-xl mb-2">{recipe.strMeal}</h2>
        <p className="text-gray-600 mb-4">{recipe.strCategory} | {recipe.strArea}</p>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {Object.keys(recipe).map(key => {
              if (key.startsWith('strIngredient') && recipe[key]) {
                const ingredientKeyNumber = key.replace('strIngredient', '');
                const measureKey = `strMeasure${ingredientKeyNumber}`;
                return (
                  <li key={key}>{`${recipe[key]} - ${recipe[measureKey]}`}</li>
                );
              }
              return null;
            })}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Instructions:</h3>
          <p className="text-gray-700">{recipe.strInstructions}</p>
        </div>

        <div>
          <a href={recipe.strSource} className="text-blue-500" target="_blank" rel="noopener noreferrer">Source</a>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
