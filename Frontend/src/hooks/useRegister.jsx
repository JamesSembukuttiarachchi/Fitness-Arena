import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useRegister = () => {
  
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const register = async (fullName, username, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:6005/api/users/register/', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({fullName, username, email, password})
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
            alert("User already in the system")

        }
        if(response.ok){
            //ssave the user to the loca storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(faLse)

        }
    }

    return { register, isLoading, error}
}

