import React, { useState } from 'react'
import { useNavigate } from "react-router"
import axios from 'axios';
import styles from '../Register/Style.module.css';

function RegisterForm() {
    let [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    let [errorName, setErrorName] = useState('');
    let [errorEmail, setErrorEmail] = useState('');
    let [errorPassword, setErrorPassword] = useState('');
    let [errorConfirmPassword, setErrorConfirmPassword] = useState('');

    let navigate = useNavigate();

    let handleChange = (e) => {
        debugger
        let { name, value } = e.target;
        // setRegister({ ...register, [name]: value });
        setRegister((prevRegister) => ({ ...prevRegister, [name]: value || '' }));
        console.log("Register", register);
        // console.log("prevRegister", prevRegister);
        
    }

    let formValidation = () => {

        let isValid = true;

        if (!register.name) {
            setErrorName("Invalid name");
            isValid = false;
        } else {
            setErrorName('');
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!register.email) {
            setErrorEmail("Invalid email");
            isValid = false;
        } else if (!emailRegex.test(register.email)) {
            setErrorEmail("Please enter valid email");
        }
        else {
            setErrorEmail('');
        }

        if (!register.password) {
            setErrorPassword("Invalid password");
            isValid = false;
        } else if (register.password.length < 4) {
            setErrorPassword('Weak Password (min 4 characters)');
            isValid = false;
        } else {
            setErrorPassword('');
        }

        if (!register.confirmPassword) {
            setErrorConfirmPassword("Invalid confirm password");
            isValid = false;
        } else if (register.password !== register.confirmPassword) {
            alert("Passwords does'nt match");
            isValid = false;
        } else {
            setErrorConfirmPassword('');
        }
        return isValid;

    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        debugger
        // if (!register.name || !register.email || !register.password || !register.confirmPassword) {
        //     alert("Please fill all the data");
        //     return
        // }
        // console.log("register", register);

        try {
            if (formValidation()) {
                const requestData = await axios.post('http://localhost:4747/api/auth/register', register);
                debugger
                if (requestData.status !== 200) {
                    throw new Error("Network error please try again later..")
                }

                const responseData = await requestData.data;
                console.log("responseData", responseData);
                debugger

                window.localStorage.setItem("username", responseData.user);
                window.localStorage.setItem("token", responseData.token);

                let userName = window.localStorage.getItem('username');

                setRegister({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });

                alert(`Congratulations! 🎉 ${userName} You have been successfully registered.`);
                navigate('/dashboard')

            }

        } catch (error) {
            console.error(error)
            alert("There is a problem with request, please again later");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.main}>
                <div className={styles.parent}>
                    <label >Name</label>
                    <input className={errorName ? styles.errorInput : ""} type='text' placeholder={errorName} name='name' value={register.name} onChange={handleChange} />
                </div>
                <div className={styles.parent}>
                    <label>Email</label>
                    <input className={errorEmail ? styles.errorInput : ""} type='email' placeholder={errorEmail} name='email' value={register.email} onChange={handleChange} />
                </div>
                <div className={styles.parent}>
                    <label>Password</label>
                    <input className={errorPassword ? styles.errorInput : ""} type='password' placeholder={errorPassword} name='password' value={register.password} onChange={handleChange} />
                </div>
                <div className={styles.parent}>
                    <label>Confirm Password</label>
                    <input className={errorConfirmPassword ? styles.errorInput : ""} type='password' placeholder={errorConfirmPassword} name='confirmPassword' value={register.confirmPassword} onChange={handleChange} />
                </div>
                <div className={styles.signUpBtnParent}>
                    <button type='submit' className={styles.signUpButton}>Sign up</button>
                </div>
            </form>
        </>
    )
}

export default RegisterForm