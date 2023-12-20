import React, { useContext, useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'

const CartIcon = () => {
    const [user, setUser, add, setAdd] = useContext(UserContext);
    const [quantity, setQuantity] = useState(0)
    const cartId = user?.cart
    useEffect(() =>{
        async function fecthingCountCart () {
            const response = await fetch(`http://localhost:8080/api/carts/${cartId}`)
      
            try {
                if(response.ok){
                    const data = await response.json()
                    
                    setQuantity(data.cart.products.length)
                } else {
                    console.log("No se obtuvieron datos del carrito");
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fecthingCountCart()
    } , [add])
  return (
    <Link to={`/cart`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"  viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        <span>{quantity}</span>
    </Link>
  )
}

export default CartIcon