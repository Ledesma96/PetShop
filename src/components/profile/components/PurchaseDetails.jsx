import axios from 'axios'
import React, { useEffect, useState  } from 'react'
import { useParams} from 'react-router-dom'

export const PurchaseDetails = () => {
    const {id} = useParams()
    const [purchase, setPurchase] = useState([])

    const fetchData = async() => {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `api/orders/${id}`)
        try {
            if(response.data.success) {
                setPurchase(response.data.order.products)
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchData()
    },[])
  return (
    <>
        {purchase.map((item) =>
        <div key={item._id} className='detail-card'>
            <img className='detail-card_img' src={item.pid.image} alt={'imagen de' + item.pid.name} />
            <p className='detail-card_p'>{item.pid.name}</p>
            <p className='detail-card_p'>x{item.quantity}</p>
            <p className='detail-card_p'>${item.pid.price}</p>
        </div>
        )}
    </>
  )
}
