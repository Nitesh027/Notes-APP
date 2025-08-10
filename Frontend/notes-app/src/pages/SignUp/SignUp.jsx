import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance"; // ✅ make sure this path is correct

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // ✅ lowercase

  const handleSignUp = async (e) => {
    e.preventDefault(); ///ese dekhna

    // ✅ Validation
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");
 
    // ✅ Signup logic api call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email:email,
        password:password,
      });
      //handle successfull
      if(response.data && response.data.error){
        setError(response.data.message)
        return
      }
      
     //handle succusfull registration
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard"); // ✅ Fixed this
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
          <form onSubmit={handleSignUp}>
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
              Create Account
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full mb-4 px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email Address"
              className="w-full mb-4 px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              // className="w-full mb-4 px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 "
            />

            {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-semibold transition duration-200"
            >
              Sign Up
            </button>

            <p className="text-sm text-center mt-4 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
























// import React, { useState } from "react";
// import Navbar from "../../components/Navbar/Navbar";
// import { Link } from "react-router-dom";
// import PasswordInput from "../../components/input/PasswordInput";
// import { validateEmail } from "../../utils/helper";

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     if (!name.trim()) {
//       setError("Please enter your name."); // Name validation
//       return;
//     }
//     if (!email || !validateEmail(email)) { // Email validation
//       setError("Please enter a valid email address.");
//       return;
//     }
//     if (!password) {
//       setError("Please enter the password.");
//       return;
//     }
//     setError("");
//     // Signup logic (e.g., Firebase ya API call)
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="w-96 border rounded bg-white px-9 py-4">
//           <form onSubmit={handleSignUp}>
//             <h4 className="text-2xl mb-5">Sign Up</h4>
//             <input
//               type="text"
//               placeholder="Name"
//               className="input-box w-full text-sm bg-transparent border-[1.5px] px-5 py-2 rounded"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Email"
//               className="input-box w-full text-sm bg-transparent border-[1.5px] px-5 py-2 rounded mt-3"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <PasswordInput
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//             />
//             {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
//             <button
//               type="submit"
//               className="btn-primary w-full text-sm bg-blue-500 rounded-2xl text-white mt-4 hover:bg-blue-700"
//             >
//               Create Account
//             </button>
//             <p className="text-sm text-center mt-4">
//               Already have an account?{" "}
//               <Link to="/login" className="font-medium text-blue-500 underline">
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;