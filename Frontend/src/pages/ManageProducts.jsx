import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  
  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:6005/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (productId) => {
    // Implement edit functionality
    console.log('Edit product:', productId);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:6005/product/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
      console.log('Product deleted:', productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Product Management</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
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
          {products.map(product => (
            <tr key={product._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border border-gray-300"><img src={product.image} alt={product.name} className="h-16 w-16 object-cover" /></td>
              <td className="py-2 px-4 border border-gray-300">{product.name}</td>
              <td className="py-2 px-4 border border-gray-300">{product.category}</td>
              <td className="py-2 px-4 border border-gray-300">{product.price}</td>
              <td className="py-2 px-4 border border-gray-300">
                <button className="mr-2 py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleEdit(product._id)}>Edit</button>
                <button className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageProducts;
