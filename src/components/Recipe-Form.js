"use client"
import React, { useState } from "react";
import RecipeCard from "./RecipeCard";

const RecipeForm = () => {
  const [meal, setmeal] = useState("");
  const [fetchedMeals, setFetchedMeals] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    const data = await response.json()
    setFetchedMeals(data.meals)
    console.log(typeof data.meals)
  };

  return (
    <form onSubmit={handleSubmit} className=" h-full flex-col flex justify-center items-center gap-4 bg-gray-800 p-4">
      <input value={meal} type="text" onChange={(e) => setmeal(e.target.value)}/>
      <button type="submit">Get meal</button>
     <div className="grid grid-cols-3 gap-4">
     {fetchedMeals?.map((_meal, index ) => (
        <div key={index} ><RecipeCard recipe={_meal}/></div>
      ))}
     </div>
    </form>
  );
};

export default RecipeForm;
