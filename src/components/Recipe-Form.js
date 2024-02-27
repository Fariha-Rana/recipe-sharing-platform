// components/RecipeForm.js
import React, { useState } from 'react';

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cuisine: '',
    mealType: '',
    dietaryRestrictions: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save recipe to the database
  };

  return (
    <form onSubmit={handleSubmit}>
      // Dropdown for selecting cuisine
<select name="cuisine">
  <option value="italian">Italian</option>
  <option value="mexican">Mexican</option>
  {/* Other cuisine options */}
</select>

// Dropdown for selecting meal type
<select name="mealType">
  <option value="breakfast">Breakfast</option>
  <option value="lunch">Lunch</option>
  {/* Other meal type options */}
</select>

// Checkbox for selecting dietary restrictions
<input type="checkbox" name="vegetarian" /> Vegetarian
<input type="checkbox" name="glutenFree" /> Gluten-free
{/* Other dietary restriction options */}

      <button type="submit">Submit Recipe</button>
    </form>
  );
};

export default RecipeForm;
