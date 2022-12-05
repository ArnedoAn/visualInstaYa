import { useContext, useState } from "react";
import { MailContext } from "./MailContext";
import { getMails, getMail, addMail, updateMail } from "../api/mail.api";

export const useMails = () => {
  const context = useContext(MailContext);
  if (context === undefined) {
    throw new Error("useMails must be used within a MailProvider");
  }
  return context;
};

export const MailContextProvider = ({ children }) => {
  const [mails, setMails] = useState([]);
  const [mail, setMail] = useState({});
  const [token, setToken] = useState("");
  const [name, setName] = useState("");

  const loadMails = async () => {
    try {
      const response = await getMails(token, name);
      setMails(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getMailContext = async (id) => {
    try {
      const response = await getMail(id);
      setMail(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addMailContext = async (mail) => {
    try {
      const response = await addMail(mail);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMailContext = async (mail) => {
    try {
      const response = await updateMail(mail);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MailContext.Provider
      value={{
        mails,
        mail,
        loadMails,
        getMailContext,
        addMailContext,
        updateMailContext,
        setToken,
        setName,
      }}
    >
      {children}
    </MailContext.Provider>
  );
};
