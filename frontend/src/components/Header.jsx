import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import { IoIosSearch } from "react-icons/io";
import {useNavigate} from 'react-router-dom'
import { signOutFailure, signOutStart, signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from "react-redux";

const Header = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setLoading(true);
    try {
      dispatch(signOutStart())
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {}, { withCredentials: true });
      
      if(response.success === false){
        dispatch(signOutFailure(resp.message))
        return;
      }
      dispatch(signOutSuccess());
      console.log("Logout successful");
      navigate('/')

    } catch (error) {
      console.error("Logout failed", error.response?.data || error.message);
      dispatch(signOutFailure(error.message))
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="flex w-full justify-between items-center px-4 md:px-16 py-3 shadow-lg border-b border-gray-200 bg-gray-100">
      <div>
        <img src={logo} alt="Logo" />
      </div>

      {/* Search Bar Section */}
      <div className="hidden md:flex border border-gray-400 items-center text-black justify-center bg-white rounded-full px-4 py-2 w-80 mx-4">
        <IoIosSearch size={20} />
        <input
          type="text"
          placeholder="Search for your favorite groups in ATG"
          className="ml-2 bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* Account Section */}
      <div className="flex items-center min-w-10 bg-blue-500 hover:bg-blue-600 py-2 px-2 rounded-xl">
        <button
          className="text-xl md:text-base text-white font-bold ml-2"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
        <span className="ml-2 cursor-pointer">
          <i className="bi bi-caret-down-fill"></i>
        </span>
      </div>
    </header>
  );
};

export default Header;
