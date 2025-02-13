import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../../assets/loginImg.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        username,
        password,
      });
      console.log("Login Success:", response.data);
      navigate('/home');

    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex items-center justify-center bg-white gap-3 p-4 md:p-8 rounded-lg shadow-sm w-[700px] h-[400px]">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border bg-transparent rounded-lg focus:outline-none"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-gray-700 border bg-transparent rounded-lg focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-black mt-2 text-sm">Don't have an account? <Link to='/signup' className="text-blue-500">Signup</Link></p>
        </div>
        <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-gray-100 rounded-r-xl">
          <img src={img} alt="Placeholder" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
