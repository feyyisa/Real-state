import React from 'react';
import SocialMediaShare from './SocialMediaShare';

const Footer = () => {
  const currentUrl = window.location.href;
  const currentTitle = document.title;
  return (
    <footer className="bg-gray-700 text-white py-2 px-4"> {/* Reduced vertical padding */}
      <div className="mx-auto max-w-md text-center">
        <p className="mb-1 text-sm">&copy; 2025 Real Estate Management. All rights reserved.</p>

        <div className="contact-info mt-2 mb-2">
          <h3 className="text-base font-semibold mb-1">Contact Us:</h3>
          <p className="text-sm mb-0.5">
            Phone: <a href="tel:+1225934567890" className="text-blue-400">+2519567890</a>
          </p>
          <p className="text-sm mb-0">
            Email: <a href="mailto:realstate@gmail.com" className="text-blue-400">realstate@gmail.com</a>
          </p>
        </div>

        <div className="social-media-icons flex justify-center space-x-4">
          <h3 className="text-base font-semibold mr-2 my-auto">If our service is good, share it:</h3>
          <SocialMediaShare url={currentUrl} title={currentTitle} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
