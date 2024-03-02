"use client";
import RecipeCard from "@/components/RecipeCard";
import RecipeFormSkeleton from "@/components/Skeleton";
import { Button, Spinner } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function RandomDish() {
  const [isLoading, setIsLoading] = useState(false);
  const [randomMeal, setRandomMeal] = useState(null);

  const fetchRandomDish = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const _randomMeal = await response.json();
      setRandomMeal(_randomMeal.meals[0]);
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomDish();
  }, []);

  return (
    <section className="flex flex-col  justify-center items-center mt-4">
      <div className="flex justify-center items-center gap-2">
        <h1 className=" text-2xl mb-2 bg-white text-green-900 shadow-2xl p-2 rounded-lg border border-green-600">
          {"🍔Random Dish"}
        </h1>
        <Button
          color="success"
          size="md"
          className="p-2"
          onClick={fetchRandomDish}
          disabled={isLoading}
          isIconOnly
        >
          {!isLoading ? (<svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 3 21 3 21 8"></polyline>
            <line x1="4" y1="20" x2="21" y2="3"></line>
            <polyline points="21 16 21 21 16 21"></polyline>
            <line x1="15" y1="15" x2="21" y2="21"></line>
            <line x1="4" y1="4" x2="9" y2="9"></line>
          </svg>) : (<Spinner/>)}
        </Button>
      </div>
        {randomMeal ? (
      <div className="h-[20rem] w-[20rem]">
          <RecipeCard recipe={randomMeal} />
      </div>
        ) : (<div className="mt-8"><RecipeFormSkeleton/></div>)}
    </section>
  );
}
