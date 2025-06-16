import { ErrorMessage, Field, Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Back } from "./BackBtn";

function LoginForm({ setShowForm }) {
  const validation = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  return (
    <div className="wayBtns wayBtnsLogin">
      <div className="wayBox">
        <Link to={"/"} className="logoLink">
          <img className="logo" src="/logo.png" alt="" />
          Log in
        </Link>
        <h1>
          <Back setShowForm={setShowForm} />
          Continue with your mail
        </h1>
        <p>Use your email and password to continue with us </p>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);
          }}
          validationSchema={validation}
        >
          <Form className="form">
            <div className="input">
              <span>Your mail</span>
              <div className="field">
                <Field
                  name="email"
                  type="email"
                  placeholder="Write your mail"
                />
              </div>
              <p>
                <ErrorMessage name="email" />
              </p>
            </div>
            <div className="input">
              <span>Password</span>
              <div className="field">
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <p>
                <ErrorMessage name="password" />
              </p>
            </div>
            <Link to={"/forgot-password"} className="forgot">
              Forgot password ?
            </Link>
            <button type="submit">Continue</button>
          </Form>
        </Formik>
        <div className="dont">
          Don’t have an account? <Link to={"/signup"}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
