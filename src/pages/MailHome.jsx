import React from "react";
import { useLocation } from "react-router-dom";

function MailHome() {
  const location = useLocation();
  console.log(location.state.token);
  return <div>MailHome</div>;
}

export default MailHome;
