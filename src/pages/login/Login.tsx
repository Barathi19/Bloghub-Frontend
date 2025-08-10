import { Form, Formik } from "formik";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constant/route.constant";
import type { ILoginPayload } from "../../interface/auth.interface";
import { Auth } from "../../services/auth.service";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { LOCAL_CONSTANT } from "../../constant/app.constant";
import { useEffect } from "react";

const initialValues: ILoginPayload = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (values: ILoginPayload) => {
    try {
      const { token, ...user } = await Auth(values);

      localStorage.setItem(LOCAL_CONSTANT.token, token);
      localStorage.setItem(LOCAL_CONSTANT.user, JSON.stringify(user));

      navigate(ROUTES.blog);
      toast.success("Logged In successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || error.message);
      } else {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <section className="login-main-container">
      <div className="form-container">
        <h4>Log In</h4>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange }) => (
            <Form className="login-form">
              <div className="form-field">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Log In</button>
            </Form>
          )}
        </Formik>
        <div className="divider"></div>
        <p>
          Didn't have an account, <Link to={ROUTES.register}>Register</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
