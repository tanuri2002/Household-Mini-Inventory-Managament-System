import React, { useState } from "react";
import axios from "axios"; //Axios is used to send a POST request to a backend API (http://localhost:8080/api/items) to save the item data.
import { useNavigate} from "react-router-dom";

function AddItem() {

  const navigate = useNavigate();

  const [item, setItem] = useState({
    name: "",
    category: "",
    quantity: 0,
    price: 0,
    minimumStock: 0,
    date: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });  //The spread operator (...) is a JavaScript feature (introduced in ES6) that expands an iterable (like an object or array) into its individual elements.
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); //Stops the browser’s default form submission behavior (e.g., page refresh or navigation)
    axios.post("http://localhost:8080/api/items", item) //sends a POST request to the backend API at http://localhost:8080/api/items with the item object as the request body.
      .then((res) => {
        alert("Item added successfully ✅");
        navigate("/dashboard");
        // Reset form after success
        setItem({
          name: "",
          category: "",
          quantity: 0,
          price: 0,
          minimumStock: 0,
          date: ""
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding item ❌");
      });
  };

  return (
    <div>
      <h1 className="text-xl font-medium text-teal-600 mb-4 mx-20 my-5">
        Add New Item
      </h1>

      <div className="flex h-screen bg-white items-center justify-center px-10">
        {/* Left side - form */}
        <div className="w-3/4 flex items-center justify-center bg-white p-1">
          <form
            className="space-y-2 w-full max-w-2xl p-10 border border-black rounded-lg"
            onSubmit={handleSubmit} //Onsubmit is an event handler that triggers the handleSubmit function when the form is submitted
          >
            <p>Item Name</p>
            <input
              type="text"
              name="name"
              value={item.name}
              onChange={handleChange} //Onchange is an event handler that triggers the handleChange function whenever the input value changes
              placeholder="Enter Item Name"
              required
              className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />

            <p>Category</p>
            <select
              name="category"
              value={item.category}
              onChange={handleChange}
              required
              className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="">Select Category</option>
              <option value="Kitchen Items">Kitchen Items</option>
              <option value="Cleaning Items">Cleaning Items</option>
              <option value="Food Items">Food Items</option>
              <option value="Skin Care Products">Skin Care Products</option>
            </select>

            <p>Quantity</p>
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              required
              className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />

            <p>Price Per Unit</p>
            <input
              type="number"
              name="price"
              value={item.price}
              onChange={handleChange}
              placeholder="$ 0.00"
              required
              className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />

            <p>Minimum Stock Threshold</p>
            <input
              type="number"
              name="minimumStock"
              value={item.minimumStock}
              onChange={handleChange}
              placeholder="Minimum Stock Threshold"
              required
              className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <p className="text-gray-500">
              We'll notify you when stock falls below this number
            </p>

            <p>Date Purchased</p>
            <input
              type="date"
              name="date"
              value={item.date}
              onChange={handleChange}
              required
              className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />

            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-gray-500 transition"
              >Add Item</button>
              <button
                type="button"
                onClick={() =>  //Calls setItem to reset the item state to its initial values, clearing the form without submitting
                  setItem({
                    name: "",
                    category: "",
                    quantity: 0,
                    price: 0,
                    minimumStock: 0,
                    date: ""
                  })
                }
                className="w-full bg-gray-400 text-white p-3 rounded-lg hover:bg-gray-500 transition"
              >Cancel</button>
            </div>
          </form>
        </div>

        {/* Right side - image */}
        <div className="w-1/2 flex-col space-y-2 mx-1">
           {/* Upper part - image */}
          <div className="w-full h-1/2 flex justify-center">
            <img
              src="/images/pic5.jpg"
              alt="Add item visual"
              className="max-w-full max-h-[300px] rounded-lg shadow-lg"
            />
          </div>

            {/* Lower part - text box */}
          <div className="w-full h-1/2 flex justify-center">
            <p className="w-3/4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600">
              Tips for Inventory Management: <br />
            - Set realistic minimum stock thresholds to avoid running out of essential items.<br />
            - Regularly update item details to keep your inventory accurate and organized.<br />
            - Group similar items in the same category for easier management.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
