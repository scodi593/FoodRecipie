import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/");
      console.log(res.message);
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
      <div className="text-center mb-6">
        
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to the Mitt Arv Assign</h1>
        <p className="text-gray-600">© 2024 Sathvika</p>
      </div>
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="w-1/2 bg-gradient-to-r from-green-400 to-blue-500 py-12 px-10 text-white flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
          <p className="text-blue-100">Already have an account?</p>
          <Link to="/" className="text-blue-100 hover:text-blue-200 mt-4">
            <button type="button" className="bg-white text-blue-500 font-bold py-3 px-6 rounded-md transition duration-300 hover:bg-gray-200 hover:text-blue-600 focus:outline-none focus:bg-gray-200 focus:text-blue-600">
              Sign In
            </button>
          </Link>
        </div>
        <div className="w-1/2 py-12 px-10 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
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
            <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 rounded-md transition duration-300 hover:bg-green-600 focus:outline-none focus:bg-green-600">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
