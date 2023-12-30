import axios from 'axios';
import React, { useContext } from 'react'
import { useState } from 'react';
import { UserContext } from '../../../context/UserContext.jsx';

const Count = ({stock, id, setNotification}) => {
    const [user] = useContext(UserContext)
    const [counter, setCounter] = useState (1);

    const suma = () => {
        if(counter == stock){
            return setCounter(stock)
        }
        setCounter(counter + 1)
    }

    const resta = () => {
        if(counter > 0){
            setCounter(counter - 1)
        } else {
            return setCounter(0)
        }
    }
 
        const AddProduct = async() => {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + `api/carts/${user.cart}/products/${id}`, {quantity: counter})
            if(response.data.success){
                console.log(response.data.message);
                setNotification(true)
                 setTimeout(() => {
                     setNotification(false)
                }, 1700)
            } else {
                console.log(response.data.message);
            }
        }


  return (
    <div className='count'>
        <div className='count__div'>
            <button className='count__div__btn' onClick={resta}>-</button>
                <p className='count__div__p'>{counter}</p>
            <button className='count__div__btn' onClick={suma}>+</button>
        </div>
        <button disabled={stock == 0 && true} className='count__btn' onClick={() => AddProduct()}>Agregar al carrito</button>
    </div>
  )
}

export default Count