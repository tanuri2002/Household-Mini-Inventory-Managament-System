import React, { useEffect, useState } from "react";
import { FaUsers, FaBox, FaEdit, FaTrash } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoWarning } from "react-icons/io5";

function Dashboard() {
  const [items, setItems] = useState([]);

  // Fetch items when Dashboard loads
  useEffect(() => {
    fetch("http://localhost:8080/api/items")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched items:", data);
        setItems(data);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        alert("Failed to fetch items. Check the console for details.");
      });
  }, []);

  // Aggregate sum of quantities by item name
  const aggregatedItems = items.reduce((acc, item) => {
    if (acc[item.name]) {
      acc[item.name] += Number(item.quantity);
    } else {
      acc[item.name] = Number(item.quantity);
    }
    return acc;
  }, {});

  const handleUpdate = (itemName) => {
    alert(`Update functionality for "${itemName}"`);
    // Navigate to update form or open a modal
  };

  const handleDelete = (itemName) => {
    if (window.confirm(`Are you sure you want to delete "${itemName}"?`)) {
      alert(`Delete functionality for "${itemName}"`);
      // Call API to delete the item(s)
    }
  };

  return (
    <div>
      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 my-10 mx-28">
        <div className="bg-white shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-50 flex flex-col ">
          <FaBox size={30} className="mb-4 text-gray-600" />
          <div className="text-left font-semibold">{items.length}</div>
          <p className="text-left text-sm">Total Items</p>
        </div>

        <div className="bg-white shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-50 flex flex-col ">
          <IoWarning size={30} className="mb-4 text-gray-600" />
          <div className="text-left font-semibold">
            {items.filter((i) => i.quantity < 5).length}
          </div>
          <p className="text-left text-sm">Low Stock Items</p>
        </div>

        <div className="bg-white shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-50 flex flex-col ">
          <BsGraphUpArrow size={30} className="mb-4 text-gray-600" />
          <div className="text-left font-semibold">$1256</div>
          <p className="text-left text-sm">This Month's Spent</p>
        </div>

        <div className="bg-white shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-50 flex flex-col">
          <FaUsers size={30} className="mb-4 text-gray-600" />
          <div className="text-left font-semibold">5</div>
          <p className="text-left text-sm">Active Users</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-start gap-4 mx-28 mb-6">
        <button className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600">
          <a href="/additem"> + Add New Item</a>
        </button>
        <button className="bg-teal-100 text-gray-600 px-6 py-2 rounded-full hover:bg-gray-200">
          <a href="/home">View Inventory</a>
        </button>
      </div>

      {/* Aggregated Items Table */}
      <div className="mx-28 mb-10">
        <h2 className="text-xl font-bold mb-4">Item Summary</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Item Name</th>
                <th className="px-6 py-3 text-left">Quantity (Sum)</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(aggregatedItems).length > 0 ? (
                Object.entries(aggregatedItems).map(([name, sum]) => (
                  <tr key={name} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{name}</td>
                    <td className="px-6 py-3">{sum}</td>
                    <td className="px-6 py-3 flex gap-4">
                      <FaEdit
                        size={18}
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                        onClick={() => handleUpdate(name)}
                      />
                      <FaTrash
                        size={18}
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDelete(name)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center px-6 py-4 text-gray-500">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="mx-28">
        <h2 className="text-xl font-bold mb-4">Recent Activity Log</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Item Name</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-left">Added Date</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{item.name}</td>
                    <td className="px-6 py-3">{item.quantity}</td>
                    <td className="px-6 py-3">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center px-6 py-4 text-gray-500">
                    No items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
