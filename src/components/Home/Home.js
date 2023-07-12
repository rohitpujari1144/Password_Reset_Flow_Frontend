import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  let navigate=useNavigate()
  return (
    <div className='position-absolute top-50 start-50 translate-middle'>
      <h2 className='text-primary' style={{fontFamily:'Arial'}}>Welcome to Home !</h2>
      <div className='text-center mt-4'>
        <button className='btn btn-outline-warning' onClick={()=>{navigate('/')}}>Logout</button>
      </div>
    </div>
  )
}

export default Home