import { useState, useEffect } from "react";

function RegisterForm(props) {
  let [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(e.target.t.value);
    console.log(name);
    alert(`Hello ${e.target.t.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="t" />
      <button>Register</button>
    </form>
  );
}

export default RegisterForm;
