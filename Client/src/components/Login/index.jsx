import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/Home";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
	
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to the Mitt Arv Assign</h1>
        <p className="text-gray-600">© 2024 Sathvika</p>
      </div>
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="w-1/2 py-12 px-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Login to Your Account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {error && <div className="text-red-600">{error}</div>}
            <button type="submit" className="w-full bg-blue-500 text-white font-bold py-3 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Sign In
            </button>
          </form>
        </div>
        <div className="w-1/2 bg-gradient-to-r from-green-400 to-blue-500 py-12 px-10 text-white flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-6">New Here?</h1>
          <Link to="/signup" className="text-blue-100 hover:text-blue-200">
            <button type="button" className="bg-white text-blue-500 font-bold py-3 px-6 rounded-md transition duration-300 hover:bg-gray-200 hover:text-blue-600 focus:outline-none focus:bg-gray-200 focus:text-blue-600">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
