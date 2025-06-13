import { useState } from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../fragments/auth/AuthOptions";
import LoginForm from "../fragments/auth/LoginForm";

function Login() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="authPage">
      <Link to={"/"} className="close">
        <img src="/media/icons/material-symbols_close.png" alt="" />
      </Link>
      {showForm ? (
        <LoginForm setShowForm={setShowForm} />
      ) : (
        <AuthOptions setShowForm={setShowForm} />
      )}
      <img className="authImg" src="/media/auth.jpg" alt="" />
    </div>
  );
}

export default Login;
