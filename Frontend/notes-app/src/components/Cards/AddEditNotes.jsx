import React, { useState } from 'react';
import TagInput from '../input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", { title, content, tags });
      if (response.data && response.data.note) {
        showToastMessage("Note added successfully", "success");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
      showToastMessage("Failed to add note", "error");
    }
  };

  const editNote = async () => {
    try {
      const response = await axiosInstance.put(`/edit-note/${noteData._id}`, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note updated successfully", "success");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
      showToastMessage("Failed to update note", "error");
    }
  };

  const handleAddNote = () => {
    if (!title.trim()) {
      setError("Please enter the title");
      return;
    }
    if (!content.trim()) {
      setError("Please enter the content");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative p-4">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-4 -right-4 hover:bg-slate-200"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-500" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label font-medium">TITLE</label>
        <input
          type="text"
          className="text-xl text-slate-950 outline-none border-b pb-1"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label font-medium">CONTENT</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded resize-none"
          placeholder="Write your note here..."
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="input-label font-medium">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        className="bg-blue-500 text-white font-medium mt-5 px-6 py-2 rounded hover:bg-blue-600 transition"
        onClick={handleAddNote}
      >
        {type === "edit" ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
};

export default AddEditNotes;
















// import React, { useState } from 'react';
// import TagInput from '../input/TagInput';
// import { MdClose } from 'react-icons/md';
// import axiosInstance from '../../utils/axiosInstance';

// const AddEditNotes = ({ noteData, type, getAllNotes, onClose ,showToastMessage }) => {
//   const [title, setTitle] = useState(noteData?.title || "");
//   const [content, setContent] = useState(noteData?.content || "");
//   const [tags, setTags] = useState(noteData?.tags || []);
//   const [error, setError] = useState(null);

//   const addNewNote = async () => {
//     try {
//       const response = await axiosInstance.post("/add-note", { title, content, tags });
//       if (response.data && response.data.note) {
//        showToastMessage("Note Added successfully")
//         getAllNotes();
//         onClose(); 
//       }
//     } catch (error) {
//       if (error.response?.data?.message) {
//         setError(error.response.data.message);
//       } else {
//         console.error("Unexpected error:", error);
//         setError("Something went wrong. Please try again.");
//       }
//     }
//   };
//   //Edit Note

//   const editNote = async () => {
//     try {
//       const response = await axiosInstance.put(`/edit-note/${noteData._id}`, {
//         title,
//         content,
//         tags,
//       });
//       if (response.data && response.data.note) {
//         showToastMessage("Not updated successfully")
//         getAllNotes();
//         onClose();
//       }
//     } catch (error) {
//       if (error.response?.data?.message) {
//         setError(error.response.data.message);
//       } else {
//         console.error("Unexpected error:", error);
//         setError("Something went wrong. Please try again.");
//       }
//     }
//   };

//   const handleAddNote = () => {
//     if (!title.trim()) {
//       setError("Please enter the title");
//       return;
//     }
//     if (!content.trim()) {
//       setError("Please enter the content");
//       return;
//     }
//     setError("");

//     if (type === "edit") {
//       editNote();
//     } else {
//       addNewNote();
//     }
//   };

//   return (
//     <div className="relative p-4">
//       <button
//         className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-4 -right-4 hover:bg-slate-200"
//         onClick={onClose}
//       >
//         <MdClose className="text-xl text-slate-500" />
//       </button>

//       <div className="flex flex-col gap-2">
//         <label className="input-label font-medium">TITLE</label>
//         <input
//           type="text"
//           className="text-xl text-slate-950 outline-none border-b pb-1"
//           placeholder="Go To Gym At 5"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>

//       <div className="flex flex-col gap-2 mt-4">
//         <label className="input-label font-medium">CONTENT</label>
//         <textarea
//           className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded resize-none"
//           placeholder="Write your note here..."
//           rows={8}
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </div>

//       <div className="mt-4">
//         <label className="input-label font-medium">TAGS</label>
//         <TagInput tags={tags} setTags={setTags} />
//       </div>

//       {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//       <button
//         className="bg-blue-500 text-white font-medium mt-5 px-6 py-2 rounded hover:bg-blue-600 transition"
//         onClick={handleAddNote}
//       >
//         {type === "edit" ? "Update Note" : "Add Note"}
//       </button>
//     </div>
//   );
// };

// export default AddEditNotes;















// import React, { useState } from 'react';
// import TagInput from '../input/TagInput';
// import { MdClose } from 'react-icons/md';
// import axiosInstance from '../../utils/axiosInstance';

// const AddEditNotes = ({ noteData, type,getAllNotes ,onClose }) => {
//   const [title, setTitle] = useState(noteData?.title || "");
//   const [content, setContent] = useState(noteData?.content || "");
//   const [tags, setTags] = useState(noteData?.tags || []);
//   const [error, setError] = useState(null);

//   // Add note logic
//  const addNewNote = async () => {
//   try {
//     const response = await axiosInstance.post("/add-note", {
//       title,
//       content,
//       tags,
//     });

//     if (response.data && response.data.note) {
//       getAllNotes();
//       onClose();
//     }
//   } catch (error) {
//     if (
//       error.response &&
//       error.response.data &&
//       error.response.data.message
//     ) {
//       setError(error.response.data.message);
//     } else {
//       console.error("An unexpected error occurred:", error);
//       setError("Something went wrong. Please try again.");
//     }
//   }
// };

//   // Edit note logic
//   const editNote = async () => {
//     console.log("Edited Note:", { title, content, tags });
//     // Edit API call here
//   };

//   const handleAddNote = () => {
//     if (!title.trim()) {
//       setError("Please enter the title");
//       return;
//     }
//     if (!content.trim()) {
//       setError("Please enter the content");
//       return;
//     }

//     setError("");

//     if (type === "edit") {
//       editNote();
//     } else {
//       addNewNote();
//     }
//   };

//   return (
//     <div className="relative p-4 ">
//       {/* Close Button */}
//       <button
//         className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-4 -right-4 hover:bg-slate-200"
//         onClick={onClose}
//       >
//         <MdClose className="text-xl text-slate-500" />
//       </button>

//       {/* Title */}
//       <div className="flex flex-col gap-2">
//         <label className="input-label font-medium">TITLE</label>
//         <input
//           type="text"
//           className="text-xl text-slate-950 outline-none border-b pb-1"
//           placeholder="Go To Gym At 5"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>

//       {/* Content */}
//       <div className="flex flex-col gap-2 mt-4">
//         <label className="input-label font-medium">CONTENT</label>
//         <textarea
//           className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded resize-none"
//           placeholder="Write your note here..."
//           rows={8}
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </div>

//       {/* Tags */}
//       <div className="mt-4">
//         <label className="input-label font-medium">TAGS</label>
//         <TagInput tags={tags} setTags={setTags} />
//       </div>

//       {/* Error Message */}
//       {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//       {/* Button */}
//       <button
//         className="bg-blue-500 text-white font-medium mt-5 px-6 py-2 rounded hover:bg-blue-600 transition"
//         onClick={handleAddNote}
//       >
//         {type === "edit" ? "Update Note" : "Add Note"}
//       </button>
//     </div>
//   );
// };

// export default AddEditNotes;
