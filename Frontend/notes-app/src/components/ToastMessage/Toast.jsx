import React, { useEffect } from 'react';
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from 'react-icons/md';

const Toast = ({ isShown, message, type, onClose }) => {
  
  useEffect(() => {
    if (isShown) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [isShown, onClose]);

  return (
    <div 
      className={`absolute top-20 right-6 transition-all duration-500 
      ${isShown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} `}
    >
      <div className={`min-w-52 bg-white border shadow-2xl rounded-md relative overflow-hidden`}>
        
        {/* Left Color Bar */}
        <div 
          className={`absolute left-0 top-0 w-1 h-full 
          ${type === "delete" ? "bg-red-500" : "bg-green-500"}`} 
        />
        
        {/* Toast Content */}
        <div className='flex items-center gap-3 py-2 px-4'>
          <div 
            className={`w-10 h-10 flex items-center justify-center rounded-full
            ${type === "delete" ? "bg-red-50" : "bg-green-50"}`} 
          >
            {type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>
          <p className='text-sm text-slate-800'>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Toast;













// import React, { useEffect } from 'react'
// import {LuCheck} from "react-icons"
// import { MdDeleteOutline } from 'react-icons/md';

// const Toast = ({isShown,message,type,onClose,   }) => {
//   useEffect(()=>{
//     const timeoutId=setTimeout(()=>
//       onClose();
//   },3000);
//      return () => {
//       clearTimeout(timeoutId);
//      }
//      },[onClose])
  
//   return (
//     <div className={`absolute top-20 right-6 transition-all duration-500 ${
//       !isShown ? "opacity-100":"opacity-0"
//     }` }>
//     <div className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5x] after:h-full 
//     ${type !=="delete" ? "after:bg-red-500": "after:bg-green-500"} after:absolute after:left-0 after:top-0 after:rounded-b-lg`}
//     >
    
//     <div className='flex items-center gap-3 py-2 px-4'>
//       <div className={`w-10 h-10 flex items-center justify-center rounded-full
//          ${type !=="delete" ? "bg-amber-50": "bg-amber-50"} `} >
//        { type !=="delete" ? (<MdDeleteOutline className='text-xl text-red-500'/> ) :(<LuCheck className="text-xl text-green-500" />)}
//       </div>
//       <p className='text-sm text-slate-800'>{message}</p>
//     </div>
//     </div>
//     </div>
//   );
// };

// export default Toast