import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (fullName, username, email, role, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:6005/api/users/register/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ fullName, username, email, role, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      alert("User already in the system");
    } else {
      // Save the user to the local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Update the auth context
      dispatch({ type: "LOGIN", payload: json });
    }

    setIsLoading(false);
  };

  return { register, isLoading, error };
};
