import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards';
import { FaFilter } from 'react-icons/fa';

const Menu = () => {

    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption, setSortOption] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    //loading data
    useEffect(() => {
        //fetching data from backend
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:6005/product");
                const data = await response.json();
                setMenu(data);
                setFilteredItems(data);
            } catch (error) {
                console.log("error fetching data",error);
            }
        };

        //call the function
        fetchData();
    }, [])

    //filtering data based on category
    const filterItems = (category) => {
        const filtered = category === 'all'
         ? menu 
         : menu.filter((item) => item.category === category);

         setFilteredItems(filtered);
         setSelectedCategory(category);
         setCurrentPage(1);
    };

    //show all data
    const showAll = () => {
        setFilteredItems(menu);
        setSelectedCategory('all');
        setCurrentPage(1);
    };

    //sorting based on A-Z, Z-A, low-high, high-low
    const handleSortChange = (option) => {
        setSortOption(option);

        let sortedItems = [...filteredItems];

        //logic for sorting
        switch(option) {
            case "A-Z":
                sortedItems.sort((a,b) => a.name.localeCompare(b.name))
                break;
            case "Z-A":
                sortedItems.sort((a,b) => b.name.localeCompare(a.name))
                break;
            case "low-high":
                sortedItems.sort((a,b) => a.price - b.price)
                break;
            case "high-low":
                sortedItems.sort((a,b) => b.price - a.price)
                break;
            default:
                break;

        }

        setFilteredItems(sortedItems);
        setCurrentPage(1);
    }

    //pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div>
        {/*menu shop section */}
        <div className='section-container mt-20'>
            {/*filtering buttons and sorting dropdown */}
            <div className='flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8'>
                {/*filtering buttons */}
                <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap '>
                    <button onClick={showAll}
                    className={selectedCategory === "all" ? "active" : ""}>All</button>
                    <button onClick={() =>filterItems("men")}
                    className={selectedCategory === "men" ? "active" : ""}>Men</button>
                    <button onClick={() =>filterItems("women")}
                    className={selectedCategory === "women" ? "active" : ""}>Women</button>
                    <button onClick={() =>filterItems("accessories")}
                    className={selectedCategory === "accessories" ? "active" : ""}>Accessories</button>
                    <button onClick={() =>filterItems("supplement")}
                    className={selectedCategory === "supplement" ? "active" : ""}>Supplements</button>
                </div>

                {/*sorting dropdown */}
                <div className='flex justify-end mb-4 rounded-sm'>
                    <div className='bg-black p-2'>
                        <FaFilter className='h-4 w-4 text-white'/>
                    </div>

                    {/*sorting options */}
                    <select name='sort' id='sort' onChange={(e) => handleSortChange(e.targetvalue)} 
                    value={sortOption} 
                    className='bg-black text-white px-2 py-1 rounded-sm'>
                        <option value="default"> Default</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>                    </select>
                </div>
            </div>

            {/*product cards */}
            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
                {
                    currentItems.map((item) => (
                        <Cards key={item.id} item={item} />
                    ))
                }
            </div>
        </div>

        {/*pagination */}
        <div className="flex justify-center my-8 flex-wrap gap-2">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-orange text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Menu