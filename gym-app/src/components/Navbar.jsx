import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
    const scrollToContact = () => {
    const el = document.getElementById("contact-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
    return (
    <nav className="bg-gray-900 text-white px-6 py-4 relative flex items-center justify-between shadow-md">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Thor Fitness" className="h-10 w-30 object-contain" />
        <span className="text-xl font-bold text-blue-300">Thor Fitness</span>
      </div>

     {/* Center: Gallery and Contact Us buttons side by side */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-8">
        <Link
          to="/gallery"
          className="text-blue-500 font-semibold text-lg hover:text-blue-400 transition"
        >
          Gallery
        </Link>
        <button
          onClick={scrollToContact}
          className="text-blue-500 font-semibold text-lg hover:text-blue-400 transition"
        >
          Contact Us
        </button>
      </div>

      {/* Right: Book link with golden color */}
      <div>
        <Link to="/book" className="hover:text-yellow-400 text-yellow-400 font-semibold">
          Book
        </Link>
      </div>
    </nav>
  );
}
