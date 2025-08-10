import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Notecards from '../../components/Cards/Notecards';
import Toast from '../../components/ToastMessage/Toast';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from '../../components/Cards/AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './../../utils/axiosInstance';

Modal.setAppElement('#root');

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "success"
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch,setIsSearch]=useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    });
    setTimeout(() => {
      setShowToastMsg({ isShown: false, message: "", type: "success" });
    }, 3000);
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-all-notes');
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.error('❌ Error fetching notes:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axiosInstance.delete(`/delete-note/${id}`);
      getAllNotes();
      showToastMessage("Note deleted successfully", "success");
    } catch (error) {
      console.error('❌ Error deleting note:', error);
      showToastMessage("Error deleting note", "error");
    }
  };

  const handlePinNote = async (id) => {
    try {
      await axiosInstance.put(`/update-note-pinned/${id}`, { isPinned: true });
      getAllNotes();
      showToastMessage("Note pinned successfully", "success");
    } catch (error) {
      console.error('❌ Error pinning note:', error);
      showToastMessage("Error pinning note", "error");
    }
  };

  const onSearchNote=async(query)=>{
    try {
      const response=await axiosInstance.get("/search-notes",{
        params: {query},
      });
      if(response.data && response.data.notes){
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error )
      
    }
  }
  const handleClearSearch=()=>{
    setIsSearch(false)
    getAllNotes();
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserInfo();
      await getAllNotes();
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {allNotes.length > 0 ? (
            allNotes.map((item) => (
              <Notecards
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDeleteNote(item._id)}
                onPinNote={() => handlePinNote(item._id)}
              />
            ))
          ) : (
            <p className="text-gray-500 col-span-3 text-center">
              No notes found
            </p>
          )}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg fixed right-10 bottom-10 z-50"
        onClick={() => setOpenAddEditModal({ isShown: true, type: 'add', data: null })}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: 'add', data: null })}
        overlayClassName="shadow-2xl bg-opacity-10 fixed inset-0"
        className="w-[40%] max-h-3/4 border-1 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ isShown: false, type: 'add', data: null })}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
      />
    </>
  );
};

export default Home;















// import React, { useState, useEffect } from 'react';
// import Navbar from '../../components/Navbar/Navbar';
// import Notecards from '../../components/Cards/Notecards';
// import Toast from '../../components/ToastMessage/Toast';
// import { MdAdd } from 'react-icons/md';
// import AddEditNotes from '../../components/Cards/AddEditNotes';
// import Modal from 'react-modal';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from './../../utils/axiosInstance';

// Modal.setAppElement('#root');

// const Home = () => {
//   const [openAddEditModal, setOpenAddEditModal] = useState({
//     isShown: false,
//     type: 'add',
//     data: null
//   });



// const [showToastMsg,setShowToastMsg]=useState({
//   isShown:false,
//   message:"",
//   data:"add",
// });

//   const [allNotes, setAllNotes] = useState([]);
//   const [userInfo, setUserInfo] = useState(null);
//   const navigate = useNavigate();

//   const handleEdit = (noteDetails) => {
//     setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
//   };
//   const showToastMessage=(message,type)=>{
//     setShowToastMsg({
//       isShown:true,
//       message,
//       type

//     });
//   };
//    const handleCloseToast=()=>{
//     setShowToastMsg({
//       isShown:false,
//       message:"",

//     });
//   };

//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get('/get-user');
//       if (response.data?.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       if (error.response?.status === 401) {
//         localStorage.clear();
//         navigate('/login');
//       }
//     }
//   };

//   const getAllNotes = async () => {
//     try {
//       const response = await axiosInstance.get('/get-all-notes');
//       if (response.data && response.data.notes) {
//         setAllNotes(response.data.notes);
//         console.log("Notes loaded:", response.data.notes.length);
//       }
//     } catch (error) {
//       console.error('❌ Error fetching notes:', error);
//     }
//   };

//   const handleDeleteNote = async (id) => {
//     try {
//       await axiosInstance.delete(`/delete-note/${id}`);
//       getAllNotes();
//     } catch (error) {
//       console.error('❌ Error deleting note:', error);
//     }
//   };

//   const handlePinNote = async (id) => {
//     try {
//       await axiosInstance.put(`/update-note-pinned/${id}`, { isPinned: true }); // Assuming pin=true
//       getAllNotes();
//     } catch (error) {
//       console.error('❌ Error pinning note:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       await getUserInfo();
//       await getAllNotes();
//     };
//     fetchData();
//   }, []);

//   return (
//     <>
//       <Navbar userInfo={userInfo} />

//       <div className="container mx-auto px-4 mt-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
//           {allNotes.length > 0 ? (
//             allNotes.map((item) => (
//               <Notecards
//                 key={item._id}
//                 title={item.title}
//                 date={item.createdOn}
//                 content={item.content}
//                 tags={item.tags}
//                 isPinned={item.isPinned}
//                 onEdit={() => handleEdit(item)}
//                 onDelete={() => handleDeleteNote(item._id)}
//                 onPinNote={() => handlePinNote(item._id)}
//               />
//             ))
//           ) : (
//             <p className="text-gray-500 col-span-3 text-center">
//               No notes found
//             </p>
//           )}
//         </div>
//       </div>

//       <button
//         className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg fixed right-10 bottom-10 z-50"
//         onClick={() => setOpenAddEditModal({ isShown: true, type: 'add', data: null })}
//       >
//         <MdAdd className="text-[32px] text-white" />
//       </button>

//       <Modal
//         isOpen={openAddEditModal.isShown}
//         onRequestClose={() => setOpenAddEditModal({ isShown: false, type: 'add', data: null })}
//         overlayClassName="shadow-2xl bg-opacity-10 fixed inset-0"
//         className="w-[40%] max-h-3/4 border-1 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
//       >
//         <AddEditNotes
//           type={openAddEditModal.type}
//           noteData={openAddEditModal.data}
//           onClose={() => setOpenAddEditModal({ isShown: false, type: 'add', data: null })}
//           getAllNotes={getAllNotes}
//           showToastMessage={showToastMessage}
//         />
//       </Modal>
//       <Toast
//         isShown={showToastMsg.isShown}
//         message={showToastMsg.message}
//         type={showToastMsg.type}
//         onClose={handleCloseToast}
//       />
//     </>
//   );
// };

// export default Home;












