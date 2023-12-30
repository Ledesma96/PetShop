import axios from 'axios'
import React, { useState } from 'react'

const Contact = () => {
    const [name, setname] = useState("")
    const [telephone, setTelephone] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const onSubmmit = async() => {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const localDate = new Date(now.getTime() - offset * 60 * 1000 + 3 * 60 * 60 * 1000)
        const data = {
            name,
            telephone,
            email,
            message,
            date: localDate
        }
        console.log(data);

        const response = await axios.post(import.meta.env.VITE_BACKEND_URL + 'api/messages/send-message', data)
        try {
            if(response.data.success){
                console.log('entra',response.data.message)
                setEmail("")
                setMessage("")
                setTelephone("")
                setname("")
            } else {
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
  return (
    <div className='contact_container'>
        <h1 className='contact_container_h1'>¡CONTACTANÓS!</h1>
        <p className='contact_container_p'>Hacenos tu consulta aquí.</p>
        <form className='contact_container_form' action="">
            <input value={name} onChange={(e) => setname(e.target.value)} placeholder='Nombre...' className='contact_container_form_input' type="text" />
            <input value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder='Tel...' className='contact_container_form_input' type="number" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email...' className='contact_container_form_input' type="text" />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Mensaje...' className='contact_container_form_input'/>
            <input onClick={() => onSubmmit()} className='contact_container_form_btn' type="button" value='ENVIAR'/>
        </form>
    </div>
  )
}

export default Contact