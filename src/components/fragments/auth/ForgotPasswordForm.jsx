import { ErrorMessage, Field, Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Back } from "./BackBtn";

function SignupForm() {
  const validation = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  return (
    <div className="wayBtns wayBtnsLogin">
      <div className="wayBox">
        <Link to={"/"} className="logoLink">
          <img className="logo" src="/logo.png" alt="" />
          Forgot password
        </Link>
        <h1>
          <Link to={"/login"}>
            <Back />
          </Link>
          Continue with your mail
        </h1>
        <p>
          Please enter your email address, we will send you a link to create a
          new password{" "}
        </p>
        <Formik
          initialValues={{ email: "" }}
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

            <button type="submit">Send</button>
          </Form>
        </Formik>
        <div className="note">
          Note: If you sign-up using social media account, please make sure you
          try to login using the same account
        </div>
      </div>
    </div>
  );
}

export default SignupForm;


