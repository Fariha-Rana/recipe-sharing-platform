import RecipeCard from "@/components/RecipeCard";

export const revalidate = 0;

export default async function RandomDish() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const randomMeal = await response.json();
  return (
    <section className="flex flex-col  justify-center items-center mt-4">
    <h1 className=" text-3xl mb-2 bg-white text-green-900 shadow-2xl p-2 rounded-lg border border-green-600">{"🍔Random Dish"}</h1>
      <div className="h-[20rem] w-[20rem]">
        <RecipeCard recipe={randomMeal.meals[0]} />
      </div>
    </section>
  );
}
