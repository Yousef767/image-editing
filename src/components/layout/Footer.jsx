import { Link, useLocation } from "react-router-dom";
import { useShowOption } from "../../hooks/ShowOptionProvider";
function Footer() {
  const location = useLocation();
  const pathname = location.pathname;
  const { setShow, setOption } = useShowOption();
  const allowedPaths = ["/", "/about", "/faq", "/stocks", "/contact"];
  if (!allowedPaths.includes(pathname)) {
    return null;
  }
  const isActive = (path) => {
    if (path === "/") {
      return pathname === path ? "active" : "";
    }
    if (pathname.includes(path)) {
      return "active";
    }
    return "";
  };
  return (
    <footer>
      <div className="box footer">
        <div className="footerBox topFooter">
          <div className="footerTitle">
            <h1>
              Ready to design? <br /> Start registration now
            </h1>
            <button
              className="btn"
              onClick={() => {
                setShow(true);
                setOption("signup");
              }}
            >
              Start design
            </button>
          </div>
          <div className="media">
            <h2>Follow us on </h2>
            <ul>
              <li>
                <a href="##" target="_blank">
                  <img src="/media/icons/instagram.svg" alt="" />
                </a>
              </li>
              <li>
                <a href="##" target="_blank">
                  <img src="/media/icons/snap.svg" alt="" />
                </a>
              </li>
              <li>
                <a href="##" target="_blank">
                  <img src="/media/icons/facebook.svg" alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footerBox bottomFooter">
          <div className="media">
            <h2>Download Kitaba app </h2>
            <a href="##" className="a">
              <img src="/media/apple.png" alt="" />
            </a>
          </div>
          <div className="media">
            <h2 className="underline">Kitaba </h2>
            <ul className="footerLinks">
              <li>
                <Link to={`/`} className={` ${isActive("/")}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to={`/about`} className={` ${isActive("about")}`}>
                  About
                </Link>
              </li>
              <li>
                <Link to={`/faq`} className={` ${isActive("faq")}`}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to={`/stocks`} className={` ${isActive("stocks")}`}>
                  Stocks
                </Link>
              </li>
              <li>
                <Link to={`/contact`} className={` ${isActive("contact")}`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
