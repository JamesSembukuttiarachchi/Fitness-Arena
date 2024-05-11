// import React, { useState, useEffect } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import axios from 'axios';

// const UpdateProduct = () => {
//   const { id } = useParams(); // Get the product ID from the URL
//   const history = useHistory();

//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     price: '',
//     image: null
//   });

//   // Fetch the product details when the component mounts
//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   const fetchProduct = async () => {
//     try {
//       const response = await axios.get(`http://localhost:6005/product/${id}`);
//       const { name, category, price, image } = response.data;
//       setFormData({ name, category, price, image });
//     } catch (error) {
//       console.error('Error fetching product:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('image', formData.image);

//       await axios.put(`http://localhost:6005/product/${id}`, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       alert('Product updated successfully!');
//       history.push('/manage-products'); // Redirect to the manage products page
//     } catch (error) {
//       console.error('Error updating product:', error);
//       alert('Error updating product. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-4">Update Product</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1">Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
//         </div>

//         <div>
//           <label className="block mb-1">Category:</label>
//           <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
//         </div>

//         <div>
//           <label className="block mb-1">Price:</label>
//           <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
//         </div>

//         <div>
//           <label className="block mb-1">Image:</label>
//           <input type="file" accept="image/*" name="image" onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
//         </div>

//         <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update Product</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;
