import React from 'react';
import { FaBoxOpen, FaTags, FaSearch, FaEdit } from 'react-icons/fa';

function HomePg() {
  return (
    <div className="px-6 md:px-20 py-12">

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">
          Keep Track of Everything You Own - Effortlessly
        </h1>
        <p className="text-gray-600 mb-6">
          From kitchen gadgets to electronics and furniture, manage your household items in one secure place.
          Accessible anytime, anywhere.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-teal-500 text-white px-6 py-2 rounded-full hover:bg-teal-600">
            <a href="/signup">Sign Up Free</a>
          </button>
          <button className="bg-teal-100 text-gray-600 px-6 py-2 rounded-full hover:bg-gray-200">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className='mx-20'>
        <h2 className="text-xl font-semibold text-teal-600 mb-8">
          What You Can Do From HomeStock?
        </h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Card 1 */}
            <div className="bg-teal-50 shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out hover:bg-teal-100 flex flex-col items-center">
                <FaBoxOpen size={40} className="mb-4 text-gray-600" />
                <center>Add your stuff in seconds — from your sofa to your spice rack, store it all with photos and notes.</center>
            </div>

        {/* Card 2 */}
            <div className="bg-teal-50 shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 hover:bg-teal-100 flex flex-col items-center">
                <FaTags size={40} className="mb-4 text-gray-600" />
                <center>Organize your way — group by room, category, or even create your own tags.</center>
            </div>

        {/* Card 3 */}
            <div className="bg-teal-50 shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 hover:bg-teal-100 flex flex-col items-center">
                <FaSearch size={40} className="mb-4 text-gray-600" />
                <center>Find things fast — no more digging through closets or guessing which box it’s in.</center>
        </div>

        {/* Card 4 */}
            <div className="bg-teal-50 shadow-lg p-10 rounded-lg text-gray-700 hover:scale-105 hover:-translate-y-2 transition-transform duration-300 hover:bg-teal-100 flex flex-col items-center">
                <FaEdit size={40} className="mb-4 text-gray-600" />
                <center>Keep it up to date — quickly edit, delete, or move items as your home changes.</center>
            </div>
        </div>

      </section>
    </div>
  );
}

export default HomePg;
