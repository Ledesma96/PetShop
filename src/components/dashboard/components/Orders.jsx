import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `api/orders`)
      try {
        if(response.data.success){
          setOrders(response.data.orders)
        } else {
          console.log('No orders found');
        }
      } catch (error) {
        console.log(error.order)
      }
    }
    fetchData()
  }, [])
  return (
    <table className='table_orders'>
      <thead className='table_orders_thead'>
        <tr className='table_orders_thead_tr'>
          <th className='table_orders_thead_tr_th'>NOMBRE</th>
          <th className='table_orders_thead_tr_th'>EMAIL</th>
          <th className='table_orders_thead_tr_th'>FECHA</th>
        </tr>
      </thead>
      <tbody className='table_orders_tbody'>
      {orders.map((order) => {
          const formattedDate = new Intl.DateTimeFormat('es-AR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timeZone: 'America/Argentina/Buenos_Aires',
          }).format(new Date(order.purchase_dateTime));
          return (
              <tr key={order._id} className='table_orders_tbody_tr'>
                <td className='table_orders_tbody_tr_td'>{order.buyer}</td>
                <td className='table_orders_tbody_tr_td'>{order.email}</td>
                <td className='table_orders_tbody_tr_td'>
                  <Link className='table_orders_tbody_link' to={`/dashboard/orders/details/${order._id}`}>{formattedDate}
                  </Link>
                </td>
              </tr>
            
          );
        })}
      </tbody>
    </table>
  )
}

export default Orders