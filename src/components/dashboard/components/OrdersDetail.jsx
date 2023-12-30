import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const OrdersDetail = () => {
    const{id} = useParams()
    const [order, setOrder] = useState({})

    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `api/orders/${id}`)
            try {
                if(response.data.success){
                    setOrder(response.data.order)
                    console.log(order.products);
                } else {
                    console.log('no order found');
                }
            } catch (error) {
                console.log(error.message);
            }
        } 
        fetchData()
    }, [])
    
  return (
    <div className='order'>
      <main className='order__main ticket'>
        <div className='order__main__info'>
          <div className='contenedor__datos'>
            <h4 className='h4 order__main__info__p'>NOMBRE: </h4>
            <p className='order__main__info__p'>{order.buyer}</p>
          </div>
        </div>
        <div className='order__main__hour'>
          <div>
            <h4 className='order__main__info__p h4'>ID COMPRA:</h4>
            <p className='order__main__info__p'>{order._id}</p>
          </div>
          <div>
            <h4 className='order__main__info__p h4'>HORA</h4>
            <p className='order__main__info__p'>{order.purchase_dateTime}</p>
            </div>
        </div>
        <h3 className='productos'>PRODUCTOS</h3>
        <div className='order__main__pedido'>
          <p className='order__main__pedido__data'>Nombre</p>
          <p className='order__main__pedido__data'>Cantidad</p>
          <p className='order__main__pedido__data'>Precio u.</p>
        </div>
        {order?.products && order.products.map((prod) => (
          <div className='order__main__item' key={prod._id}>
            <p className='order__main__item__p nameProduct'>{prod.pid.name}</p>
            <p className='order__main__item__p count'>{prod.quantity}</p>
            <p className='order__main__item__p price'>${prod.pid.price}</p>
          </div>
        ))}
        <div className='order__main__total'>
          <h4 className='total'>TOTAL:</h4>
          <p className='order__main__item__p'>${order.amount}</p>
        </div>
      </main>
  </div>
  )
}

export default OrdersDetail