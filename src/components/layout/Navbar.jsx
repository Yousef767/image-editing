import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const nav = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
    setTimeout(() => {
      if (nav.current) {
        nav.current?.classList.remove("activeMenu");
      }
    }, 500);
  }, [pathname]);

  const toggleNav = () => {
    nav.current?.classList.toggle("activeMenu");
  };

  // const toggleDrop = (event) => {
  //   event.currentTarget.classList.toggle("active");
  // };
  const isActive = (path) => {
    if (path === "/") {
      return pathname === path ? "active" : "";
    }
    if (pathname.includes(path)) {
      return "active";
    }
    return "";
  };
  const allowedPaths = ["/", "/about", "/faq", "/stocks", "/contact"];
  if (!allowedPaths.includes(pathname)) {
    return null;
  }
  return (
    <nav ref={nav}>
      <div className="box f-s">
        <Link to="" className="logo">
          <img src="/logo.png" alt="Logo" />
        </Link>
        <div className="links">
          <div className="ls">
            <ul className="mainLinks">
              <li>
                <Link to={`/`} className={`link ${isActive("/")}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to={`/about`} className={`link ${isActive("about")}`}>
                  About
                </Link>
              </li>
              <li>
                <Link to={`/faq`} className={`link ${isActive("faq")}`}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to={`/stocks`} className={`link ${isActive("stocks")}`}>
                  Stocks
                </Link>
              </li>
              <li>
                <Link to={`/contact`} className={`link ${isActive("contact")}`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="last">
          <div className="mLinks">
            <Link to={`/login`} className="whiteBtn">
              Log in
            </Link>
            <Link to={`/login`} className="yellowBtn">
              Start for free
            </Link>
          </div>
          <button className="menu" onClick={toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
