import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Favorites from "./pages/favorites";
import Details from "./pages/details";
import Signup from "./components/Singup";
import Login from "./components/Login";

function App() {
  const user = localStorage.getItem("token");
  return (
    <div>
      <div className="min-h-screen p-6 bg-white text-gray-600 text-lg">
          <Routes>
          {user && <Route path="/" exact element={<Home />} />}
			    <Route path="/signup" exact element={<Signup />} />
			    <Route path="/Home" element={<Navigate replace to="/" />} />
          <Route path="/" exact element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipe-item/:id" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

//for test
