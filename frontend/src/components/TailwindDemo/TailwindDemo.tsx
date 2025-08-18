import React from "react";

const TailwindDemo: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 animate-fade-in">
        Tailwind CSS Demo
      </h2>
      <p className="text-lg mb-4">
        This component demonstrates Tailwind CSS utility classes working
        alongside your existing styles.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
          <i className="fas fa-rocket text-2xl mb-2 block text-yellow-300"></i>
          <h3 className="text-lg font-semibold">Fast Development</h3>
          <p className="text-sm opacity-90">
            Build modern UIs quickly with utility classes
          </p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
          <i className="fas fa-palette text-2xl mb-2 block text-green-300"></i>
          <h3 className="text-lg font-semibold">Beautiful Design</h3>
          <p className="text-sm opacity-90">
            Pre-designed color palettes and spacing
          </p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-blur-sm">
          <i className="fas fa-mobile-alt text-2xl mb-2 block text-blue-300"></i>
          <h3 className="text-lg font-semibold">Responsive</h3>
          <p className="text-sm opacity-90">
            Mobile-first responsive design system
          </p>
        </div>
      </div>
      <button className="mt-6 bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors duration-300 transform hover:scale-105">
        Get Started
      </button>
    </div>
  );
};

export default TailwindDemo;
