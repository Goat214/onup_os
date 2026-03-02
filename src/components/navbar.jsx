import { Link } from "react-router-dom";
import logo from "../images/logo_O.jpg";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="wrap">
        <Link to="/" className="nb-logo">
          <img src={logo} alt="Onup OS" />
          <span className="nb-logo-text">ONUP OS</span>
        </Link>

        <ul className="nb-links">
          <li><Link to="/courses">Курстар</Link></li>
          <li><a href="#about">Биз жөнүндө</a></li>
          <li><a href="#directions">Багыттар</a></li>
          <li><a href="#location">Дарек</a></li>
        </ul>

        <div className="nb-right">
          <a
            href="https://t.me/+WEiuzpYRk4BlNzli"
            className="nb-team"
            target="_blank"
            rel="noreferrer"
          >
            Биздин команда
          </a>
          <a href="#consult1" className="nb-cta">
            КОНСУЛЬТАЦИЯ
          </a>
        </div>
      </div>
    </nav>
  );
}