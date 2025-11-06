import React, { useContext } from "react";
import { logo, logout, moon, sun } from "../Assets";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios"; // Import axios for API calls
import toast from "react-hot-toast";

function Navbar() {
  const { navigate, signedUp, setSignedUp, endpointURL } =
    useContext(AppContext);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await axios.post(
            `${endpointURL}/endpoint/auth/signout`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          toast.success("Logged out successfully");
        } catch (err) {
          if (err.response && err.response.status === 401) {
            toast.error("Your session has expired. Please log in again.");
          } else {
            console.error("Logout failed:", err.message);
            toast.error("Logout failed. Please try again.");
          }
        }
      }
      localStorage.removeItem("token"); // Clear the token
      setSignedUp(false); // Update state
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Logout failed:", err.message);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      <div
        className={`relative py-2 px-5 bg-primary flex items-center justify-between ${
          signedUp === false ? "justify-center" : ""
        }`}
      >
        <Link
          to={signedUp === false ? "/" : "/budget"}
          className={"flex items-center gap-4 font-extrabold text-3xl"}
        >
          <img src={logo} alt="logo" className="w-8" />
          <p className={`${signedUp !== false ? "hidden lg:block" : ""}`}>
            FinanceFlow
          </p>
        </Link>
        {signedUp && (
          <div className="flex gap-5 text-sm underline underline-offset-2 decoration-accent">
            <Link
              to="/budget"
              className="hover:scale-105 transition-all duration-300"
            >
              Budget
            </Link>
            <Link
              to="/expense"
              className="hover:scale-105 transition-all duration-300"
            >
              Expense
            </Link>
            <Link
              to="/about"
              className="hover:scale-105 transition-all duration-300"
            >
              About Us
            </Link>

            <img
              src={moon}
              alt="theme toggle"
              className="w-5 cursor-pointer hover:scale-95 transition-all duration-300"
            />

            <img
              src={logout}
              alt="logout icon"
              className="w-6 cursor-pointer hover:-translate-x-0.5 transition-all duration-300"
              onClick={handleLogout}
            />
          </div>
        )}
        <span className="w-full h-0.5 bg-accent absolute -bottom-0.5 left-0" />
      </div>
    </nav>
  );
}

export default Navbar;
