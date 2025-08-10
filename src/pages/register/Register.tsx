import { Form, Formik } from "formik";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constant/route.constant";
import type { IRegisterPayload } from "../../interface/auth.interface";
import { SignUp } from "../../services/auth.service";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const initialValues: IRegisterPayload = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (values: IRegisterPayload) => {
    try {
      await SignUp(values);
      navigate(ROUTES.login);
      toast.success("Registered successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error || error.message);
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
        <h4>Register</h4>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange }) => (
            <Form className="login-form">
              <div className="form-field">
                <label>First Name</label>
                <input
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
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
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
        <div className="divider"></div>
        <p>
          Already have an account, <Link to={ROUTES.login}>Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
