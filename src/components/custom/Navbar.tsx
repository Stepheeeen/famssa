import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import logo from "../../assets/logo.jpg";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  const links = [
    { page: "Home", path: "/#home" },
    { page: "About", path: "/#about" },
    { page: "Vision & Mission", path: "/#vision-&-mission" },
    { page: "News Forum", path: "/#news-forum" },
    { page: "Excos", path: "/#excos" },
    { page: "Newsletter", path: "/#newsletter" },
    { page: "Library", path: "/library" },
    { page: "CBE", path: "/cbe" },
    { page: "Admin", path: "/admin" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Populate refs for sections
    links.forEach((link) => {
      if (link.path.startsWith("/#")) {
        const id = link.path.substring(2); // Remove "/#"
        sectionsRef.current[id] = document.getElementById(id);
      }
    });

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3, // Section should be at least 30% visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionsRef.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
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
          {links.map((item, index) => {
            const isActive =
              activeSection === item.path.substring(2) ||
              location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`text-lg hover:underline transition ${
                  isActive
                    ? "text-[#FE9A2B]"
                    : isScrolled
                    ? "text-[#0B1D45]"
                    : "text-white"
                }`}
              >
                {item.page}
              </Link>
            );
          })}
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
          {links.map((item, index) => {
            const isActive =
              activeSection === item.path.substring(2) ||
              location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`block py-2 transition text-lg ${
                  isActive
                    ? "text-[#FE9A2B]"
                    : isScrolled
                    ? "text-[#0B1D45]"
                    : "text-white"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.page}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};
export default Navbar;
