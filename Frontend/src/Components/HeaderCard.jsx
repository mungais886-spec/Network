import React from "react";
import { FaInstagram, FaFacebookF, FaXTwitter, FaEnvelope, FaPhone } from "react-icons/fa6";

export const HeaderCard = () => {
  return (
    <div className="w-full h-[30px] bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 text-gray-600 text-[10px] sm:text-xs">
      <div className="flex items-center gap-3">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-purple-600 transition-colors">
          <FaInstagram size={12} />
        </a>
        <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" className="hover:text-black transition-colors">
          <FaXTwitter size={12} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-blue-600 transition-colors">
          <FaFacebookF size={12} />
        </a>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <a href="mailto:info@example.com" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
          <FaEnvelope size={11} />
          <span className="hidden sm:inline">Email Us</span>
        </a>
        <a href="tel:+254700000000" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
          <FaPhone size={10} />
          <span className="hidden sm:inline">Call Us</span>
        </a>
      </div>
    </div>
  );
};

export default HeaderCard;