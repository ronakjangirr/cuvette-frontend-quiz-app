import React, { useState } from 'react';
import RegisterForm from '../Register/RegisterForm';
import LoginForm from '../Login/LoginForm';
import styles from './Style.module.css'

const AuthPanel = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(true);

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  const handleLoginClick = () => {
    setShowRegisterForm(false);
  };

  return (
    <>
     <div className={styles.fullScreenDiv}>
      <div className={styles.card}>
        <div className={styles.parent}>
          <div>
            <h1 className={styles.header}>QUIZZIE</h1>
          </div>
          <div className={styles.flex}>
            <button className={styles.buttons} onClick={handleRegisterClick}>Sign Up</button>
            <button className={styles.buttons} onClick={handleLoginClick}>Log In</button>
          </div>
          <div className={styles.form}>
            {showRegisterForm ? <RegisterForm /> : <LoginForm />}          
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default AuthPanel;
