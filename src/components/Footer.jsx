import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="mt-4 bg-gray-300 text-gray-900 py-4 text-center">
        <nav className="container mx-auto">
          <ul className="flex flex-col container gap-4">
            <li>
              <Link
                to="/about"
                className="font-medium text-gray-700 hover:text-blue-600 duration-300"
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="font-medium text-gray-700 hover:text-blue-600 duration-300"
              >
                BLOG
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="font-medium text-gray-700 hover:text-blue-600 duration-300"
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>
        <small className="mt-4 inline-block">
          @2025tomy_dev all rights reserved
        </small>
      </footer>
    </>
  );
}

export default Footer;
