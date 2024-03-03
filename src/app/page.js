"use client";
import { useState, useEffect } from "react";
import { MealGrid } from "@/components/MealGrid";
import CustomSkeleton from "@/components/Skeleton";

const foodCategories = [
  "Starter",
  "Chicken",
  "Breakfast",
  "Vegan",
  "Vegetarian",
  "Pasta",
  "Lamb",
  "Seafood",
  "Dessert",
  "Side",
  "Miscellaneous",
];

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Chicken");
  const [categoryRecipes, setCategoryRecipes] = useState([]);
  const [loader, setLoader] = useState("Initial_Loading");

  async function getData() {
    try {
      setLoader("Further_Loading");
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      );
      const _categoryRecipes = await response.json();
      setCategoryRecipes(_categoryRecipes.meals);
    } catch (error) {
      return null;
    } finally {
      setLoader("");
    }
  }

  useEffect(() => {
    getData();
  }, [selectedCategory]);

  return (
    <section className="flex flex-col justify-center items-center">
      <h4 className="p-2 text-xs rounded-md bg-yellow-300 border border-green-600 w-max m-4 text-green-700">
        Select a category to get Recipes👨‍🍳
      </h4>
      <div className="grid  md:grid-cols-6  grid-cols-3 sm:grid-cols-4 gap-2 text-center mx-2">
        {foodCategories.map((category, i) => (
          <aside className="flex justify-center items-center" key={i}>
            <span
              className={`cursor-pointer px-3 py-1 border  border-white text-white font-mono text-lg rounded-lg ${
                category == selectedCategory ? "bg-red-700" : "bg-green-800"
              }`}
              key={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </span>
          </aside>
        ))}
      </div>

      {loader == "Initial_Loading" || loader == "Further_Loading" ? (
        <CustomSkeleton />
      ) : (
        <MealGrid recipes={categoryRecipes} />
      )}
    </section>
  );
}

export default Home;
