import { Link } from "react-router-dom";
import ForgotPasswordForm from "../fragments/auth/ForgotPasswordForm";

function ForgotPassword() {
  return (
    <div className="authPage">
      <Link to={"/"} className="close">
        <img src="/media/icons/material-symbols_close.png" alt="" />
      </Link>
      <ForgotPasswordForm />
      <img className="authImg" src="/media/auth.jpg" alt="" />
    </div>
  );
}

export default ForgotPassword;
