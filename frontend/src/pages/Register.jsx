import React from 'react'
import '../styles/authentication/stylelogin.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RegisterForm from '../components/RegisterForm'

const Register = () => {
  return (
    <div>
      <Navbar/>
      <RegisterForm/>
      <Footer/>
    </div>
  )
}

export default Register