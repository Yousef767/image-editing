import { Link } from "react-router-dom";
import SignupForm from "../fragments/auth/SignupForm";

function Signup() {
  return (
    <div className="authPage">
      <Link to={"/"} className="close">
        <img src="/media/icons/material-symbols_close.png" alt="" />
      </Link>
      <SignupForm />
      <img className="authImg" src="/media/auth.jpg" alt="" />
    </div>
  );
}

export default Signup;
