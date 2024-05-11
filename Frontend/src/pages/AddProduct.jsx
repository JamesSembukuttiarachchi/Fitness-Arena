import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '', // Update category field
        price: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            image: imageFile
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('image', formData.image);

            await axios.post('http://localhost:6005/product', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Product added successfully!');
            setFormData({
                name: '',
                category: '',
                price: '',
                image: null
            });
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Add New <span className='text-orange'>Product</span></h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>

                <div>
                    <label className="block mb-1">Category:</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required>
                        <option value="">Select category</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="accessories">Accessories</option>
                        <option value="supplement">Supplements</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Price:</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>

                <div>
                    <label className="block mb-1">Image:</label>
                    <input type="file" accept="image/*" name="image" onChange={handleImageChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
