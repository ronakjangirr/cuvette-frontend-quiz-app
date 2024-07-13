import React, { useState } from 'react'
import { useNavigate } from "react-router"
import axios from 'axios';
import styles from '../Login/Style.module.css';

function LoginForm() {
    const [login, setLogin] = useState({
        email: "",
        password: "",
    })

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        let { name, value } = e.target
        setLogin({ ...login, [name]: value })
    }

    const formValidation = () => {
        // debugger
        let isValid = true;

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!login.email) {
            setErrorEmail("Invalid email");
            isValid = false;
        } else if (!emailRegex.test(login.email)) {
            setErrorEmail("Please enter valid email");
            isValid = false;
        }
        else {
            setErrorEmail('');
        }

        if (!login.password) {
            setErrorPassword("Invalid password");
            isValid = false;
        } else {
            setErrorPassword('');
        }

        return isValid;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        debugger
        if (login.email && login.password) {
            try {
                if (formValidation()) {
                    const requestData = await axios.post('http://localhost:4747/api/auth/login', login);
                    debugger
                    if (requestData.status !== 200) {
                        throw new Error("Network error please try again later..")
                    }
                    debugger
                    const responseData = await requestData.data;
                    console.log("responseData", responseData);
                    debugger
                    
                    window.localStorage.setItem("username", responseData.name);
                    window.localStorage.setItem("token", responseData.token);

                    navigate('/dashboard');

                    // Clear the input fields
                    setLogin({
                        email: "",
                        password: "",
                    })

                    alert(`Hi, ${responseData.name} Welcome aboard!`)
                }
            } catch (error) {
                alert("There is a problem with request, please try again later");
                console.log(error);
            }
        } else {
            alert("Please fill in both fields")
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.main}>
                <div className={styles.parent}>
                    <label>Email</label>
                    <input className={errorEmail ? styles.errorInput : ""} type='email' placeholder={errorEmail} name='email' value={login.email} onChange={handleChange} />
                </div>
                <div className={styles.parent}>
                    <label>Password</label>
                    <input className={errorPassword ? styles.errorInput : ""} type='password' placeholder={errorPassword} name='password' value={login.password} onChange={handleChange} />
                </div>
                <div className={styles.signInBtnParent}>
                    <button type='submit' className={styles.signInButton}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm