import React, { useState } from 'react'
import Spinner from '../component/Spinner';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase'
import { useNavigate } from 'react-router';

const CreateListing = () => {
  
  const navigate = useNavigate();
  const auth = getAuth()
  const [geoLocation, setGeoLocation] = useState(false);
  const [loading, setLoading] = useState(false)
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
    discountedPrice: 0,
    latitude: 0,
    longitude: 0,
    images: { }
  })
    const {
       type, name, bedrooms, bathrooms, parking, furnished, address,description, offer, regularPrice, discountedPrice, latitude, longitude, images
      } = formData;
      
    const handleClick = (e) => {
      let selectedBtn = null;

      // select btn
      if(e.target.value === "true"){
        selectedBtn = true;
      }
      if(e.target.value === "false"){
        selectedBtn = false;
      }
      // File
      if(e.target.files){
        setFormData((prevState) =>({
          ...prevState,
          images: e.target.files
        }))
      }

      // Text/boolean/number
      if(!e.target.files){
        setFormData((prevState) =>({
          ...prevState,
          [e.target.id]: selectedBtn ?? e.target.value
        }))
      }
    }

    const handleSubmit = async (e) =>{
      e.preventDefault
      setLoading(true);
      if(+discountedPrice >= +regularPrice){
        setLoading(false);
        toast.error('The discounted price have to less than the regular price')
        return;
      }
      if(images.length > 6){
        setLoading(false)
        toast.error('Maximum of 6 images are allowed')
        return;
      }
      // usining google geoCoding location to the geolocation
      let enableGeoLocation = {}
      // let location;
      // if(enableGeoLocation){
      //   const response = await fetch(`https:/maps.googleapis.com/maps/api/geocode/json?adress=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`);
      //   const data = await response.json();
      //   enableGeoLocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      //   enableGeoLocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      //   location = data.satus === "ZERO_RESULT" && undefined;

      //   if(location === undefined){
      //     setLoading(false);
      //     toast.error("please enter a correct address");
      //     return
      //   } 
      // } else{
        // getting the geolocation manually
        enableGeoLocation.lat = latitude;
        enableGeoLocation.lng = longitude;
      // }

      //storing the image in the firebase storage
      const storeImages = async (image) =>{
        return new Promise((resolve, reject) =>{
          const storage = getStorage()
          //check the uloadd filename and if it has the same name it attached a number to the image automatically
          const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
          const storageRef = ref(storage, filename);
          const uploadTask = uploadBytesResumable(storageRef, image);
          uploadTask.on('state_changed', 
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
            reject(error)
          }, 
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          });
        })
      }

      const imgUrls = await Promise.all(
        [...images].map((image) => storeImages(image))
      ).catch((error) =>{
          setLoading(false)
          toast.error("Images not uploaded")
          return;
        });

        const formDataCopy = {
          ...formData,
          imgUrls,
          enableGeoLocation,
          timestamp: serverTimestamp(),
          // use to check the id of the user
          userRef: auth.currentUser.uid,
        }
        delete formDataCopy.images;
        !formDataCopy.offer && delete formDataCopy.discountedPrice;
        const docRef = await addDoc(collection(db, "listings"), formDataCopy);
        setLoading(false);
        toast.success('Listing created');
        navigate(`/category/${formDataCopy.type}/${docRef.id}`)
    }


    if(loading) {
      return <Spinner />
    }

  return (
    <main className='max-w-md px-2 mx-auto'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Create a Listing</h1>
      <form onSubmit={handleSubmit}>
        <p className='text-lg mt-6 font-semibold'> Sell / Rent</p>
        <div className="flex">
          <button type="button" 
            id='type' 
            value="sale" 
            onClick={handleClick}
            className={`mr-3 font-medium uppercase px-7 py-3 text-sm shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"}`}
          >
            sell
          </button>
          <button type="button" 
            id='type' 
            value="rent" 
            onClick={handleClick}
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
            onClick={handleClick}  
            className={`mr-3 font-medium uppercase px-7 py-3 text-sm shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!parking ? "bg-white text-black" : "bg-slate-600 text-white"}`}
          >
            Yes
          </button>
          <button type="button" 
            id='parking' 
            value={false} 
            onClick={handleClick}
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
            onClick={handleClick}
            className={`mr-3 font-medium uppercase px-7 py-3 text-sm shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!furnished ? "bg-white text-black" : "bg-slate-600 text-white"}`}
          >
            Yes
          </button>
          <button type="button" 
            id='furnished'
            value={false} 
            onClick={handleClick}
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
        {!geoLocation && (
          <div className=" flex space-x-6 justify-start mb-6">
            <div className="">
              <p className='text-lg font-semibold'>Latitude</p>
              <input type="number" 
                id="latitude" 
                value={latitude} 
                onChange={handleClick}
                required
                min="-90"
                max="90"
                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 text-center'
              />
            </div>
            <div className="">
              <p className='text-lg font-semibold'>Longitude</p>
              <input type="number" 
                id="longitude" 
                value={longitude} 
                onChange={handleClick}
                required
                min="-180"
                max="180"
                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 text-center'
              />
            </div>
          </div>
        )}
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
            onClick={handleClick}
            className={`mr-3 font-medium uppercase px-7 py-3 text-sm shadow-md rounded hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${!offer ? "bg-white text-black" : "bg-slate-600 text-white"}`}
          >
            Yes
          </button>
          <button type="button" 
            id='offer'
            value={false} 
            onClick={handleClick}
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
            multiple
            className='w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rouned transition duration-150 ease-in-out focus:bg-white focus:border-slate-600'
          />
        </div>
        <button type="submit"
          className='mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
        > Create Listing</button>
      </form>
    </main>
  )
}

export default CreateListing