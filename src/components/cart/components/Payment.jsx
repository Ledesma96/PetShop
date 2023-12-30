import React, { useContext } from 'react'
import { UserContext } from '../../../context/UserContext.jsx'
import axios from 'axios'

const Payment = () => {
    const [user] = useContext(UserContext)

    const handlePayment = async() => {
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + `api/stripe/payment/${user.cart}`)
            const url = await response.data.url
            window.location.href = url
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <button className='cart_btn' onClick={handlePayment}>Terminar compra</button>
  )
}

export default Payment