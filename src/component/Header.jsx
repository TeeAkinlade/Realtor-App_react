import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {

    const [pageState, setPageState] = useState('Sign In')
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth()

    useEffect(() =>{
        //checking if the user is authenticated then set the page to profile page else set to sign in page
        onAuthStateChanged(auth, user =>{
            if(user){
                setPageState('Profile')
            } else{
                setPageState('Sign In')
            }
        })

    }, [auth])

    const pathMatchRoute = (route) =>{
        if(route === location.pathname){
            return true
        }   
    }
   
  return (
    <div className='bg-white border-b shadow-sm sticky top 0 z-40'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto sm:px-1'>
        <div>
            <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="" className='h-5 cursor-pointer sm:h-3'
            onClick={() => navigate("/")} />
        </div>
        <div>
            <ul className='flex space-x-10 '>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 ${pathMatchRoute('/') && "text-black border-b-red-500 border-b-[3px]"}`}
                onClick={() => navigate("/")} 
                >Home</li>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 ${pathMatchRoute("/offers") && "text-black border-b-red-500 border-b-[3px]"}`}onClick={() => navigate("/offers")} 
                >Offers</li>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "text-black border-b-red-500 border-b-[3px]"}`} 
                onClick={() => navigate("/profile")}
                >
                     {pageState}
                </li>
            </ul>
        </div>
        </header>
    </div>
    
  )
}

export default Header