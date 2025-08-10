import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => { // ✅ Spelling fixed
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const onLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery) // ✅ Fixed
    }
  }

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch()
  }

  return (
    <div className="bg-white text-white px-6 py-3 flex justify-between items-center drop-shadow-2xl">
      <h1 className="text-2xl font-bold text-black px-3 py-4">My Notes</h1>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  )
}

export default Navbar




// import React, { useState } from 'react'
// import ProfileInfo from '../Cards/ProfileInfo'
// import { useNavigate } from 'react-router-dom'
// import SearchBar from '../SearchBar/SearchBar'

// const Navbar = ({userInfo,onSeacrhNote,handleClearSearch}) => {
//   const [searchQuery, setSearchQuery]=useState("")
//   const navigate=useNavigate()
//   const onLogout=()=>{
//       localStorage.clear()
//       navigate("/login")
//   }                                //ye bhi save rakh raha hu 
//   const handleSearch=()=>{
//     if(searchQuery){
//       onSeacrhNote(searchQuery)
//     }
//   }
//   const onClearSearch=()=>{
//        setSearchQuery("");
//        handleClearSearch()
//   }
//   return (
//     <div className="bg-white text-white  px-6 py-3 flex justify-between items-center drop-shadow-2xl" >
//      <h1 className="text-2xl font-bold  text-black px-3 py-4">My Notes</h1>
//      <SearchBar value={searchQuery}
//       onChange={({target})=>{
//       setSearchQuery(target.value);
//      }}
//      handleSearch={handleSearch}
//      onClearSearch={onClearSearch}
     
     
     
//      />
//      <ProfileInfo  userInfo={userInfo} onLogout={onLogout}/>
//     </div>
//   )
// }

// export default Navbar


