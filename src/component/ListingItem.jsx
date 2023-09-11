import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'

export default function ListingItem({ result, id, handlePostEdit, handlePostDelete }) {
  // console.log(result.id)
  return (
    <li className='relative first-line:bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]'>
      <Link to={`/category/${result.type}/${id}`} className='contents'>
        <img src={result.imgUrls[0]} alt="image" className='h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in' loading='lazy' />
        <Moment className='absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1' fromNow>{result.timestamp?.toDate()}</Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationOn className='h-4 w-4 text-green-600' />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">{result.address}</p>
          </div>
          <p className="font-semibold mt-0 text-xl truncate">{result.name}</p>
          <p className="text-[#457b9d] mt-2 font-semibold">${result.offer ? result.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : result.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {result.type === "rent" && " / month"}
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">{result.bedrooms > 1 ? `${result.bedrooms} Beds` : '1 Bed'}</p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">{result.bathrooms > 1 ? `${result.bathrooms} Baths` : '1 Bath'}</p>
            </div>

          </div>
        </div>
      </Link>
      {handlePostDelete && (
        <FaTrash className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={() => handlePostDelete(result.id)}
        />
      )}
      {handlePostEdit && (
        <MdEdit className="absolute bottom-2 right-8 h-4 cursor-pointer"
          onClick={() => handlePostEdit(result.id)}
        />
      )}
    </li >
  )
}
