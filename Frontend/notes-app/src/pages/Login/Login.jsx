import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Form validations //ye bacha yaha se 
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    } //ye bacch hai yaha tak

    setError("");

    // API call
    try {
      const response = await axiosInstance.post("/login", { email, password });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard"); // redirect to dashboard
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-96 border rounded bg-white px-9 py-4">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-5">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box w-full text-sm bg-transparent border-[1.5px] px-5 py-2 rounded-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button
              type="submit"
              className="btn-primary w-full text-sm bg-blue-500 rounded-2xl text-white mt-4 hover:bg-blue-700"
            >
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-blue-600 underline">
                Create An Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

