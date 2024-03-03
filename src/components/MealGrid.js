import { useDisclosure, Button, Spinner } from "@nextui-org/react";
import { RecipeImage, RecipeTitle, RecipeModal } from "@/components/RecipeCard";
import { useState } from "react";

export const MealGrid = ({ recipes }) => {
    const [modalRecipe, setModalRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState({});
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  
    const getData = async (id) => {
      try {
        setIsLoading((prevLoading) => ({ ...prevLoading, [id]: true }))
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const recipe = await response.json();
        setModalRecipe(recipe.meals[0]);
        onOpen();
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
            {modalRecipe && isOpen && (
              <RecipeModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                recipe={modalRecipe}
                onClose={onClose}
              />
            )}
          </div>
        ))}
      </aside>
    );
  };
  