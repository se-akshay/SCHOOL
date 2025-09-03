import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#f8f9fb] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <span className="text-5xl font-bold text-[#2980d9]">500+</span>
            <div className="mt-2 text-lg text-gray-500">Schools Registered</div>
          </div>
          <div>
            <span className="text-5xl font-bold text-[#2ecc71]">50+</span>
            <div className="mt-2 text-lg text-gray-500">Cities Covered</div>
          </div>
          <div>
            <span className="text-5xl font-bold text-[#b1902a]">10+</span>
            <div className="mt-2 text-lg text-gray-500">States Active</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
