import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
  });

  const [errorMsg, setErrorMsg] = useState(""); // For file errors

  // Handle text/number/select changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type manually before submit
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        setErrorMsg("Only image files are allowed!");
        setFormData((prev) => ({ ...prev, image: null }));
        return;
      } else {
        setErrorMsg("");
        setFormData((prev) => ({ ...prev, image: file }));
      }
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      setErrorMsg("Please select a valid image file.");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("image", formData.image);

      await axios.post("http://localhost:6005/items", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully!");
      setFormData({ name: "", category: "", price: "", image: null });
      setErrorMsg("");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error adding product");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="mb-4 text-2xl font-bold">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="accessories">Accessories</option>
            <option value="supplement">Supplements</option>
          </select>
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            accept=".jpg, .jpeg, .png, .gif" // Hides non-image files in file picker
            onChange={handleImageChange}
            required
          />
          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
