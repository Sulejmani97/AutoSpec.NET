import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white px-28 py-8 text-center z-10 mt-96 border-t border-white">
      <div className="grid grid-cols-3 gap-8 mb-4">
        <div>
          <h2 className="text-lg font-bold mb-4 text-primary">About Us</h2>
          <p>
            We are dedicated to providing the best vehicle management solutions.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4 text-primary ">Quick Links</h2>
          <ul className="flex flex-col space-y-2">
            <li>
              <a href="/" className="cursor-pointer hover:text-gray-400">
                Home
              </a>
            </li>
            <li>
              <a
                href="/#aboutSection"
                className="cursor-pointer hover:text-gray-400"
              >
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="cursor-pointer hover:text-gray-400">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold mb-4 text-primary">
            Follow <span className="text-white underline">Auto</span>
            Spec
          </h2>
          <ul className="flex space-x-6 justify-center">
            <li className="flex items-center hover:text-gray-400 cursor-pointer">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-blue-600 mr-2" />
              </a>
            </li>
            <li className="flex items-center hover:text-gray-400 cursor-pointer">
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-blue-400 mr-2" />
              </a>
            </li>
            <li className="flex items-center hover:text-gray-400 cursor-pointer">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-pink-500 mr-2" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-4 text-center border-t border-gray-600">
        <p>© 2025 AutoSpec. All rights reserved.</p>
      </div>
    </footer>
  );
}
