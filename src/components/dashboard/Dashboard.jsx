import React from 'react'
import NavigationAdmin from './components/NavigationAdmin.jsx'
import Products from './components/Products.jsx'
import Orders from './components/Orders.jsx'
import Messages from './components/Messages.jsx'
import { Route, Routes  } from 'react-router-dom'
import MessagesDetail from './components/MessagesDetail.jsx'
import OrdersDetail from './components/OrdersDetail.jsx'


const Dashboard = () => {
  return (
    <>
      <NavigationAdmin/>
      <Routes>
          <Route  path="/" element={<Products></Products>} />
          <Route  path="/Products" element={<Products></Products>} />
          <Route  path="/orders" element={<Orders></Orders>} />
          <Route  path="/messages" element={<Messages></Messages>} />
          <Route  path="/messages/details/:id" element={<MessagesDetail></MessagesDetail>} />
          <Route  path="/orders/details/:id" element={<OrdersDetail></OrdersDetail>} />
        <Route/>
      </Routes>
    </>
  )
}

export default Dashboard