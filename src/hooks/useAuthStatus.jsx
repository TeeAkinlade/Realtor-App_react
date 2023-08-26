import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'

const useAuthStaus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) =>{
            if(user){
                setLoggedIn(true)
            }
            setCheckingStatus(false)
        })
    }, [])

  return { loggedIn, checkingStatus }
}

export default useAuthStaus