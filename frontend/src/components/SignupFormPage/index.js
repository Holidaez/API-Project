import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import '../../index.css'
function SignupFormPage({setShowModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName,lastName }))
        .then(()=>{
          setShowModal(false)
          setErrors([])
        })
        .catch(async (response) => {
          // console.log(response)
          const err = await response.json()
          console.log(err)
          setErrors(err.errors)
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-form-container">
    <form onSubmit={handleSubmit} className="signup-form">
      <h1 className="sign-up-header">Sign Up</h1>
      <ul className="errors">
        {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="signup-input"
        />
      </label>
      <label>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
          className="signup-input"
        />
      </label>
      <label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          className="signup-input"
        />
      </label>
      <label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm Password"
          className="signup-input"
        />
      </label>
      <label>

        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstname(e.target.value)}
          required
          placeholder="First Name"
          className="signup-input"
        />
      </label>
      <label>

        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastname(e.target.value)}
          required
          placeholder="Last Name"
          className="signup-input"
        />
      </label>
      <button type="submit" className="signup-submit">Sign Up</button>
    </form>
    </div>
  );
}

export default SignupFormPage;
