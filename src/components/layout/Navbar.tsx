import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout, isAuthor } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Plan Trip", path: "/planner" },
    { label: "Explore", path: "/explore" },
    { label: "Marketplace", path: "/marketplace" },
    { label: "Events", path: "/events" },
  // { label: "Events Calendar", path: "/events-calendar" },
    ...(isAuthor ? [{ label: "Analytics", path: "/analytics" }] : []),
    { label: "Maps", path: "/map" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-[9999] transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-forest bg-clip-text text-transparent">
              Regus
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(item.path)}
                className="text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
            {/* Search input for desktop */}
            <form
              onSubmit={e => {
                e.preventDefault();
                if (searchTerm.trim()) {
                  navigate(`/explore?q=${encodeURIComponent(searchTerm.trim())}`);
                  setSearchTerm("");
                }
              }}
              className="flex items-center space-x-2 bg-white/80 dark:bg-card/80 rounded-full shadow-md px-3 py-1 border border-muted focus-within:ring-2 focus-within:ring-primary"
              style={{ minWidth: "200px" }}
            >
              <Search className="h-5 w-5 text-muted-foreground mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search places..."
                className="bg-transparent outline-none text-sm flex-1"
              />
            </form>
            {/* Login/Logout button for desktop */}
            {isAuthenticated ? (
              <Button
                variant="default"
                size="sm"
                className="ml-2 rounded-full px-5 font-semibold"
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="ml-2 rounded-full px-5 font-semibold"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-card/95 backdrop-blur-md rounded-lg mt-2 p-4"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className="block w-full text-left py-2 px-4 hover:bg-accent rounded-lg transition-colors"
              >
                {item.label}
              </button>
            ))}
            {/* Login/Logout button for mobile */}
            {isAuthenticated ? (
              <Button
                variant="default"
                size="sm"
                className="w-full mt-3 rounded-full px-5 font-semibold"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="w-full mt-3 rounded-full px-5 font-semibold"
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
              >
                Login
              </Button>
            )}
            {/* Search input for mobile */}
            <form
              onSubmit={e => {
                e.preventDefault();
                if (searchTerm.trim()) {
                  navigate(`/explore?q=${encodeURIComponent(searchTerm.trim())}`);
                  setSearchTerm("");
                  setIsOpen(false);
                }
              }}
              className="flex items-center space-x-2 bg-white/80 dark:bg-card/80 rounded-full shadow-md px-3 py-1 border border-muted focus-within:ring-2 focus-within:ring-primary mt-4"
            >
              <Search className="h-5 w-5 text-muted-foreground mr-2" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search places..."
                className="bg-transparent outline-none text-sm flex-1"
              />
            </form>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;