import React, {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import Login from './Login.js';
import Logo from '../assects/logo.svg';
import './Register.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [value , setvalue] = useState({
        username: "",
        email: "",
        password: "",
        conformpassword:"",
    })

    const handelSubmit = (event) => {
        event.preventDefault();
        handelValidation();
    };

    const toastVeriavle = {
        possition:"bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theam: "dark",
    }

    const handelValidation=()=>{
        const {password , conformpassword , username, email} = value;
        if(password !== conformpassword)
        {
            toast.error("password and conform password should be same.",toastVeriavle);

        }
    }

    const handelChange = (event) => {
        setvalue({...value , [event.target.name]:event.target.value})
    };

    return (
        <>
            <div className='form-container'>
                <form onSubmit={(event) => handelSubmit(event)} className='form'>
                    <div className='brand'>
                        <img src={Logo} alt='Logo'></img>
                        <h1>snappy</h1>
                    </div>
                    <input type='text' placeholder='Username' name='username' onChange={(e) => handelChange(e)} />
                    <input type='email' placeholder='Email' name='email' onChange={(e) => handelChange(e)} />
                    <input type='password' placeholder='password' name='password' onChange={(e) => handelChange(e)} />
                    <input type='password' placeholder='Confirm Password' name='confirmpassword' onChange={(e) => handelChange(e)} />

                    <button type='submit'>Create User</button>

                    <span>
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                </form>
                <ToastContainer/>
            </div>
        </>
    );
}


export default Register;
