import { FiUploadCloud } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const Add = ({ url }) => {
  const [image, setImage] = useState(null); // set initial state to null instead of false
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Curry");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !description || !category || !price || !name) {
      toast.error("Please fill all the required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", Number(price));
    formData.append("name", name);

    try {
      const response = await axios.post(`${url}/api/product/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
        },
      });

      if (response.status === 201) {
        toast.success("Product added successfully!");
        setImage(null);
        setDescription("");
        setCategory("Curry");
        setPrice("");
        setName("");
      } else {
        toast.error("Failed to add the product");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("Error:", error);
    }
  };

  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <h4 className="mb-4 text-2xl font-semibold">Product Upload</h4>

        <div className="mb-6">
          <p>
            <label htmlFor="image">
              <div className="flex items-center justify-center w-full h-32 bg-gray-100 border border-dashed rounded-lg cursor-pointer">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="product"
                    className="object-cover h-32"
                  />
                ) : (
                  <FiUploadCloud className="text-4xl text-gray-500" />
                )}
              </div>
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              id="image"
              hidden
           
            />
          </p>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold">Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          
            className="w-full p-3 bg-gray-100 border rounded-lg focus:ring-indigo-200 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold">Product Description</p>
          <textarea
            name="description"
            placeholder="Write content here..."
            rows={6}
          
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 bg-gray-100 border rounded-lg focus:ring-indigo-200 focus:outline-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-lg font-semibold truncate">Product Category</p>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 bg-gray-100 border rounded-lg focus:ring-indigo-200 focus:outline-none"
            >
              <option value="Curry">Curry</option>
              <option value="Pizza">Pizza</option>
              <option value="Rice">Rice</option>
              <option value="Deserts">Deserts</option>
              <option value="Drinks">Drinks</option>
              <option value="Fruits">Fruits</option>
            </select>
          </div>

          <div>
            <p className="text-lg font-semibold">Product Price</p>
            <input
              type="number"
              name="price"
              placeholder="$10"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
             
              className="w-full p-3 bg-gray-100 border rounded-lg focus:ring-indigo-200 focus:outline-none"
            />
          </div>
        </div>

        <button
          className="flex items-center justify-center w-full py-3 font-semibold text-white rounded-lg bg-secondary"
          type="submit"
        >
          <FaPlus className="mr-2" /> Add Product
        </button>
      </form>
    </section>
  );
};

export default Add;
