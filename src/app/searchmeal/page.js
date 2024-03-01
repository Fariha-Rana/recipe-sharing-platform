"use client";
import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import CustomLoader from "@/components/Loader";

const SearchMeal = () => {
  const [meal, setmeal] = useState("");
  const [fetchedMeals, setFetchedMeals] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFetchedMeals(null)
      setloading(true);
      const response = await fetch(
        `https://themealdb.com/api/json/v1/1/search.php?s=${meal}`, 
        // {cache: "no-cache" }

      );
      const data = await response.json();
      setFetchedMeals(data.meals);
    } catch (err) {
      setError(err.message);
    } finally {
      setloading(false);
      setmeal("")
    }
  };

  return (
    <section className="h-full mt-4">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center gap-4  p-4"
      >
        <div className="search ">
          <input placeholder="Search for cuisin..." type="text" />
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
          {"Meals list will appear here!"}
        </p>
      )}
      {loading && <CustomLoader />}

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mx-6 my-8">
        {fetchedMeals?.map((_meal, index) => (
          <div key={index}>
            <RecipeCard recipe={_meal} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchMeal;
