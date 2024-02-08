import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-[#1E1E1E] text-gray-700 dark:text-gray-100 py-5 text-lg flex justify-center">
      <div className="container px-4 max-w-full mx-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* About Section */}
          <div className="md:col-span-2 ">
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="font-medium">
              Welcome to Naveen's Blog, where we explore the world of
              technology, share coding tutorials, and discuss the latest trends
              in software development
            </p>
          </div>
          {/* Follow Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="flex md:flex-col  space-x-4">
              <li className="md:ml-4">
                <a
                  href="#"
                  className="dark:text-blue-300 text-blue-800 hover:text-gray-300"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="dark:text-blue-300 text-blue-800 hover:text-gray-300"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="dark:text-blue-300 text-blue-800 hover:text-gray-300"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="dark:text-blue-300 text-blue-800 hover:text-gray-300"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul>
              <li>
                <a
                  href="#"
                  className="dark:text-blue-300 text-blue-800 hover:text-gray-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="dark:text-blue-300 text-blue-800 hover:text-gray-300"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="dark:text-blue-300 text-blue-800 hover:text-gray-300"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm">Email: info@example.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
          </div>
        </div>
        {/* Bottom Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-8 flex justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} Naveen's Blog. All rights
            reserved.
          </p>
          <div>
            <a
              href="#"
              className="dark:text-blue-300 text-blue-800 hover:text-gray-300 mr-4"
            >
              Terms
            </a>
            <a
              href="#"
              className="dark:text-blue-300 text-blue-800 hover:text-gray-300"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
