"use client";
import React, { useState } from "react";
import RecipeCard from "./RecipeCard";

const SearchMeal = () => {
  const [meal, setmeal] = useState("");
  const [fetchedMeals, setFetchedMeals] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://themealdb.com/api/json/v1/1/search.php?s=${meal}`
      );
      const data = await response.json();
      setFetchedMeals(data.meals);
    } catch (error) {
      `  `;
      alert(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex-col flex justify-center items-center gap-4  p-4"
      >
        <input
          value={meal}
          type="text"
          onChange={(e) => setmeal(e.target.value)}
        />
        <button className="recipe-button" type="submit">
          <span>Search</span>
        </button>
      </form>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mx-6">
        {fetchedMeals?.map((_meal, index) => (
          <div key={index}>
            <RecipeCard recipe={_meal} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchMeal;
