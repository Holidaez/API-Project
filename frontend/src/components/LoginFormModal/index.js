// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import LoginFormDemo from './LoginFormDemo.js'
import '../../index.css'
function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
      <button onClick={() => setShowModal(true)}>Demo User</button>
      {showModal && (
        <Modal onclose={() => setShowModal(false)}>
          <LoginFormDemo />
        </Modal>
      )}

    </>
  );
}

export default LoginFormModal;
