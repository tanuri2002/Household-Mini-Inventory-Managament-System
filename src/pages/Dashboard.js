import React from 'react';
import { FaBoxOpen, FaTags, FaSearch, FaEdit} from 'react-icons/fa';
import { MdOutlineDashboard } from "react-icons/md";
function Dashboard(){
    return(
        <div className="px-6 md:px-20 py-12">

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">
          Welcome Sarah !
        </h1>
        <p className="text-gray-600 mb-6">
          Choose an action to get started
        </p>
      </section>
      

      {/* Card Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-20 mx-52">
        {/* Card 1 */}
            <div className="bg-white shadow-lg p-10 place-content-end rounded-3xl text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-gray-200 flex flex-col items-center">
                <MdOutlineDashboard  size={40} className="mb-4 text-gray-600" />
                View Dashboard
            </div>
        {/* Card 2 */}
            <div className="bg-white shadow-lg p-10 rounded-3xl text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-gray-200 flex flex-col items-center">
                <FaBoxOpen size={40} className="mb-4 text-gray-600" />
                Add Item
            </div>
        {/* Card 3 */}
            <div className="bg-white shadow-lg p-10 rounded-3xl text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-gray-200 flex flex-col items-center">
                <FaBoxOpen size={40} className="mb-4 text-gray-600" />
                View Inventory
            </div>
        {/* Card 4 */}
            <div className="bg-white shadow-lg p-10 rounded-3xl text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-gray-200 flex flex-col items-center">
                <FaBoxOpen size={40} className="mb-4 text-gray-600" />
                Logout
            </div>
      </section>

      </div>
    );
}
export default Dashboard;