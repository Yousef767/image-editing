import { ErrorMessage, Field, Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

function SignupForm() {
  const validation = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  return (
    <div className="wayBtns wayBtnsLogin">
      <div className="wayBox">
        <Link to={"/"} className="logoLink">
          <img className="logo" src="/logo.png" alt="" />
          Sign up
        </Link>
        <h1>
          <Link to={"/login"}>
            <Back />
          </Link>
          Continue with your mail
        </h1>
        <p>Use your email and other details to continue with us </p>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={validation}
        >
          <Form className="form">
            <div className="input">
              <span>Your mail</span>
              <Field name="email" type="email" placeholder="Write your mail" />
              <p>
                <ErrorMessage name="email" />
              </p>
            </div>
            <div className="input">
              <span>Username</span>
              <Field
                name="username"
                type="text"
                placeholder="Write your username"
              />
              <p>
                <ErrorMessage name="username" />
              </p>
            </div>
            <div className="input">
              <span>Password</span>
              <Field
                name="password"
                type="password"
                placeholder="Enter your password"
              />
              <p>
                <ErrorMessage name="password" />
              </p>
            </div>
            <button type="submit">Continue</button>
          </Form>
        </Formik>
        <div className="dont">
          Already have an account? <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;

function Back({ setShowForm }) {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => {
        setShowForm?.(false);
      }}
    >
      <path
        d="M0.39797 11.5276C0.143149 11.7811 -4.09799e-07 12.1249 -3.94129e-07 12.4834C-3.78458e-07 12.8419 0.14315 13.1857 0.39797 13.4392L8.08725 21.0873C8.21264 21.2164 8.36263 21.3194 8.52846 21.3902C8.69429 21.4611 8.87265 21.4984 9.05313 21.4999C9.23361 21.5015 9.4126 21.4673 9.57965 21.3993C9.74669 21.3313 9.89846 21.231 10.0261 21.104C10.1537 20.9771 10.2546 20.8261 10.323 20.66C10.3913 20.4938 10.4257 20.3158 10.4241 20.1363C10.4226 19.9568 10.3851 19.7794 10.3138 19.6144C10.2426 19.4495 10.1391 19.3003 10.0092 19.1756L4.64019 13.8353L22.6407 13.8353C23.0012 13.8353 23.347 13.6929 23.6019 13.4394C23.8568 13.1858 24 12.8419 24 12.4834C24 12.1248 23.8568 11.7809 23.6019 11.5274C23.347 11.2739 23.0012 11.1314 22.6407 11.1314L4.64019 11.1314L10.0092 5.79118C10.2568 5.5362 10.3938 5.19469 10.3907 4.84022C10.3876 4.48573 10.2447 4.14665 9.99267 3.89598C9.74066 3.64532 9.39974 3.50313 9.04335 3.50005C8.68696 3.49697 8.34361 3.63324 8.08725 3.87951L0.39797 11.5276Z"
        fill="#333333"
      />
    </svg>
  );
}
