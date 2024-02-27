// components/RecipeList.js
import React from 'react';

const RecipeList = ({ recipes }) => {
  return (
    <div>
      {recipes?.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.title}</h2>
          {/* Display other recipe details */}
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
