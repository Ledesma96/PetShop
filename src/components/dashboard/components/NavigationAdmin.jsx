import React from 'react'
import { Link } from 'react-router-dom'

const NavigationAdmin = () => {
  return (
    <div className='navigationPanel'>
        <Link className='navigationPanel_link' to={'/dashboard/products'}>Productos</Link>
        <Link className='navigationPanel_link' to={'/dashboard/messages'}>Mensajes</Link>
        <Link className='navigationPanel_link' to={'/dashboard/orders'}>Pedidos</Link>
    </div>
  )
}

export default NavigationAdmin