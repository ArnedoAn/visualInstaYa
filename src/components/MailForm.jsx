import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { getMail, addMail } from "../api/mail.api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MailForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const type = location.state.type;
  function convertFormat(values) {
    const {
      toDate,
      high,
      width,
      length,
      weigth,
      fragile,
      nameToUser,
      dniToUser,
      addressToUser,
      cityToUser,
      nameFromUser,
      addressFromUser,
      cityFromUser,
      status,
    } = values;

    const data = {
      toDate: new Date(toDate),
      package: {
        dimensions: { high, width, length },
        weigth,
        fragile: fragile === "Si" ? true : false,
      },
      toUser: {
        name: nameToUser,
        dni: dniToUser,
        address: addressToUser,
        city: cityToUser,
      },
      fromUser: {
        name: nameFromUser,
        address: addressFromUser,
        city: cityFromUser,
      },
      status,
    };
    return data;
  }

  const dateFormat = (date) => {
    if (typeof date === "string") {
      const dateArray = date.split("-");
      return `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`;
    } else {
      return date.toISOString().split("T")[0];
    }
  };

  const [mail, setMail] = useState({
    toDate: new Date(),
    package: {
      dimensions: { high: 0, width: 0, length: 0 },
      weigth: 0,
      fragile: false,
    },
    toUser: {
      nameToUser: "",
      dniToUser: "",
      addressToUser: "",
      cityToUser: "",
    },
    fromUser: { nameFromUser: "", addressFromUser: "", cityFromUser: "" },
    status: "Guardado",
  });

  const showSuccess = () =>
    toast.success("Paquete enviado!", {
      position: toast.POSITION.TOP_CENTER,
    });

  const showError = (text) =>
    toast.error(text, {
      position: toast.POSITION.TOP_CENTER,
    });

  useEffect(() => {
    if (type === "edit") {
      setMail(getMail(location.state.token, { id: location.state.id }));
    }
  }, []);

  const sendNewMail = async (data) => {};

  const sendEditMail = async (data) => {};

  useEffect(() => {
    if (type === "edit") {
      setMail(getMail(location.state.token, { id: location.state.id }));
    }
  }, []);

  return (
    <div>
      <Formik
        initialValues={mail}
        onSubmit={async (values) => {
          try {
            const data = convertFormat(values);
            console.log(data);
            console.log(type);
            if (type === "new") {
              const response = await addMail(location.state.token, data);
              console.log(response);
              showSuccess();
              setTimeout(() => {
                navigate("/mail", { state: { token: location.state.token } });
              }, 2000);
            } else {
              console.log(2);
              const response = await updateMail(location.state.token, data);
              console.log(response);
              showSuccess();
              setTimeout(() => {
                navigate("/mail", { state: { token: location.state.token } });
              }, 2000);
            }
          } catch (error) {
            const { message } = error.response.data;
            showError(message);
            console.error();
          }
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting, values }) => (
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px- py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-4">
                  <Form className="space-y-4 md:space-y-6 columns-3">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Fecha de entrega
                      </label>
                      <input
                        type="date"
                        name="toDate"
                        onChange={handleChange}
                        defaultValue={dateFormat(values.toDate)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Alto (cm)
                      </label>
                      <input
                        type="number"
                        name="high"
                        onChange={handleChange}
                        defaultValue={values.package.dimensions.high}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Ancho (cm)
                      </label>
                      <input
                        type="number"
                        name="width"
                        onChange={handleChange}
                        defaultValue={values.package.dimensions.width}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Largo (cm)
                      </label>
                      <input
                        type="number"
                        name="length"
                        onChange={handleChange}
                        defaultValue={values.package.dimensions.length}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Peso (Gramos)
                      </label>
                      <input
                        type="number"
                        name="weigth"
                        onChange={handleChange}
                        defaultValue={values.package.weigth}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="isFragile"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        ¿Es frágil?
                      </label>
                      <select
                        name="fragile"
                        id="isFragile"
                        onChange={handleChange}
                        defaultValue={values.package.fragile ? "Si" : "No"}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value={true}>Si</option>
                        <option value={false}>No</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Nombre del destinatario
                      </label>
                      <input
                        type="text"
                        name="nameToUser"
                        onChange={handleChange}
                        defaultValue={values.toUser.name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        DNI del destinatario
                      </label>
                      <input
                        type="text"
                        name="dniToUser"
                        onChange={handleChange}
                        defaultValue={values.toUser.dni}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Dirección del destinatario
                      </label>
                      <input
                        type="text"
                        name="addressToUser"
                        onChange={handleChange}
                        defaultValue={values.toUser.address}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Ciudad del destinatario
                      </label>
                      <input
                        type="text"
                        name="cityToUser"
                        onChange={handleChange}
                        defaultValue={values.toUser.city}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Nombre del remitente
                      </label>
                      <input
                        type="text"
                        name="nameFromUser"
                        onChange={handleChange}
                        defaultValue={values.fromUser.name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Dirección del remitente
                      </label>
                      <input
                        type="text"
                        name="addressFromUser"
                        onChange={handleChange}
                        defaultValue={values.fromUser.address}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Ciudad del remitente
                      </label>
                      <input
                        type="text"
                        name="cityFromUser"
                        onChange={handleChange}
                        defaultValue={values.fromUser.city}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Estado
                      </label>
                      <input
                        type="text"
                        name="status"
                        value={values.status}
                        readOnly
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out justify-center"
                    >
                      Enviar
                    </button>
                    <ToastContainer />
                  </Form>
                </div>
              </div>
            </div>
          </section>
        )}
      </Formik>
    </div>
  );
}

export default MailForm;
