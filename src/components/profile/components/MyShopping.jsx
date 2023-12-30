import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context/UserContext.jsx'
import { Link } from 'react-router-dom'

const MyShopping = () => {
    const [user] = useContext(UserContext)
    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `api/session/${user.id}`)
            try {
                if(response.data.success){
                    setPurchases(response.data.my_shopping)
                    console.log(response.data.my_shopping);
                } else {
                    console.log(response.data.message);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchData()
    }, [])
  return (
    <div className="my-shopping-list">
      <h2>Mis Compras</h2>
      {purchases.length > 0 ? (
        <div className='my-shopping-list_container'>
            <div className='my-shopping-list_container_div'>
                <h3 className='my-shopping-list_container_div_h3'>Codigo de compra</h3>
                <h3 className='my-shopping-list_container_div_h3'>Monto</h3>
                <h3 className='my-shopping-list_container_div_h3'>Fecha</h3>
            </div>
            <div className='my-shopping-list_container_table'>
                {purchases.map((pur) => {
                    const formattedDate = new Intl.DateTimeFormat('es-AR', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        timeZone: 'America/Argentina/Buenos_Aires',
                    }).format(new Date(pur.shopping_id.purchase_dateTime));
             
                    return(
                        <Link className='my-shopping-list_container_table_links' to={`/my-shopping/${pur.shopping_id._id}`}>
                            <h6 className='my-shopping-list_container_table_links_h6'>{pur.shopping_id._id}</h6>
                            <h6 className='my-shopping-list_container_table_links_h6'>${pur.shopping_id.amount.toFixed(2)}</h6>
                            <h6 className='my-shopping-list_container_table_links_h6'>{formattedDate}</h6>
                        </Link>
                    )
                })}
            </div>
            
        </div>
      ) : (
        <p>No hay compras disponibles.</p>
      )}
    </div>
  )
}

export default MyShopping