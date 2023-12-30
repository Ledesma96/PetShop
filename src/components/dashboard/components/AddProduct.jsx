import React from 'react'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client';


const socket = io(import.meta.env.VITE_BACKEND_URL)

const AddProduct = ({setModal, modal, setProducts}) => {
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState()
    const [stock, setStock] = useState()
    const [image, setImage] = useState("")
    const [category, setCategory] = useState("")
    const [tipo, setTipo] = useState("")

    useEffect(() => {
        socket.on('addProducts', data => {
            setProducts(data)
        })
    },[])
    const onSubmmit = () => {
        const prod = {
            name,
            description,
            price,
            stock,
            image,
            category,
            tipo,
            code
        }
        socket.emit('recivedProduct', prod)
        setModal(!modal)
    }

  return (
    <div className='modal-overlay'>
        <div className='moodal'>
            <form className='modal_form' action="">
                <input className='input' onChange={(e) => setName(e.target.value)} type="text" placeholder='Nombre' />
                <input className='input' onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Descripcion'/>
                <input className='input' onChange={(e) => setPrice(e.target.value)} type="number" placeholder='Precio'/>
                <input className='input' onChange={(e) => setStock(e.target.value)} type="number" placeholder='Stock'/>
                <input className='input' onChange={(e) => setImage(e.target.value)} type="text" placeholder='URL image' />
                <input className='input' onChange={(e) => setCategory(e.target.value)} type="text" placeholder='Categoria'/>
                <input className='input' onChange={(e) => setTipo(e.target.value)} type="text" placeholder='Tipo'/>
                <input className='input' onChange={(e) => setCode(e.target.value)} type="text" placeholder='Code'/>
                <input className='btn' onClick={() => onSubmmit()} type="button" value='CARGAR'/>
            </form>
            <button onClick={() => setModal(!modal)} className='close'>CERRAR</button>
        </div>
    </div>
  )
}

export default AddProduct