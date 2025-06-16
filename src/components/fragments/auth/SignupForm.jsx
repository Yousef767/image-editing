import { ErrorMessage, Field, Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Back } from "./BackBtn";

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
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Password confirmation is required"),
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
          initialValues={{
            username: "",
            email: "",
            password: "",
            password_confirmation: "",
          }}
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
              <span>Username</span>
              <div className="field">
                <Field
                  name="username"
                  type="text"
                  placeholder="Write your username"
                />
              </div>
              <p>
                <ErrorMessage name="username" />
              </p>
            </div>
            <div className="input">
              <span>Password</span>
              <div className="field">
                <Field name="password" type="password" placeholder="********" />
              </div>
              <p>
                <ErrorMessage name="password" />
              </p>
            </div>
            <div className="input">
              <span>Rewrite password</span>
              <div className="field">
                <Field
                  name="password_confirmation"
                  type="password"
                  placeholder="********"
                />
              </div>
              <p>
                <ErrorMessage name="password_confirmation" />
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
