import './/signup.css'
import React, { useState } from 'react'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Signup() {
    let count = 0
    let navigate = useNavigate()
    const [open, setOpen] = useState(false);

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

    function nameValidate() {
        const name = document.getElementById('name')
        const nameError = document.getElementById('nameError')
        if (name.value === '') {
            nameError.innerText = '*Required'
        }
        else if (!isNaN(name.value)) {
            nameError.innerText = '*Invalid'
        }
        else {
            nameError.innerText = ''
        }
    }

    function emailValidate() {
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
        if (email.value === '') {
            emailError.innerText = '*Required'
        }
        else if (email.value.match(emailPattern)) {
            emailError.innerText = ''
        }
        else {
            emailError.innerText = '*Invalid'
        }
    }

    function passwordValidate() {
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        if (password.value === '') {
            passwordError.innerText = '*Required'
        }
        else if (!isNaN(password.value)) {
            passwordError.innerText = '*Invalid'
        }
        else if (password.value.length < 6) {
            passwordError.innerText = '*Password should be greater than 5 characters'
        }
        else {
            passwordError.innerText = ''
        }
    }

    function confirmPasswordValidate() {
        const password = document.getElementById('password')
        const confirmPassword = document.getElementById('confirmPassword')
        const confirmPasswordError = document.getElementById('confirmPasswordError')
        if (confirmPassword.value === '') {
            confirmPasswordError.innerText = '*Required'
        }
        else if (confirmPassword.value !== password.value) {
            confirmPasswordError.innerText = '*Password and confirm password should be same'
        }
        else {
            confirmPasswordError.innerText = ''
        }
    }

    function registerButtonClick() {
        const name = document.getElementById('name')
        const email = document.getElementById('email')
        const password = document.getElementById('password')
        const confirmPassword = document.getElementById('confirmPassword')
        const nameError = document.getElementById('nameError')
        const emailError = document.getElementById('emailError')
        const passwordError = document.getElementById('passwordError')
        const confirmPasswordError = document.getElementById('confirmPasswordError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/

        if (name.value === '') {
            nameError.innerText = '*Required'
        }
        else {
            if (!isNaN(name.value)) {
                nameError.innerText = '*Invalid'
            }
            else {
                nameError.innerText = ''
            }
        }
        if (email.value === '') {
            emailError.innerText = '*Required'
        }
        else {
            if (email.value.match(emailPattern)) {
                emailError.innerText = ''
            }
            else {
                emailError.innerText = '*Invalid'
            }
        }
        if (password.value === '') {
            passwordError.innerText = '*Required'
        }
        else {
            if (!isNaN(password.value)) {
                passwordError.innerText = '*Invalid'
            }
            else if (password.value.length < 6) {
                passwordError.innerText = '*Password should be greater than 5 characters'
            }
            else {
                passwordError.innerText = ''
            }
        }
        if (confirmPassword.value === '') {
            confirmPasswordError.innerText = '*Required'
        }
        else {
            if (confirmPassword.value !== password.value) {
                confirmPasswordError.innerText = '*Password and confirm password should be same'
            }
            else {
                confirmPasswordError.innerText = ''
            }
        }
        if (nameError.innerText === "" && emailError.innerText === "" && passwordError.innerText === "" && confirmPasswordError.innerText === "") {
            const userSignupData = {
                name: name.value,
                email: email.value,
                password: password.value
            }
            axios.post(`https://password-reset-flow-backend-p97p.onrender.com/signup`, userSignupData)
                .then((response) => {
                    if (response.status === 200) {
                        emailError.innerText = "*Email Id already exist"
                    }
                    else {
                        setOpen(true)
                        setTimeout(() => {
                            navigate('/')
                        }, 2000)
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function showPasswordClick() {
        const password = document.getElementById('password')
        const confirmPassword=document.getElementById('confirmPassword')
        count++
        if (count % 2 === 0) {
            password.setAttribute('type', 'password')
            confirmPassword.setAttribute('type', 'password')
        }
        else {
            password.removeAttribute('type')
            confirmPassword.removeAttribute('type')
        }
    }
    return (
        <>
            <div className='container mt-4 p-3 col-3 shadow rounded-3 position-absolute top-50 start-50 translate-middle'>
                <h3 className="text-center mt-2 text-primary">Sign Up</h3>
                <div className=" ">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { nameValidate() }} />
                    <span className='text-danger' id='nameError'></span>
                </div>
                <div className=" mt-2">
                    <label htmlFor="email" className="form-label">Email Id</label>
                    <input type="text" className="form-control" id="email" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { emailValidate() }} />
                    <span className='text-danger' id='emailError'></span>
                </div>
                <div className=" mt-2">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { passwordValidate() }} />
                    <span className='text-danger' id='passwordError'></span>
                </div>
                <div className=" mt-2">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { confirmPasswordValidate() }} />
                    <span className='text-danger' id='confirmPasswordError'></span>
                </div>
                <div className="mt-2">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Show password" onClick={() => { showPasswordClick() }} />
                    </FormGroup>
                </div>
                <div className=" mt-3 text-center">
                    <button type="button" className="btn btn-outline-primary" onClick={() => { registerButtonClick() }}>Register</button>
                </div>
                <h6 className="mt-2 text-center text-primary backToLogin " onClick={() => { navigate('/') }}>back to login </h6>
            </div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} message="Signup Successful" action={action} />
        </>
    )
}

export default Signup