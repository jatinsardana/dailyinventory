import React from 'react'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">
            Data Model System
          </h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            Our Data Model System revolutionizes the way you handle and interpret data. 
            With cutting-edge algorithms and intuitive interfaces, we empower businesses 
            to make data-driven decisions faster and more accurately than ever before.
            </p>
        </div>
      </div>
    </div>
  )
}