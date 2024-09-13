import React from 'react'

export default function Navbar({ title }) {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 shadow-md flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <a href="/" className="text-white text-xl font-semibold hover:text-yellow-300 transition duration-300">{title}</a>
        <form className="flex">
          <input
            type="search"
            placeholder="Search..."
            className="px-3 py-2 rounded-full bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            type="submit"
            className="flex items-center px-3 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition duration-300"
          >
            <svg
              className="h-4 w-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            Search
          </button>
        </form>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-4">
        <a href="/products" className="text-white hover:text-yellow-300 transition duration-300">
          Products
        </a>
        <a href="/about" className="text-white hover:text-yellow-300 transition duration-300">
          About Us
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white hover:text-yellow-300">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  )
}