import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-600 py-12 bottom-0 w-full text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p className="text-lg mt-2">
          Have questions or need assistance? We're here to help!
        </p>
        <div className="mt-4">
          <p className="text-lg">Email: rentit045@gmail.com</p>
      
        </div>
      </div>

      <div className="container mx-auto">
        <p className="text-white text-center">
          Copyright &copy; RentIT 🤍 2023. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
