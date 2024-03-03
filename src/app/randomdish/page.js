"use client";
import { RandomSvg } from "@/components/RandomSvg";
import RecipeCard from "@/components/RecipeCard";
import  { SingleSkeleton } from "@/components/Skeleton";
import { Button, Spinner } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function RandomDish() {
  const [isLoading, setIsLoading] = useState(false);
  const [randomMeal, setRandomMeal] = useState(null);

  const fetchRandomDish = async () => {
    try {
      setIsLoading(true);
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
    <section className="flex flex-col  justify-center items-center lg:mt-4 mt-8">
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
          {!isLoading ? <RandomSvg /> : <Spinner />}
        </Button>
      </div>
      {randomMeal ? (
        <div className="h-[20rem] w-[20rem]">
          <RecipeCard recipe={randomMeal} />
        </div>
      ) : (
        <div className="mt-8">
          <SingleSkeleton />
        </div>
      )}
    </section>
  );
}
