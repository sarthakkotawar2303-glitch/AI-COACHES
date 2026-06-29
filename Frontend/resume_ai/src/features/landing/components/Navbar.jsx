import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-800 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            ResumeAI
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
          <Link
            to="/login"
            className="text-white hover:text-purple-400 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors duration-300"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors duration-300 hover-glow"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
