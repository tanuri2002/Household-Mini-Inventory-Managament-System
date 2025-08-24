import React from 'react'
import { FaPeopleLine } from "react-icons/fa6";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoWarning } from "react-icons/io5";
import { FaBox } from "react-icons/fa";
function Dashboard() {
  return (
    <div>
      {/* Card Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 my-10 mx-28">
                    
                    {/* Card 1 */}
                        <div className="bg-white shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-50 flex flex-col ">
                            <FaBox  size={30} className="mb-4 text-gray-600" />
                              <div className="text-left font-semibold">247</div>
                              <p className="text-left text-sm">Total Items</p>        
                        </div>
            
                    {/* Card 2 */}
                        <div className="bg-white shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-50 flex flex-col ">
                            <IoWarning size={30} className="mb-4 text-gray-600" />
                              <div className="text-left font-semibold">12</div>
                              <p className="text-left text-sm">Low Stock Items</p>
                        </div>
            
                    {/* Card 3 */}
                        <div className="bg-white shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-50 flex flex-col ">
                            <BsGraphUpArrow size={30} className="mb-4 text-gray-600" />
                              <div className="text-left font-semibold">$1256</div>
                              <p className="text-left text-sm">This Month's Spent</p>
                        </div>
            
                    {/* Card 4 */}
                        <div className="bg-white shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300ease-in-out hover:bg-teal-50 flex flex-col">
                            <FaPeopleLine size={30} className="mb-4 text-gray-600" />
                              <div className="text-left font-semibold">5</div>
                              <p className="text-left text-sm">Active Users</p>                             
                        </div>
      </div>

      <div className="flex justify-start gap-4 mx-28">
          <button className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600">
            <a href="/additem"> +  Add New Item</a>
          </button>
          <button className="bg-teal-100 text-gray-600 px-6 py-2 rounded-full hover:bg-gray-200">
            <a href="/home">View Inventory</a>
          </button>
        </div>


    </div>
  )
}

export default Dashboard
