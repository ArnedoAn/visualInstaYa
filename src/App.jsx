import { Route, Routes } from "react-router-dom";
import NotFoundPages from "./pages/NotFoundPages";
import MailHome from "./pages/MailHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MailForm from "./components/MailForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFoundPages />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/mail" element={<MailHome />} />
        <Route path="/mail/new" element={<MailForm />} />
      </Routes>
    </>
  );
}

export default App;
