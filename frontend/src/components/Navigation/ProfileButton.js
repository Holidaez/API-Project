import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'
function ProfileButton({ user, setLogin, setShowModal,setLoginDemo }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div>
      <button onClick={openMenu} className="user-button">

        <i className="fas fa-user-circle"></i>

      </button>
      {showMenu && (user ?
        (<ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout} className="profile-button">Log Out</button>
          </li>
        </ul>) :
        (<ul className="profile-dropdown">
          <li>
            <button onClick={() => {
              setLogin(true)
              setShowModal(true)
            }} className="profile-button">Log In</button>
          </li>
          <li>
            <button onClick={() => {
              setLogin(false)
              setLoginDemo(false)
              setShowModal(true)
            }} className="profile-button">Sign Up</button>
          </li>
          <li>
            <button onClick={() => {
              setLoginDemo(true)
              setShowModal(true)
            }} className="profile-button">Demo Login</button>
          </li>
        </ul>)
      )}
    </div>
  );
}

export default ProfileButton;
