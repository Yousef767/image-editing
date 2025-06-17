import { useState } from "react";
import { useEffect, useRef } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import LoginForm from "../fragments/auth/LoginForm";
import SignupForm from "../fragments/auth/SignupForm";
import AuthOptions from "../fragments/auth/AuthOptions";
import ForgotPasswordForm from "../fragments/auth/ForgotPasswordForm";
import NewPasswordForm from "../fragments/auth/NewPasswordForm";

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
  const [show, setShow] = useState(false);
  const [option, setOption] = useState("options");
  const handleShow = (option) => {
    setShow(true);
    setOption(option);
  };
  const handleClickPopUp = (event) => {
    if (event.target.className === "popUp") {
      setShow(false);
    }
  };
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(null)
  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setShow(true);
      setOption("new");
      setToken(token);
    }
  }, [searchParams]);

  const allowedPaths = ["/", "/about", "/faq", "/stocks", "/contact"];
  if (!allowedPaths.includes(pathname)) {
    return null;
  }
  return (
    <>
      {show && (
        <div className="popUp" onClick={handleClickPopUp}>
          <div className="popUpInner">
            <div className="authPage">
              <button
                onClick={() => {
                  setShow(false);
                }}
                className="close"
              >
                <img src="/media/icons/material-symbols_close.png" alt="" />
              </button>
              {option === "login" ? (
                <LoginForm setOption={setOption} setShow={setShow} />
              ) : option === "signup" ? (
                <SignupForm setOption={setOption} setShow={setShow} />
              ) : option === "forgot" ? (
                <ForgotPasswordForm setOption={setOption} setShow={setShow}/>
              ) : option === "new" ? (
                <NewPasswordForm setOption={setOption} token={token} setShow={setShow}/>
              ) : (
                <AuthOptions setOption={setOption} />
              )}
              <img className="authImg" src="/media/auth.jpg" alt="" />
            </div>
          </div>
        </div>
      )}
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
                  <Link
                    to={`/contact`}
                    className={`link ${isActive("contact")}`}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="last">
            <div className="mLinks">
              <button
                onClick={() => {
                  handleShow("options");
                }}
                className="whiteBtn"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  handleShow("signup");
                }}
                className="yellowBtn"
              >
                Start for free
              </button>
            </div>
            <button className="menu" onClick={toggleNav}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
