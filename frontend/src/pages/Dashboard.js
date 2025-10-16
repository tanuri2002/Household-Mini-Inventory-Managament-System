import React, { useEffect, useState } from "react";
import { FaUsers, FaBox, FaEdit, FaTrash } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoWarning } from "react-icons/io5";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [monthlyItems, setMonthlyItems] = useState([]);
  const [monthlySpending, setMonthlySpending] = useState(0);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch items from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);

        const now = new Date();
        const monthItems = data.filter((item) => {
          const d = new Date(item.date);
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
        setMonthlyItems(monthItems);

        // Calculate spending
        const total = monthItems.reduce((sum, item) => sum + item.price * item.quantity, 0); //.reduce() is a JavaScript array method used to 
                                                                                             // combine all elements of an array into a single value.
        setMonthlySpending(total);
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/items/${id}`, { method: "DELETE" });
      setItems(items.filter((i) => i.id !== id));
      setMonthlyItems(monthlyItems.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Open modal
  const handleUpdateClick = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/items/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem),
      });

      if (!response.ok) throw new Error("Failed to update item");

      // Update in state
      const updatedItems = items.map((i) =>
        i.id === editingItem.id ? editingItem : i
      );
      setItems(updatedItems);

      const updatedMonthItems = updatedItems.filter((item) => {
        const d = new Date(item.date);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });
      setMonthlyItems(updatedMonthItems);

      const total = updatedMonthItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setMonthlySpending(total);

      setShowModal(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="p-8">
      {/* Summary Cards */}
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 my-10 mx-28"> 
      
      <div className="bg-white shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-50 flex flex-col "> 
        <FaBox size={30} className="mb-4 text-gray-600" /> 
        <div className="text-left font-semibold">{items.length}</div> 
        <p className="text-left text-base">Total Items</p> 
      </div>

       <div className="bg-white shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-50 flex flex-col "> 
        <IoWarning size={30} className="mb-4 text-gray-600" /> 
        <div className="text-left font-semibold"> {items.filter((i) => i.quantity < 5).length} </div> 
        <p className="text-left text-base">Low Stock Items</p> 
        </div>
        <div className="bg-white shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-50 flex flex-col "> 
          <BsGraphUpArrow size={30} className="mb-4 text-gray-600" /> 
          <div className="text-left font-semibold"> ${monthlySpending} {/* ✅ dynamically shows total spending */} 
          </div> <p className="text-left text-base">This Month's Spent</p> 
        </div>

        <div className="bg-white shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-50 flex flex-col"> 
          <FaUsers size={30} className="mb-4 text-gray-600" /> 
          <div className="text-left font-semibold">5</div> 
          <p className="text-left text-base">Active Users</p> 
          </div> 
        </div>       
        
        <div className="flex justify-start gap-4 mx-28 mb-6"> 
          <button className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600"> 
            <a href="/additem"> + Add New Item</a> 
            </button> 
            
          <button className="bg-teal-100 text-gray-600 px-6 py-2 rounded-full hover:bg-gray-200"> 
            <a href="/home">View Inventory</a> 
            </button> 
        </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mx-28">
        <div>
          <h2 className="text-xl font-bold mb-4">Items Purchased This Month</h2>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-teal-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Item</th>
                <th className="px-6 py-3 text-left">Qty</th>
                <th className="px-6 py-3 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {monthlyItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{item.name}</td>
                  <td className="px-6 py-3">{item.quantity}</td>
                  <td className="px-6 py-3">${item.price}</td>
                </tr>
              ))}
              {monthlyItems.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No items purchased this month
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Tips to Manage Spending</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Track all purchases regularly</li>
            <li>Set a monthly spending limit</li>
            <li>Review unused items and avoid re-purchasing</li>
            <li>Plan purchases in bulk to save money</li>
          </ul>
        </div>
      </div>

      <div className="mx-28">
        <h2 className="text-xl font-bold mb-4">Recent Activity Log</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Item Name</th>
              <th className="px-6 py-3 text-left">Quantity</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Added Date</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{item.name}</td>
                <td className="px-6 py-3">{item.quantity}</td>
                <td className="px-6 py-3">${item.price}</td>
                <td className="px-6 py-3">
                  {new Date(item.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-3 flex gap-4">
                  <FaEdit
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={() => handleUpdateClick(item)}
                  />
                  <FaTrash
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {showModal && editingItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Item</h2>

            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              value={editingItem.name}
              onChange={(e) =>
                setEditingItem({ ...editingItem, name: e.target.value })
              }
            />

            <label className="block mb-2">Quantity</label>
            <input
              type="number"
              className="w-full border p-2 rounded mb-4"
              value={editingItem.quantity}
              onChange={(e) =>
                setEditingItem({ ...editingItem, quantity: e.target.value })
              }
            />

            <label className="block mb-2">Price</label>
            <input
              type="number"
              className="w-full border p-2 rounded mb-4"
              value={editingItem.price}
              onChange={(e) =>
                setEditingItem({ ...editingItem, price: e.target.value })
              }
            />

            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-teal-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
