import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";
import Navbar from "../../components/navbar";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();

      console.log(data);
      if (data?.data) {
        setRecipeDetailsData(data?.data);
      }
    }

    getRecipeDetails();
  }, [id, setRecipeDetailsData]);

  console.log(recipeDetailsData, "recipeDetailsData");

  return (
    <div>
    <Navbar/>
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 md:px-8 lg:px-12">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group shadow-lg">
          <img
            src={recipeDetailsData?.recipe?.image_url}
            alt={recipeDetailsData?.recipe?.title}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 p-6 rounded-xl bg-white shadow-lg">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.recipe?.publisher}
        </span>
        <h3 className="font-bold text-2xl text-gray-900">
          {recipeDetailsData?.recipe?.title}
        </h3>
        <button
          onClick={() => handleAddToFavorite(recipeDetailsData?.recipe)}
          className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider shadow-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition duration-300"
        >
          {favoritesList &&
          favoritesList.length > 0 &&
          favoritesList.findIndex(
            (item) => item.id === recipeDetailsData?.recipe?.id
          ) !== -1
            ? "Remove from favorites"
            : "Add to favorites"}
        </button>
        <div>
          <span className="text-xl font-semibold text-gray-900">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-2 mt-3">
            {recipeDetailsData?.recipe?.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-md font-medium text-gray-700">
                  {ingredient.quantity} {ingredient.unit}
                </span>
                <span className="text-md font-medium text-gray-700">
                  {ingredient.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}
