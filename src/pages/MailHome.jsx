import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MailCard from "../components/MailCard";
import { getMails } from "../api/mail.api";
import { useNavigate } from "react-router-dom";

function MailHome() {
  const location = useLocation();
  const [mails, setMails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //getMails();
  }, []);

  async function getMailsInit() {
    const response = await getMails(location.state.token);
    setMails(response.data);
  }

  function renderMails() {
    if (mails.length > 0) {
      return <MailCard mail={mails} />;
    } else {
      return <h2 className="mb-7 text-gray-50">❌ No hay paquetes</h2>;
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="text-2xl font-normal leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center mb-10">
          Gestión de paquetes
        </h1>
        {renderMails()}
        <div className="flex items-center justify-center">
          <button
            className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out justify-center"
            onClick={() => {
              navigate("/mail/new", { state: { token: location.state.token, type:"new" } });
            }}
          >
            Enviar nuevo paquete
          </button>
        </div>
      </div>
    </section>
  );
}

export default MailHome;
