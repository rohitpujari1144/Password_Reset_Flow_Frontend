import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ForgotPassword() {
  let navigate = useNavigate()
  const [open, setOpen] = useState(false);

  async function sendEmail(userEmail) {
    let emailInfo = {
      userEmail: userEmail
    }
    await axios.post('https://password-reset-flow-backend-p97p.onrender.com/sendEmail', emailInfo)
      .then((res) => {
        sessionStorage.setItem('userEmail', userEmail)
        setOpen(true)
        setTimeout(() => {
          navigate('/change-password')
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function usernameValidate() {
    const username = document.getElementById('username')
    const usernameError = document.getElementById('usernameError')

    if (username.value === '') {
      usernameError.innerText = '*Required'
    }
    else {
      usernameError.innerText = ''
    }
  }

  function sendPasswordResetLink() {
    const username = document.getElementById('username')
    const usernameError = document.getElementById('usernameError')
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/

    if (username.value === '') {
      usernameError.innerText = '*Required'
    }
    else if (username.value.match(emailPattern)) {
      usernameError.innerText = ''
      axios.get(`https://password-reset-flow-backend-p97p.onrender.com/getUser/${username.value}`)
        .then((response) => {
          if (response.data.message === "user found") {
            sendEmail(username.value)
          }
          else if (response.data.message === "user not found") {
            usernameError.innerText = '*Email Id not exist'
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
    else {
      usernameError.innerText = '*Invalid'
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
        {/* <form ref={form}> */}
        <div className="m-2">
          <label htmlFor="username" className="form-label input">Email Id</label>
          <input type="text" className="form-control input" id="username" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { usernameValidate() }} />
          <span className='text-danger' id='usernameError'></span>
        </div>
        <div>
          {/* <h1 id='message'>verificationRandomString</h1> */}
        </div>
        <div className="mt-3 mb-3 text-center" >
          <button className="btn btn-outline-primary" onClick={() => { sendPasswordResetLink() }}>Send Code</button>
        </div>
        <h6 className="mt-2 text-center text-primary backToLogin " onClick={() => { navigate('/') }}>back to login </h6>
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Please check your email for password reset code" action={action} />
    </>
  )
}

export default ForgotPassword