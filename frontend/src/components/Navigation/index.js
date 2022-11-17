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
  const sessionUser = useSelector(state => state.session.user)
  const user = useSelector(state => state.session.user)
  const [showModal, setShowModal] = useState(false)
  const [login, setLogin] = useState(true)

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (<ProfileButton user={sessionUser} />);
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <NavLink to="/signup">Sign Up</NavLink>
  //     </>
  //   );
  // }
  useEffect(() => {
    console.log("showModalTracker", showModal)
  }, [showModal])
  return (
    <div className='nav-container'>

    <nav className='navBar'>
      {/* sends the user home */}
      <NavLink exact to="/" className="link">
        <img src='https://cdn.usbrandcolors.com/images/logos/airbnb-logo.svg' alt='logo' className='web-logo'></img>KeeganBNB
      </NavLink>

      {/* {//Allows User to create a spot while logged in}} */}
      {user !== null && (
        <NavLink exact to="/spot/new" className="link">Create Spot</NavLink>

      )}
      {/* allows signin/signup modals to be used */}
      {isLoaded && (
        <ProfileButton
          user={sessionUser}
          setLogin={setLogin}
          setShowModal={setShowModal}
        />
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {login ? (<LoginForm setShowModal={setShowModal} />
          ) : (
            <SignupFormPage setShowModal={setShowModal} />)}
        </Modal>
      )}

    </nav>
    </div>

  );
}

export default Navigation
