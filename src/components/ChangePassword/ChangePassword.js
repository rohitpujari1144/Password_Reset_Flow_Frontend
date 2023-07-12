import axios from 'axios'
import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function ChangePassword() {
    let count = 0
    let navigate = useNavigate()
    let [open, setOpen] = useState(false);

    const verificationString = sessionStorage.getItem('verificationString')
    const userEmail = sessionStorage.getItem('userEmail')

    function passwordValidate() {
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        if (password.value === "") {
            passwordError.innerText = "*Required"
        }
        else {
            passwordError.innerText = ""
        }
    }

    function passwordResetCodeValidate() {
        const passwordResetCode = document.getElementById('passwordResetCode')
        const passwordResetCodeError = document.getElementById('passwordResetCodeError')
        if (passwordResetCode.value === "") {
            passwordResetCodeError.innerText = "*Required"
        }
        else {
            passwordResetCodeError.innerText = ""
        }
    }

    function confirmPasswordValidate() {
        const confirmPassword = document.getElementById('confirmPassword')
        const confirmPasswordError = document.getElementById('confirmPasswordError')
        if (confirmPassword.value === "") {
            confirmPasswordError.innerText = "*Required"
        }
        else {
            confirmPasswordError.innerText = ''
        }
    }

    function changePasswordClick() {
        const passwordResetCode = document.getElementById('passwordResetCode')
        const passwordResetCodeError = document.getElementById('passwordResetCodeError')
        const password = document.getElementById('password')
        const confirmPassword = document.getElementById('confirmPassword')
        const passwordError = document.getElementById('passwordError')
        const confirmPasswordError = document.getElementById('confirmPasswordError')

        if (password.value === "") {
            passwordError.innerText = "*Required"
        }
        else {
            if (password.value.length < 6) {
                passwordError.innerText = "*Password length should be greater than five"
            }
            else {
                passwordError.innerText = ""
            }
        }
        if (confirmPassword.value === "") {
            confirmPasswordError.innerText = "*Required"
        }
        else {
            if (confirmPassword.value !== password.value) {
                confirmPasswordError.innerText = '*Password and confirm password should be same'
            }
            else {
                confirmPasswordError.innerText = ''
            }
        }
        if (passwordResetCode.value === "") {
            passwordResetCodeError.innerText = "*Required"
        }
        else {
            passwordResetCodeError.innerText = ''
        }
        if (passwordError.innerText === "" && confirmPasswordError.innerText === '' && passwordResetCodeError.innerText === '') {
            if (passwordResetCode.value === verificationString) {
                let newPassword = {
                    password: password.value,
                    randomString: ''
                }
                axios.put(`https://password-reset-flow-backend-p97p.onrender.com/storeRandomString/${userEmail}`, newPassword)
                    .then((response) => {
                        setOpen(true)
                        setTimeout(() => {
                            navigate('/')
                        }, 3000);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
            else {
                passwordResetCodeError.innerText = "*Invalid"
            }
        }
    }

    function showPasswordClick() { 
        const password = document.getElementById('password')
        const confirmPassword = document.getElementById('confirmPassword')
        count++
        if (count % 2 === 0) {
            password.setAttribute('type', 'password')
            confirmPassword.setAttribute('type', 'confirmPassword')
        }
        else {
            password.removeAttribute('type')
            confirmPassword.removeAttribute('type')
        }
    }

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
    return (
        <>
            <div className="container col-3 shadow rounded position-absolute top-50 start-50 translate-middle" >
                <div className="m-2">
                    <label htmlFor="passwordResetCode" className="form-label input">Password Reset Code</label>
                    <input type="text" className="form-control input" id="passwordResetCode" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { passwordResetCodeValidate() }} />
                    <span className='text-danger' id='passwordResetCodeError'></span>
                </div>
                <div className="m-2">
                    <label htmlFor="password" className="form-label input">New Password</label>
                    <input type="password" className="form-control input" id="password" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { passwordValidate() }} />
                    <span className='text-danger' id='passwordError'></span>
                </div>
                <div className="m-2">
                    <label htmlFor="confirmPassword" className="form-label input">Confirm Password</label>
                    <input type="password" className="form-control input" id="confirmPassword" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { confirmPasswordValidate() }} />
                    <span className='text-danger' id='confirmPasswordError'></span>
                </div>
                <div className="m-2">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Show password" onClick={() => { showPasswordClick() }} />
                    </FormGroup>
                </div>
                <div className="mt-3 mb-3 text-center" >
                    <button className="btn btn-outline-primary" onClick={() => { changePasswordClick() }}>Change Password</button>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Password successfully changed !" action={action} />
        </>
    )
}

export default ChangePassword