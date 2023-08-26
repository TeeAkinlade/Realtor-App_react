import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const pathMatchRoute = (route) =>{
        if(route === location.pathname){
            return true
        }   
    }
   
  return (
    <div className='bg-white border-b shadow-sm sticky top 0 z-50'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto sm: px-1'>
        <div>
            <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="" className='h-5 cursor-pointer sm: h-3'
            onClick={() => navigate("/")} />
        </div>
        <div>
            <ul className='flex space-x-10 '>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 ${pathMatchRoute('/') && "text-black border-b-red-500 border-b-[3px]"}`}
                onClick={() => navigate("/")} 
                >Home</li>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 ${pathMatchRoute("/offers") && "text-black border-b-red-500 border-b-[3px]"}`}onClick={() => navigate("/offers")} 
                >Offers</li>
                <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 ${pathMatchRoute("/sign-in") && "text-black border-b-red-500 border-b-[3px]"}`} 
                onClick={() => navigate("/sign-in")}
                >Sign In</li>
            </ul>
        </div>
        </header>
    </div>
    
  )
}

export default Header