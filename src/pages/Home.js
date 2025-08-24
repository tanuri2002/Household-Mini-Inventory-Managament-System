import React from 'react';
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdInventory } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";

function Home(){
    return(
        <div className="px-6 md:px-20 py-20">

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
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16 mx-80">
        {/* Card 1 */}
            <a href="/dashboard"><div className="bg-teal-50 shadow-lg p-10 rounded-3xl text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-100 flex flex-col">
                <MdOutlineDashboard  size={30} className="mb-4 text-gray-600" />
                <div className="text-left font-semibold">View Dashboard</div>
                <p className="text-left text-xs">Check your analytics and performance metrics</p>
            </div></a>
        {/* Card 2 */}
            <a href="/additem"><div className="bg-teal-50 shadow-lg p-10 rounded-3xl text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-100 flex flex-col">
                <IoIosAddCircleOutline size={30} className="mb-4 text-gray-600" />
                <div className="text-left font-semibold">Add Item</div>
                <p className="text-left text-xs">Create and add new items to your inventory</p>
            </div></a>
        {/* Card 3 */}
            <div className="bg-teal-50 shadow-lg p-10 rounded-3xl text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-100 flex flex-col">
                <MdInventory size={30} className="mb-4 text-gray-600" />
                <div className="text-left font-semibold">View Inventory</div>
                <p className="text-left text-xs">Browse and manage your current inventory</p>
            </div>
        {/* Card 4 */}
            <a href="/homepg"><div className="bg-teal-50 shadow-lg p-10 rounded-3xl text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-100 flex flex-col">
                <RiLogoutBoxRLine size={30} className="mb-4 text-gray-600" />
                <div className="text-left font-semibold">Logout</div>
                <p className="text-left text-xs">Securely sign out from your account</p>
            </div></a>
      </section>

      </div>
    );
}
export default Home;