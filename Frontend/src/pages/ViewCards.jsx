import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BankCard from "../components/BankCard";
import { Link } from "react-router-dom";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Layout from "../components/Layout/Layout";
import { AuthContext } from "../context/AuthContext";

const ViewCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user} = useContext(AuthContext)

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:6005/savecard/")
      .then((response) => {
        setCards(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  return <Layout><div>{loading ? <Spinner /> : <BankCard cards={cards} />}</div></Layout>;
};

export default ViewCards;
