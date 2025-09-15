import React from "react";

const Footer = () => {
  return (
    <footer className="bg-teal-600 text-white py-6 mt-10">
      <div className="container mx-auto text-center space-y-2">
        <p>&copy; {new Date().getFullYear()} HomeStock. All rights reserved.</p>
        <p>
          Follow us on:{" "}
          <a href="#" className="underline hover:text-gray-200">Facebook</a> |{" "}
          <a href="#" className="underline hover:text-gray-200">Instagram</a> |{" "}
          <a href="#" className="underline hover:text-gray-200">LinkedIn</a>
        </p>
        <p>
          Contact: <a href="mailto:support@homestock.com" className="underline hover:text-gray-200">support@homestock.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
