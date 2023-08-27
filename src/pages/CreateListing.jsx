import React, { useState } from 'react'

const CreateListing = () => {

  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address:"",
    description:"",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0
  })
  const { type, name, bedrooms, bathrooms, parking, furnished, address,description, offer, regularPrice, discountedPrice } = formData
  const handleClick = () =>{

  }
  return (
    <main className='max-w-md px-2 mx-auto'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Create a Listing</h1>
      <form>
        <p className='text-lg mt-6 font-semibold'> Sell / Rent</p>
        <div className="flex">
          <button type="button" 
            id='type' 
            value="sale" 
            onChange={handleClick}
            className={`mr-3 font-medium uppercase px-7 py-3 text-sm shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"}`}
          >
            sell
          </button>
          <button type="button" 
            id='type' 
            value="sale" 
            onChange={handleClick}
            className={`ml-3 font-medium uppercase px-7 py-3 text-sm shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"}`}
          >
            rent
          </button>
        </div>
        <p className='text-lg mt-6 font-semibold'> Name</p>
        <input type="text" 
          id='name' 
          value={name} 
          onChange={handleClick} 
          placeholder='Name' 
          maxLength="32" 
          minLength="10" 
          required
          className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'
        />
        <div className="flex space-x-6 mb-6">
          <div>
            <p className="text-lg font-semibold">Beds</p>
            <input type="number" 
              id='bedrooms' 
              value={bedrooms} 
              onChange={handleClick} 
              min="1" 
              max="50" 
              required 
              className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 text-center w-full" />
          </div>
          <div>
            <p className="text-lg font-semibold">Baths</p>
            <input type="number" 
              id='bathrooms' 
              value={bathrooms} 
              onChange={handleClick} 
              min="1" 
              max="50" 
              required 
              className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 text-center w-full" />
          </div>
        </div>
        <p className='text-lg mt-6 font-semibold'> Parking Spot</p>
        <div className="flex">
          <button type="button"
            id='parking' 
            value={true} 
            onChange={handleClick}  
            className={`mr-3 font-medium uppercase px-7 py-3 text-sm shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}
          >
            Yes
          </button>
          <button type="button" 
            id='parking' 
            value={false} 
            onChange={handleClick}
            className={`ml-3 font-medium uppercase px-7 py-3 text-sm shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}
          >
            No
          </button>
        </div>
        <p className='text-lg mt-6 font-semibold'> Furnished</p>
        <div className="flex">
          <button type="button"
            id='furnished'
            value={true} 
            onChange={handleClick}
            className={`mr-3 font-medium uppercase px-7 py-3 text-sm shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`}
          >
            Yes
          </button>
          <button type="button" 
            id='furnished'
            value={false} 
            onChange={handleClick}
            className={`ml-3 font-medium uppercase px-7 py-3 text-sm shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`}
          >
            no
          </button>
        </div>
        <p className='text-lg mt-6 font-semibold'> Address</p>
        <textarea type="text"
         id='address'
          value={address}
          onChange={handleClick}
          placeholder='Address'
          required
          className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'
        />
        <p className='text-lg font-semibold'> Description</p>
        <textarea type="text" 
          id='description' 
          value={description} 
          onChange={handleClick} 
          placeholder='description' 
          maxLength="32"
          minLength="10"
          required
          className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6'
        />
        <p className='text-lg font-semibold'> Offers</p>
        <div className="flex mb-6">
          <button type="button"
            id='offer'
            value={true} 
            onChange={handleClick}
            className={`mr-3 font-medium uppercase px-7 py-3 text-sm shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!offer ? "bg-white text-black" : "bg-slate-600 text-white"}`}
          >
            Yes
          </button>
          <button type="button" 
            id='offer'
            value={false} 
            onChange={handleClick}
            className={`ml-3 font-medium uppercase px-7 py-3 text-sm shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${offer ? "bg-white text-black" : "bg-slate-600 text-white"}`}
          >
            no
          </button>
        </div>
        <div className=" flex items-center mb-6">
          <div className="">
            <p className="text-lg font-semibold"> Regular Price</p>
            <div className=" flex w-full justify-center items-center space-x-6">
              <input type="number"
                id='regularPrice'
                value={regularPrice}
                onChange={handleClick}
                min="50"
                max="40000000" 
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"          
               />
               {type === "rent" && (
              <div className="">
                <p className="text-md w-full whitespace-nowrap">$/Month</p>
              </div>
            )}
            </div>
          </div>
        </div>
        {offer && (
          <div className=" flex items-center mb-6">
          <div className="">
            <p className="text-lg font-semibold"> Discounted Price</p>
            <div className=" flex w-full justify-center items-center space-x-6">
              <input type="number"
                id='discountedPrice'
                value={discountedPrice}
                onChange={handleClick}
                min="50"
                max="40000000" 
                required={offer}
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"          
               />
               {type === "rent" && (
              <div className="">
                <p className="text-md w-full whitespace-nowrap">$/Month</p>
              </div>
            )}
            </div>
          </div>
        </div>
        )}

        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-grey-600">The first image will be cover (max 6)</p>
          <input type="file" id="images"
            onChange={handleClick}
            accept='.jpg,.png,.jpeg'
            className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rouned transition duration-150 ease-in-out focus:bg-white focus:border-slate-600'
          />
        </div>
        <button type="submit"
          className='mb-6 w-full px-7 py-3 bg-bluee text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
        > Create Listing</button>
      </form>
    </main>
  )
}

export default CreateListing