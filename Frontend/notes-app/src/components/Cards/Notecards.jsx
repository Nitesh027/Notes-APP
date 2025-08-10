import React from 'react';
import { MdOutlinePushPin, MdCreate, MdDelete } from 'react-icons/md';
import moment from 'moment'; // ✅ Correct way to import moment

const Notecards = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className='border rounded p-5 bg-white hover:shadow-xl transition-all ease-in-out'>
      <div className='flex items-center justify-between mb-3'>
        <div>
          <h6 className='text-base font-semibold'>{title}</h6>
          <span className='text-sm text-slate-500'>
            {moment(date).format('DD MMM YYYY')} {/* ✅ Correct format */}
          </span>
        </div>

        <MdOutlinePushPin
          className={`text-2xl cursor-pointer hover:text-blue-600 transition-colors duration-200 ${
            isPinned ? 'text-blue-500' : 'text-slate-400'
          }`}
          onClick={onPinNote}
        />
      </div>

      <p className='text-[15px] text-slate-800 mt-2'>
        {content?.slice(0, 100)} {/* Only first 100 characters of content */}
      </p>

      <div className='flex items-center justify-between mt-3'>
        <div className='text-sm text-slate-500'>
          {tags.map((item, index) => (
            <span key={index} className='mr-2'>#{item}</span>
          ))}
        </div>

        <div className='flex items-center gap-4'>
          <MdCreate
            className='text-xl cursor-pointer text-slate-500 hover:text-green-500 transition'
            onClick={onEdit}
          />
          <MdDelete
            className='text-xl cursor-pointer text-slate-500 hover:text-red-500 transition'
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default Notecards;















