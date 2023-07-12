import React, { useState } from 'react'
import './/login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Login() {
    let count = 0
    let navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    function usernameValidate() {
        const username = document.getElementById('username')
        const usernameError = document.getElementById('usernameError')

        if (username.value === '') {
            username.style = 'border-color:red'
            usernameError.innerText = '*Required'
        }
        else {
            username.removeAttribute('style')
            usernameError.innerText = ''
        }
    }

    function passwordValidate() {
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')

        if (password.value === '') {
            password.style = 'border-color:red'
            passwordError.innerText = '*Required'
        }
        else {
            password.removeAttribute('style')
            passwordError.innerText = ''
        }
    }

    function loginButtonClick() {
        const username = document.getElementById('username')
        const password = document.getElementById('password')
        const usernameError = document.getElementById('usernameError')
        const passwordError = document.getElementById('passwordError')

        if (username.value === '') {
            username.style = 'border-color:red'
            usernameError.innerText = '*Required'
        }
        else {
            username.removeAttribute('style')
            usernameError.innerText = ''
        }
        if (password.value === '') {
            password.style = 'border-color:red'
            passwordError.innerText = '*Required'
        }
        else {
            password.removeAttribute('style')
            passwordError.innerText = ''
        }
        if (usernameError.innerText === '' && passwordError.innerText === '') {
            axios.get(`https://password-reset-flow-backend-p97p.onrender.com/login/${username.value}/${password.value}`)
                .then((response) => {
                    if (response.data.message === "Login successful") {
                        setPopupMessage("Login Successful")
                        setOpen(true)
                        setTimeout(() => {
                            navigate('/home')
                        }, 2000)
                    }
                    else if (response.data.message === "Invalid Credentials") {
                        setPopupMessage("Invalid Login Credentials")
                        setOpen(true)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function showPasswordClick() {
        const password = document.getElementById('password')
        count++
        if (count % 2 === 0) {
            password.setAttribute('type', 'password')
        }
        else {
            password.removeAttribute('type')
        }
    }
    return (
        <>
            <div className="container mt-4 col-3 shadow rounded position-absolute top-50 start-50 translate-middle" >
                <div className="col">
                    <h3 className="m-2 text-center text-primary">Login</h3>
                    <div className="m-2">
                        <label htmlFor="username" className="form-label input">Email Id</label>
                        <input type="text" className="form-control input" id="username" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { usernameValidate() }} />
                        <span className='text-danger' id='usernameError'></span>
                    </div>
                    <div className="m-2">
                        <label htmlFor="password" className="form-label input">Password</label>
                        <input type="password" className="form-control input" id="password" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { passwordValidate() }} />
                        <span className='text-danger' id='passwordError'></span>
                    </div>
                    <div className="m-2">
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Show password" onClick={() => { showPasswordClick() }} />
                        </FormGroup>
                    </div>
                    <div className="mt-3 loginButton text-center" >
                        <button className="btn btn-outline-primary" onClick={() => { loginButtonClick() }}>Login</button>
                    </div>
                    <h6 className="mt-2 text-center clickHere">new user <span style={{ color: 'blue' }} onClick={() => { navigate('/signup') }}>create account</span> </h6>
                    <h6 className="mb-3 text-center clickHere">forgot password <span style={{ color: 'blue' }} onClick={() => { navigate('/forgot-password') }}>click here</span> </h6>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={popupMessage} action={action} />
        </>
    )
}

export default Login