import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  // handle Enter key press for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-md flex items-center px-4 py-2 bg-slate-100 rounded-md shadow-sm border outline-none">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-1xl bg-transparent py-[11px]  text-black font-medium outline-none"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyPress}
      />

      {value && (
        <IoMdClose
          className="text-lg text-slate-500 cursor-pointer hover:text-black mr-2"
          onClick={onClearSearch}
          title="Clear"
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black
         text-base"
        onClick={handleSearch}
        title="Search"
      />
    </div>
  );
};

export default SearchBar;


// import React from "react";
// import { FaMagnifyingGlass } from "react-icons/fa6";
// import { IoMdClose } from "react-icons/io";

// const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
//   return (
//     <div className="w-80  flex items-center px-10 bg-slate-100 rounded-md">
//       <input
//         type="text"
//         placeholder="Search Notes"
//         className="w-full text-xs bg-transparent py-[11px] outline-none"
//         value={value}
//         onChange={onChange}
//       />

//       {value && (
//         <IoMdClose
//           className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
//           onClick={onClearSearch}
//         />
//       )}

//       <FaMagnifyingGlass
//         className="text-slate-400 cursor-pointer hover:text-black"
//         onClick={handleSearch}
//       />
//     </div>
//   );
// };

// export default SearchBar;
