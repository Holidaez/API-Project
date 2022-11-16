import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import LoginForm from '../LoginFormModal/LoginForm';
import SignupFormPage from '../SignupFormPage'
import { Modal } from '../../context/Modal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const user = useSelector(state => state.user)
  const [showModal, setShowModal] = useState(false)
  const [login, setLogin] = useState(true)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (<ProfileButton user={sessionUser} />);
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }
useEffect(()=>{
  console.log("showModalTracker" , showModal)
},[showModal])
  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
        {isLoaded && (
          <ProfileButton
            user={sessionUser}
            setLogin={setLogin}
            setShowModal={setShowModal}
          />
        )}
      </li>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {login ? (<LoginForm setShowModal={setShowModal}/>
          ) : (
          <SignupFormPage setShowModal={setShowModal}/>)}
        </Modal>

      )}
      {user !== null && (
        <li><NavLink exact to="/spot/new">Create Spot</NavLink></li>

      )}
    </ul>
  );
}

export default Navigation;
