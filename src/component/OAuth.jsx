import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import {FcGoogle} from 'react-icons/fc'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { db } from '../firebase'

const OAuth = () => {

    const navigate = useNavigate()
    const auth = getAuth()
    const handleGoogleReg = async () =>{
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            
            // check user if it authenticated
            const docRef = doc(db, "users", user.uid)
            const docSnap = await getDoc(docRef)

            if(!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')

        } catch (error) {
         toast.error("could not authorize with Google")
        }
    }
  return (
    <button type="button" onClick={handleGoogleReg} className='flex justify-center items-center w-full bg-red-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shoadow-md hover:bg-red-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-red-800'>
        <FcGoogle className='bg-white text-2xl mr-2 rounded-full'/>
        Coutinue with Google
    </button>
  )
}

export default OAuth