import { Button, Spinner } from "@nextui-org/react";
import { RecipeImage, RecipeTitle, RecipeModal } from "@/components/RecipeCard";
import { useState } from "react";

export const MealGrid = ({ recipes }) => {
  const [modalRecipe, setModalRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState({});
  const [isModalOpen, setModalOpen] = useState({});

  const openModal = (id) => setModalOpen((prev) => ({ ...prev, [id]: true }));
  const closeModal = (id) => setModalOpen((prev) => ({ ...prev, [id]: false }));

  const getData = async (id) => {
    try {
      setIsLoading((prevLoading) => ({ ...prevLoading, [id]: true }));
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const recipe = await response.json();
      setModalRecipe(recipe.meals[0]);
      openModal(id);
    } catch (error) {
    } finally {
      setIsLoading((prevLoading) => ({ ...prevLoading, [id]: false }));
    }
  };

  return (
    <aside className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-3 mt-6">
      {recipes?.map((recipe) => (
        <div
          key={recipe.idMeal}
          className="flex flex-col justify-center items-center bg-white p-2 rounded-md shadow-md border-green-800 border"
        >
          <RecipeImage
            src={recipe?.strMealThumb}
            fallbackSrc="https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGZvb2QlMjBncmFwaGljfGVufDB8fDB8fHww"
            alt={recipe?.strMeal}
          />
          <RecipeTitle title={recipe?.strMeal} />
          <Button
            size="sm"
            className="bg-green-600 text-white rounded my-2"
            onPress={() => {
              getData(recipe.idMeal);
            }}
          >
            {!isLoading[recipe.idMeal] ? "Recipe" : <Spinner />}
          </Button>
          {modalRecipe && isModalOpen[recipe.idMeal] && (
            <CustomModal
              isModalOpen={isModalOpen}
              recipe={modalRecipe}
              closeModal={() => closeModal(recipe.idMeal)}
            />
          )}
        </div>
      ))}
    </aside>
  );
};

function CustomModal({ isModalOpen, recipe, closeModal }) {
  return (
    <section
      className={`${
        isModalOpen ? "flex" : "hidden"
      } flex-col  top-20 fixed z-50 w-[20rem] md:w-[60rem] md:h-[30rem] md:right-40 drop-shadow-2xl bg-white overflow-y-scroll p-4  h-[35rem]`}
    >
      <>
        <h1 className="flex justify-between items-center">
          <p className="font-mono mb-4 underline">
            🥘{recipe?.strCategory} | {recipe?.strArea}
          </p>
          <button className="bg-red-600 p-2" onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </h1>
        <div>
          <h3 className="font-semibold text-lg mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {Object.keys(recipe).map((key) => {
              if (key.startsWith("strIngredient") && recipe[key]) {
                const ingredientKeyNumber = key.replace("strIngredient", "");
                const measureKey = `strMeasure${ingredientKeyNumber}`;
                return (
                  <li key={key}>{`${recipe[key]} - ${recipe[measureKey]}`}</li>
                );
              }
              return null;
            })}
          </ul>
          <h3 className="font-semibold text-lg my-2">📃Instructions:</h3>
          <p className="text-gray-700">{recipe?.strInstructions}</p>
        </div>
      </>
    </section>
  );
}
