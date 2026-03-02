import { Link } from "react-router-dom";
import logo from "../images/logo_O.jpg";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="wrap">
        <a href="/" className="nb-logo">
          <img src={logo} alt="logo" />
          <span className="nb-logo-text">Onup OS</span>
        </a>

        <ul className={`nb-links ${menuOpen ? "open" : ""}`}>
          <li>
            <a href="#courses" onClick={() => setMenuOpen(false)}>
              Курстар
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              Биз жөнүндө
            </a>
          </li>
          <li>
            <a href="#directions" onClick={() => setMenuOpen(false)}>
              Багыттар
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Дарек
            </a>
          </li>
        </ul>

        <div className="nb-right">
          <a href="#team" className="nb-team">
            Команда
          </a>
          <a href="#enroll" className="nb-cta">
            Кабыл алуу
          </a>
          <button
            className={`nb-burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
