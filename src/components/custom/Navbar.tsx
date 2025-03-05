import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Scroll effect to change navbar color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 z-10 transition-all duration-300 ${
        isScrolled ? "bg-white" : "bg-[#151414] text-white"
      }`}
    >
      <div className="px-10 mx-auto flex justify-between items-center py-3">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-32 h-32" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-5">
          {[
            { page: "Home", path: "/" },
            { page: "About", path: "#about" },
            { page: "Vision & Mission", path: "#vision-&-mission" },
            { page: "News Forum", path: "/news-forum" },
            { page: "Excos", path: "#excos" },
            { page: "Newsletter", path: "#newsletter" },
            { page: "CBE", path: "/cbe" },
            { page: "Admin", path: "/admin" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`${
                location.pathname === item.path
                  ? "text-[#FE9A2B]"
                  : isScrolled
                  ? "text-[#0B1D45]"
                  : "text-white"
              } text-md hover:underline`}
            >
              {item.page}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg p-4">
          {[
            "Home",
            "About",
            "Vision & Mission",
            "News Forum",
            "Excos",
            "Newsletter",
            "CBE",
            "Admin",
          ].map((item, index) => (
            <Link
              key={index}
              to={`/${item.toLowerCase().replace(/ & | /g, "-")}`}
              className="block py-2 text-gray-800 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
