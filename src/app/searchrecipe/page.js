"use client";
import React, { useState } from "react";
import RecipeCard from "../../components/RecipeCard";
import CustomSkeleton from "@/components/Skeleton";

const SearchRecipe = () => {
  const [meal, setmeal] = useState("");
  const [fetchedMeals, setFetchedMeals] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (error) setError("");
      setFetchedMeals(null);
      setloading(true);
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`
      );
      const data = await response.json();
      if (!data.meals) {
        throw new Error(`no recipe found for ${meal}`);
      }
      setFetchedMeals(data?.meals);
    } catch (err) {
      setError(err.message);
    } finally {
      setloading(false);
      setmeal("");
    }
  };

  return (
    <section className="h-full mt-4">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center gap-4  p-4"
      >
        <div className="search ">
          <input
            placeholder="search meal by name..."
            type="text"
            onChange={(e) => setmeal(e.target.value)}
            value={meal}
          />
          <button type="submit">Go</button>
        </div>
      </form>
      {error && (
        <p className="text-center text-lg text-white  mt-20 p-4 bg-red-700">
          {error}
        </p>
      )}

      {!fetchedMeals && !error && !loading && (
        <p className="text-center text-lg text-white bg-green-600 mt-20 p-4">
          {"Recipes list will appear here!"}
        </p>
      )}

      {loading && <CustomSkeleton />}

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mx-6  my-2 p-4">
        {fetchedMeals?.map((_meal, index) => (
          <div key={index}>
            <RecipeCard recipe={_meal} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchRecipe;
