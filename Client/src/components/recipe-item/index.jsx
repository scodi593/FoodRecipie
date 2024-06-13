import { Link } from "react-router-dom";

export default function RecipeItem({ item }) {
  return (
    <div className="flex flex-col w-80 overflow-hidden p-5 bg-white/90 shadow-2xl gap-5 border rounded-2xl border-gray-200 transition-transform transform hover:scale-105 duration-300">
      <Link to={`/recipe-item/${item?.id}`} className="block">
        <div className="h-40 flex justify-center items-center overflow-hidden rounded-xl shadow-lg">
          <img
            src={item?.image_url}
            alt="recipe item"
            className="block w-full h-full object-cover"
          />
        </div>
        <div className="mt-4">
          <span className="text-sm text-cyan-600 font-semibold">
            {item?.publisher}
          </span>
          <h3 className="font-bold text-2xl truncate text-gray-900 mt-2">
            {item?.title}
          </h3>
          <div
            className="text-sm p-3 mt-5 px-8 rounded-lg uppercase font-medium tracking-wider inline-block shadow-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition duration-300"
          >
            Recipe Details
          </div>
        </div>
      </Link>
    </div>
  );
}
