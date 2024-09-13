import React from 'react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Our Platform</h1>
          <p className="text-xl text-gray-300 mb-8">Discover amazing products that will revolutionize your workflow.</p>
          <a 
            href="/products" 
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-105 group"
          >
            Go to Products
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}