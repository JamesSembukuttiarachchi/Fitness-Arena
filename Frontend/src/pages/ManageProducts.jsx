import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:6005/product");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEdit = (productId) => {
    // Implement edit functionality
    console.log("Edit product:", productId);
  };

  const handleDelete = async (productId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:6005/product/${productId}`);
        setProducts(products.filter((product) => product._id !== productId));
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire(
        "Error!",
        "Failed to delete product. Please try again.",
        "error"
      );
    }
  };

  // Function to extract file name from photoURL
  const extractFileName = (image) => {
    return image.split("\\").pop(); // Split the string by backslash and get the last element
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center p-2 mb-8">Manage <span className="text-Aorange">Items</span></h1>
      <table className="w-full table-auto border-collapse border border-gray-300 ">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border border-gray-300">Image</th>
            <th className="py-2 px-4 border border-gray-300">Name</th>
            <th className="py-2 px-4 border border-gray-300">Category</th>
            <th className="py-2 px-4 border border-gray-300">Price</th>
            <th className="py-2 px-4 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border border-gray-300">
                <img
                  src={`http://localhost:6005/uploads/${extractFileName(
                    product.image
                  )}`}
                  alt={product.name}
                  className="h-16 w-16 object-cover"
                />
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {product.name}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {product.category}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                {product.price}
              </td>
              <td className="py-2 px-4 border border-gray-300">
                <Link to={`/updateproduct/${product._id}`}>
                  <button
                    className="mr-2 py-1 px-3 bg-Aorange text-white rounded hover:bg-yellow-700"
                    onClick={() => handleEdit(product._id)}
                  >
                    Edit
                  </button>
                </Link>

                <button
                  className="py-1 px-3 bg-yellow-950 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <ul className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
          <li key={index}>
            <button
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded mr-2 focus:outline-none ${
                currentPage === index + 1 ? "bg-Aorange text-white" : "bg-gray-200"
              } hover:bg-Aorange hover:text-white`}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
