import React from 'react';

function AddItem() {
  return (
    <div>
      <h1 className="text-xl font-medium text-teal-600 mb-4 mx-20 my-5">
        Add New Item
      </h1>

      {/* Outer flex container for form (left) and image (right) */}
      <div className="flex h-screen bg-white items-center justify-center px-10 ">
        
        {/* Left side - form */}
        <div className="w-3/4 flex items-center justify-center bg-white p-1 ">
          <form className="space-y-2 w-full max-w-2xl p-10 border border-black rounded-lg">
            <p>Item Name</p>
            <input
              type="text"
              placeholder="Enter Item Name"
              className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <p>Category</p>
            <select
              className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600">
              <option value="">Select Category</option>
              <option value="Kitchen Items">Kitchen Items</option>
              <option value="Cleaning Items">Cleaning Items</option>
              <option value="Food Items">Food Items</option>
              <option value="Skin Care Products">Skin Care Products</option>
            </select>
            <p>Quantity</p>
            <input
              type="number"
              placeholder="Price Per Unit"
              className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <p>Price Per Unit</p>
            <input
              type="number"
              placeholder="$ 0.00"
              className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <p>Minimum Stock Threshold</p>
            <input
              type="number"
              placeholder="Minimum Stock Threshold"
              className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <p className='text-gray-500'>We'll notify you when stock falls below this number</p>
            <p>Date Purchased</p>
            <input
              type="number"
              placeholder="yyyy-mm-dd"
              className="w-3/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <div className="flex justify-center gap-4">
            <button
              type="button"
              className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-gray-500 transition"
            >
              Add Item
            </button>
            <button
              type="button"
              className="w-full bg-gray-400 text-white p-3 rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            </div>
          </form>
        </div>

        {/* Right side - image */}
        <div className="w-1/2 flex space-y-2 mx-1">
          <div className="w-3/4 h-80 flex mb-4">
          <img
            src="/images/pic5.jpg"
            alt="Add item visual"
            className="max-w-full max-h-[500px] rounded-lg shadow-lg"
          />
          </div>
          <div className="w-3/4 h-80 flex">

          </div>          
        </div>

      </div>
    </div>
  );
}

export default AddItem;
