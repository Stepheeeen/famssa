import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import logo from "../../assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // Track active section

  const sectionsRef = useRef<any>({});

  const links = [
    { page: "Home", path: "#home" },
    { page: "About", path: "#about" },
    { page: "Vision & Mission", path: "#vision-&-mission" },
    { page: "News Forum", path: "#news-forum" },
    { page: "Excos", path: "#excos" },
    { page: "Newsletter", path: "#newsletter" },
    { page: "CBE", path: "/cbe" },
    { page: "Admin", path: "/admin" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.1);

      let currentSection = "";
      Object.keys(sectionsRef.current).forEach((key) => {
        const section = sectionsRef.current[key];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.3 && rect.bottom >= 200) {
            currentSection = key;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    links.forEach((link) => {
      const id = link.path.replace("#", "");
      sectionsRef.current[id] = document.getElementById(id);
    });
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 z-10 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-[#151414] text-white"
      }`}
    >
      <div className="px-6 md:px-10 flex justify-between items-center py-3">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="md:w-24 md:h-24 w-16 h-16" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {links.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className={`text-lg hover:underline transition ${
                activeSection === item.path.replace("#", "")
                  ? "text-[#FE9A2B]"
                  : isScrolled
                  ? "text-[#0B1D45]"
                  : "text-white"
              }`}
            >
              {item.page}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          className="md:hidden w-8 h-8"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg p-4 absolute w-full left-0">
          {links.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className={`block py-2 transition text-lg ${
                activeSection === item.path.replace("#", "")
                  ? "text-[#FE9A2B]"
                  : "text-gray-800"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.page}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
