import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { toast } from 'react-toastify'

const ContactForm = ({ userRef, listing }) => {

    const [landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState('')
    useEffect(() => {
        const landlordInfo = async () => {
            const docRef = doc(db, "users", userRef);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setLandlord(docSnap.data())
            } else {
                toast.error('Could not find landloard information')
            }
        }
        landlordInfo();
    }, [userRef]);

    return (
        <>
            {landlord !== null && (
                <div className=" flex flex-col w-full">
                    <p className="">Contact{landlord.name} for the {listing.name.toLowerCase}</p>
                    <div className="">
                        <textarea className='w-full px-4 py-2 mt-3 mb-6 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600' rows="2" placeholder='type your message' id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>
                    <a href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}>
                        <button className='px-7 py-3 bg-blue-600 rounded text-white text-sm uppercase shadow-sm hover:to-blue-800 hover:shadow-lg transition duration-150 ease-in-out focus:text-blue-700 focus:bg-white active:text-blue-700 active:bg-white  w-full text-center mb-6' type='button'>Send Message</button>
                    </a>
                </div>

            )}
        </>
    )
}

export default ContactForm