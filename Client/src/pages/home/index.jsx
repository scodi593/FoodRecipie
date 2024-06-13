import { useContext, useState } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-item";
import Navbar from "../../components/navbar";
import "./i.css";

export default function Home() {
  const { recipeList, loading } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;

  if (loading) return <div>Loading... Please wait!</div>;

  // Calculate the index of the last recipe to be displayed on the current page
  const indexOfLastRecipe = currentPage * recipesPerPage;
  // Calculate the index of the first recipe to be displayed on the current page
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  // Slice the recipeList array to get the recipes for the current page
  const currentRecipes = recipeList.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the total number of pages
  const totalPages = Math.ceil(recipeList.length / recipesPerPage);

  // Calculate which page numbers to display
  const pageNumbers = [];
  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 2) {
      for (let i = 1; i <= 3; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage >= totalPages - 1) {
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {currentRecipes && currentRecipes.length > 0 ? (
          currentRecipes.map((item) => <RecipeItem key={item.id} item={item} />)
        ) : (
          <div>
            <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
              Nothing to show. Please search something
            </p>
          </div>
        )}
      </div>
      {/* Pagination controls */}
      <ul className="pagination">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-link"
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-link"
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}
