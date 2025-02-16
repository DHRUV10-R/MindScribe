import React from "react";
import { useNavigate } from "react-router-dom";

function BenefitsPage() {
  const navigateTo = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-2xl bg-white shadow-md rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Why Login to MindScrible?</h1>
        <p className="mb-4 text-gray-700">
          Logging in gives you access to exclusive features, including:
        </p>
        <ul className="list-disc list-inside text-left text-gray-600 mb-4">
          <li>Personalized content recommendations</li>
          <li>Ability to save and bookmark your favorite articles</li>
          <li>Engage with the community through comments and discussions</li>
          <li>Exclusive access to premium blog posts</li>
          <li>Secure and seamless experience across devices</li>
        </ul>
        <button
          onClick={() => navigateTo("/register")}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
        >
          Register Now
        </button>
        <button
          onClick={() => navigateTo("/login")}
          className="mt-4 ml-2 px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default BenefitsPage;
