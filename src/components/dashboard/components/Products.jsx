import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import AddProduct from './AddProduct.jsx';

const socket = io(import.meta.env.VITE_BACKEND_URL)
const Products = () => {
    const [products, setProducts] = useState([])
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + 'api/products/all-products')
            try {
                if(response.data.success){
                    setProducts(response.data.products)
                    console.log(response);
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        socket.on('product', data => {
            setProducts(data)
        })
    },[])

    const searchProduct = (e) => {
        const inputText = e.target.value;
        if(inputText.length == 0 ){
            socket.emit('word', "")
        } else {
            socket.emit('word', inputText)
        }
    }


  return (
    <>
        <div className='container_input'>
            <input className='input' placeholder='Buscar' type="text"  onChange={searchProduct}/>
        </div>
        <table className='table'>
            <thead className='table_thead'>
                <tr className='table_thead_tr'>
                    <th className='table_thead_tr_th'>NOMBRE</th>
                    <th className='table_thead_tr_th'>STOCK</th>
                    <th className='table_thead_tr_th'>DISPONIBLE</th>
                </tr>
            </thead>
            <tbody className='table_tbody'>
                {products.map(product => (
                    <tr className='table_tbody_tr' key={product._id}>
                        <td className='table_tbody_tr_td'>{product.name}</td>
                        <td className='table_tbody_tr_td'>{product.stock}</td>
                        {product.status ? <td className='table_tbody_tr_td'>Disponible</td> : <td className='table_tbody_tr_td'>No disponible</td>}
                    </tr>
                ))}
            </tbody>
        </table>
        <div className='container_btn'>
            <button onClick={() => setModal(!modal)} className='btn'>Agregar un producto</button>
        </div>
        {modal && <AddProduct setModal={setModal}
                              modal={modal}
                              setProducts={setProducts}></AddProduct>}
    </>
  )
}

export default Products