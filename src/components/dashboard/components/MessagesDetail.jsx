import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const MessagesDetail = () => {
    const {id} = useParams()
    const [message, setMessage] = useState("")

    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `api/messages/${id}`)
            try {
                if(response.data.success){
                    setMessage(response.data.message)
                } else {
                    console.log('Error getting message')
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData()
    },[])

    const formattedDate = message.date
    ? new Intl.DateTimeFormat('es-AR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/Argentina/Buenos_Aires',
      }).format(new Date(message.date))
    : 'Fecha no disponible';
  
  return (
    <>  
        <div className='date'>
            <p className='date_p'>{formattedDate}hs.</p>
        </div>
        <div className='data'>
            <h5 className='data_h5'>NOMBRE: </h5>
            <h6 className='data_h6'>{message.name}</h6>
        </div>
        <div className='data'>
            <h5 className='data_h5'>TELEFONO: </h5>
            <h6 className='data_h6'>{message.telephone}</h6>
        </div>
        <div className='data'>
            <h5 className='data_h5'>EMAIL: </h5>
            <h6 className='data_h6'>{message.email}</h6>
        </div>
        <div className='message'>
            <h5 className='message_h5'>MENSAJE: </h5>
            <h6 className='message_h6'>{message.message}</h6>
        </div>
        
    </>
  )
}

export default MessagesDetail