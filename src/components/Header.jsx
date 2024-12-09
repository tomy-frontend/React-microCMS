import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full text-gray-700 border-b border-gray-500 flex flex-col items-center justify-between mx-auto px-4 py-4 md:flex-row">
      <h1 className="text-4xl font-bold">
        <Link to="/" className="text-gray-700 hover:text-blue-600 duration-300">
          MyBlog
        </Link>
      </h1>
      <nav className="mt-4 md:mt-0">
        <ul className="flex container gap-4">
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
    </header>
  );
}

export default Header;
