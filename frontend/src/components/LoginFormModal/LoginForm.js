import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import './LoginForm.css'
import '../../index.css'
function LoginForm({setShowModal}) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([])
  // const error = useSelector(state => state.session?.error?.errors)
  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential, password }))
    .then(()=>{
      setShowModal(false)
      setErrors([])
    })
    .catch( async (response) => {
      // console.log(response)
      const err = await response.json()
      // console.log(err)
      setErrors(err.errors)
    })
  };

  return (
    <div className="login-form-container">

    <form onSubmit={handleSubmit} className="login-form">
      
      <h1 className="login-header">Log In</h1>
      <ul className="errors">
        {errors?.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Username or Email"
          className="login-input"
        />
      </label>
      <label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="login-input"
        />
      </label>
      <button type="submit" className="login-button">Log In</button>
    </form>
    </div>
  );
}

export default LoginForm;
