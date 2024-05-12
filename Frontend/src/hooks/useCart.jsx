import React, { useContext } from "react";
//import { AuthContext } from "../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useCart = () => {
  //const { user } = useContext(AuthContext);
  const hardcodedEmail = "frog@gmail.com"; // Hardcoded email value
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", hardcodedEmail],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:6005/carts?email=${hardcodedEmail}`
      );
      return response.json();
    },
  });
  return [cart, refetch];
};

export default useCart;
