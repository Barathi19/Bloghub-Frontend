import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { ROUTES } from "../../constant/route.constant";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="menu-container" ref={menuRef}>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <div className="menu-dropdown">
          <Link to={ROUTES.profile}>Profile</Link>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = ROUTES.login;
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu;
