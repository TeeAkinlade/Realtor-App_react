import { getAuth, updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import {FcHome} from 'react-icons/fc'
import { Link } from 'react-router-dom';

const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate()
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })
    const {name, email} = formData;

    
    const handleSubmit = async () =>{
        try {
            if(auth.currentUser.displayName !== name){
                //update display name in firebase auth
                await updateProfile(auth.currentUser, {
                    displayName: name
                })
                //update name in firestore
                const docRef = doc(db, "users", auth.currentUser.uid)
                await updateDoc(docRef, {name})
            }
            toast.success('Profile details updated')
        } catch (error) {
            toast.error('could not update the profile details')
            console.log(error)
        }
    }

    const handleEdit = () => {
        if(changeDetails){
            handleSubmit()
        }
        setChangeDetails(prevState => !prevState)
    }

    const handleChange = (e) =>{
        setFormData(prevState => ({
            ...prevState,
            [e.target.id]:e.target.value
        }))
    }

    const handleLogOut = () => {
        auth.signOut()
        navigate('/');
    }
  return (
    <>
        <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
            <h1 className='text-3xl text-center font-bold mt-6'> My Profile</h1>
            <div className='w-full md:w-[50%] mt-6 px-3'>
                <form>
                    {/* name input */}
                    <input type="text"
                        id='name'
                        value={name}
                        disabled={!changeDetails}
                        onChange={handleChange}
                        className= {`w-full px-4py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 ${changeDetails && "bg-red-200 focus:bg-red-200"}`}
                    />
                    {/* Email input */}
                    <input type="email"
                        id='email'
                        value={email}
                        disabled
                        className='w-full px-4py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 '
                    />

                    <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
                        <p className='flex items-center'>Do you want to change your name?
                            <span 
                            onClick={handleEdit}
                            className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'> {changeDetails ? "Apply change" : "Edit"}</span>
                        </p>
                        <p onClick={handleLogOut} className='text-blue-600 hover:text-blue-800 cursor-pointer transition ease-in-out duration-200'>Sign out</p>
                    </div>
                </form>
                <button type="submit"
                    className='w-full bg-blue-600 text-white uppercase py-3 px-7 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800'
                >
                    <Link to="/create-listing"
                        className='flex justify-center items-center'
                    >
                    <FcHome  className=" mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
                    sale or rent your home
                    </Link>
                </button>
                    
                   
            </div>
        </section>
    </>
  )
}

export default Profile