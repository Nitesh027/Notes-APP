import React, { useState } from 'react';
import { MdClose, MdAdd } from 'react-icons/md';

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const addNewTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="mt-2">
      {/* Existing Tags */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-blue-700 hover:text-red-500"
              >
                <MdClose size={16} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input & Add Button */}
      <div className="flex items-center gap-2 mt-3">
        <input
          type="text"
          className="text-sm bg-slate-100 border px-3 py-2 rounded-md outline-none w-full"
          placeholder="Add tag and press Enter"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="w-9 h-9 flex items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600 transition"
          onClick={addNewTag}
        >
          <MdAdd className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;

















