import React from 'react';
import SocialMediaShare from './SocialMediaShare'; // Import the SocialMediaShare component

const Footer = () => {
  const currentUrl = window.location.href;
  const currentTitle = document.title;

  return (
    <footer className="bg-gray-700 text-white p-4 mt-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Real Estate Management. All rights reserved.</p>
        <div className="contact-info mt-4">
          <h3 className="text-lg font-semibold">Contact Us:</h3>
          <p className="text-md">Phone: <a href="tel:+1225934567890" className="text-blue-400">+2519567890</a></p>
          <p className="text-md">Email: <a href="mailto:realstate@gmail.com" className="text-blue-400">realstate@gmail.com</a></p>
        </div>
        {/* Add Social Media Share Icons */}
        <div className="social-media-icons mt-4 flex justify-center space-x-4">
          <h3 className="text-lg font-semibold">If our service is good, share it:</h3>
          {/* Pass the current URL and title to the SocialMediaShare component */}
          <SocialMediaShare url={currentUrl} title={currentTitle} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;