import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get('http://localhost:8080/api/products/all-products')
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
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>stock</th>
                    <th>disponible</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr>
                        <td>{product.name}</td>
                        <td>{product.stock}</td>
                        {product.status ? <td>Disponible</td> : <td>No disponible</td>}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Products