import { ErrorMessage, Field, Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Back } from "./BackBtn";

function NewPassword() {
  const validation = Yup.object().shape({
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
          New Password
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
            <button type="submit">Send</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default NewPassword;
