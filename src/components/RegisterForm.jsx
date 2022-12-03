import { Formik, Form } from "formik";
import { registerUser } from "../api/register.api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterForm() {
  const navigate = useNavigate();
  const showSuccess = () =>
    toast.success("Registro exitoso!", {
      position: toast.POSITION.TOP_CENTER,
    });

  const showUserExist = () =>
    toast.error("Usuario ya existe!", { position: toast.POSITION.TOP_CENTER });

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          user: "",
        }}
        onSubmit={async (values, actions) => {
          try {
            const response = await registerUser(values);
            console.log(response);
            showSuccess();
            setTimeout(() => {
              navigate("/login", { state: { token: response.token } });
            }, 2000);
          } catch (error) {
            showUserExist();
            console.log(error);
            actions.resetForm();
          }
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting, values }) => (
          <Form>
            <label>Nombres y Apellidos</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={values.name}
            />

            <label>Correo</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
            />

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
              {isSubmitting ? "Registrando..." : "Registrar"}
            </button>
            <ToastContainer />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default RegisterForm;
