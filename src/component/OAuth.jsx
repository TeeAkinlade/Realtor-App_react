import React from 'react'
import {FcGoogle} from 'react-icons/fc'

const OAuth = () => {
  return (
    <button className='flex justify-center items-center w-full bg-red-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shoadow-md hover:bg-red-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-red-800'>
        <FcGoogle className='bg-white text-2xl mr-2 rounded-full'/>
        Coutinue with Google
    </button>
  )
}

export default OAuth