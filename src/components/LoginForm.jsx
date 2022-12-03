import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Formik } from "formik";
import { loginUser } from "../api/login.api";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const showSuccess = () =>
    toast.success("Login exitoso!", {
      position: toast.POSITION.TOP_CENTER,
    });

  const showError = () =>
    toast.error("Usuario o constraseña incorrectos!", {
      position: toast.POSITION.TOP_CENTER,
    });

  return (
    <div>
      <Formik
        initialValues={{ user: "", password: "" }}
        onSubmit={async (values, actions) => {
          try {
            const response = await loginUser(values);
            console.log(response.data.token);
            showSuccess();
            setTimeout(() => {
              navigate("/mail", { state: { token: response.data.token } });
            }, 2000);
          } catch (error) {
            showError();
            actions.resetForm();
            console.log(error);
          }
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting, values }) => (
          <Form>
            <label>Usuario</label>
            <input
              type="text"
              name="user"
              onChange={handleChange}
              value={values.user}
            />

            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
            />

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Ingresando..." : "Ingresar"}
            </button>
            <ToastContainer />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
