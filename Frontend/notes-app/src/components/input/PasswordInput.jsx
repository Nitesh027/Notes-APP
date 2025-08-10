import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  
  return (
    <div className="relative w-full text-sm bg-transparent border-[1.5px] px-5 py-2 rounded mt-3">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent  rounded outline-none pr-10  "
      />
      <span
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={toggleShowPassword}
      >
        {isShowPassword ? (
          <FaRegEye size={20} className="text-blue-600 cursor-pointer"
          onClick={()=>toggleShowPassword} />
        ) : (
          <FaRegEyeSlash 
          size={20} 
          className="text-slate-400 cursor-pointer"
           onClick={()=>toggleShowPassword} 
      
          />
        )}
      </span>
    </div>
  );
};

export default PasswordInput;