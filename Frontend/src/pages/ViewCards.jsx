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
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useContext(AuthContext);

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

  // Function to filter cards based on search query
  const filteredCards = cards.filter((card) =>
    card.cardName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Event handler for updating search query
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Layout>
      <div className="m-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">View Cards</h1>
          <div className="m-10">
            <input
              type="text"
              placeholder="Search by card name"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div>{loading ? <Spinner /> : <BankCard cards={filteredCards} />}</div>
      </div>
    </Layout>
  );
};

export default ViewCards;
