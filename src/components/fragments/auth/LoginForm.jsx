import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { Back } from "./BackBtn";
import { useState } from "react";
import { AxiosInstance } from "../../../api/axios";
import { LOGIN } from "../../../api/routes";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { handleError } from "../../../api/error";

function LoginForm({ setOption }) {
  const validation = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values, resetForm) => {
    setIsLoading(true);
    try {
      const res = await AxiosInstance.post(LOGIN, {
        ...values,
      });
      toast.success(res.data.message);
      Cookies.set("token", res.data.token);
      resetForm();
      setTimeout(() => {
        navigate(0);
      }, 2000);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="wayBtns wayBtnsLogin">
      <div className="wayBox">
        <div className="logoLink">
          <img className="logo" src="/logo.png" alt="" />
          Log in
        </div>
        <h1>
          <Back setOption={setOption} />
          Continue with your mail
        </h1>
        <p>Use your email and password to continue with us </p>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values, resetForm);
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
            <button
              type="button"
              onClick={() => {
                setOption("forgot");
              }}
              className="forgot"
            >
              Forgot password ?
            </button>
            <button type="submit">
              {isLoading ? <span className="loader"></span> : "Continue"}
            </button>
          </Form>
        </Formik>
        <div className="dont">
          Don’t have an account?{" "}
          <button
            onClick={() => {
              setOption("signup");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
