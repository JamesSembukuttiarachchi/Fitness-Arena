import React, { useState, useEffect } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from backend when component mounts
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:6005/product");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:6005/product/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Remove the deleted product from the state
                setProducts(products.filter(product => product.id !== id));
            } else {
                console.error("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Product List</h2>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="text-left">Name</th>
                        <th className="text-left">Category</th>
                        <th className="text-left">Price</th>
                        <th className="text-left">Image</th>
                        <th className="text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>
                                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover" />
                            </td>
                            <td>
                                <button onClick={() => handleDelete(product.id)} className="text-red-500">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
