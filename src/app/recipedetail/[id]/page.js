// pages/recipe/[id].js
import React from 'react';

const RecipeDetails = ({ recipe }) => {
  return (
    <div>
      <h1>{recipe.title}</h1>
      {/* Display other recipe details */}
    </div>
  );
};

export default RecipeDetails;
