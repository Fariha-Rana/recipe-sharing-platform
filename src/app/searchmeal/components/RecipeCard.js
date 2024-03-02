import Link from "next/link";
import { Image } from "@nextui-org/image";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react"

const RecipeCard = ({ recipe }) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  return (
    <div className={`flex flex-col justify-between pb-2 rounded-xl shadow-xl bg-red-600 text-white h-[30rem]`}>
      <Image
        loading="eager"
        className="object-fill h-78 w-full "
        src={recipe?.strMealThumb}
        fallbackSrc="https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGZvb2QlMjBncmFwaGljfGVufDB8fDB8fHww"
        alt={recipe?.strMeal}
      />
        <p className="bg-yellow-400 w-max text-sm text-neutral p-1 rounded-md m-4 text-center">
          🍽️{recipe?.strArea}
        </p>
        <h2 className="font-bold text-sm  m-2 h-10">
          🥘{recipe?.strMeal}
        </h2>
      <div className=" flex gap-2 mx-4 items-center">
        <Button
          className="bg-green-600 text-sm  py-1 px-2 rounded my-2"
          onPress={onOpen}
        >
          Recipe
        </Button>
       {recipe?.strYoutube && (
        <Link href={recipe?.strYoutube} target="_blank" className="bg-white px-1 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="30px"
            height="30px"
            fill="#FF0000"
          >
            <path d="M46.5 12.7c-.4-1.6-1.7-2.9-3.3-3.3C40.6 8 24 8 24 8s-16.6 0-19.2 1.4c-1.6.4-2.9 1.7-3.3 3.3C.9 15.3.6 18 .6 24s.3 8.7.9 11.3c.4 1.6 1.7 2.9 3.3 3.3C7.4 39.1 24 39.1 24 39.1s16.6 0 19.2-1.4c1.6-.4 2.9-1.7 3.3-3.3.6-2.6.9-8.7.9-11.3s-.3-8.7-.9-11.3zM20 30V18l10 6-10 6z" />
          </svg>
        </Link>
       )}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}  scrollBehavior={"inside"}   placement={"top-center"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"> <p className="font-mono mb-4 underline">
                🥘{recipe?.strCategory} | {recipe?.strArea}
              </p></ModalHeader>
              <ModalBody>
              <h3 className="font-semibold text-lg mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside">
              {Object.keys(recipe).map((key) => {
                if (key.startsWith("strIngredient") && recipe[key]) {
                  const ingredientKeyNumber = key.replace("strIngredient", "");
                  const measureKey = `strMeasure${ingredientKeyNumber}`;
                  return (
                    <li
                      key={key}
                    >{`${recipe[key]} - ${recipe[measureKey]}`}</li>
                  );
                }
                return null;
              })}
            </ul>
            <h3 className="font-semibold text-lg my-2">📃Instructions:</h3>
            <p className="text-gray-700">{recipe?.strInstructions}</p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RecipeCard;
