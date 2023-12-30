import axios from 'axios'
import React, { useState } from 'react'
import Notification from '../../Notification.jsx'

const FormComments = ({setModal}) => {
    const [name, setName] = useState("")
    const [profession, setProfession] = useState("")
    const [comment, setComment] = useState("")

    const handleComment = async() => {
        const data = {
            name,
            profession,
            comment
        }
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL + 'api/comments', data)
        try {
            if(response.data.success){
                setModal(false)
                return(
                    <Notification>
                        <p>{response.data.message}</p>
                    </Notification>
                )
            } else{
                <Notification>
                    <p>{response.data.message}</p>
                </Notification>
            }
        } catch (error) {
            console.log(error.message);
        }
    }
  return (
    <div className='moldalComment'>
        <div className='modalComment_cancel' onClick={() => setModal(false)}>
            <svg  color='white' xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
        </div>
        <form className='modalComment_form'>
            <input onChange={e => setName(e.target.value)} className='modalcomment_form_input' type="text" placeholder='Nombre...' />
            <input onChange={e => setProfession(e.target.value)}  className='modalcomment_form_input' type="text" placeholder='Profesion...'/>
            <textarea onChange={e => setComment(e.target.value)}  className='modalcomment_form_input' type="text" placeholder='Tu comentario...'/>
            <input className='modalComment_form_btn' type="button" value='Enviar' onClick={() => handleComment()}/>
        </form>
    </div>
  )
}

export default FormComments