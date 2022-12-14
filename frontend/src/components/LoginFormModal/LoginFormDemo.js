import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'
import '../../index.css'
function LoginFormDemo({setShowModal}) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("Demo-lition");
  const [password, setPassword] = useState("password");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
    .then(setShowModal(false))
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-form-container">

    <form onSubmit={handleSubmit} className="login-form">
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>

        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Demo-lition"
          className="login-input"
        />
      </label>
      <label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="password"
          className="login-input"
        />
      </label>
      <button type="submit" className="login-button">Log In</button>
    </form>
    </div>
  );
}

export default LoginFormDemo;
