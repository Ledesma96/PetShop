import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Count from './components/Count';
import axios from 'axios';
import Notification from '../Notification.jsx';

const Itemdetail = () => {
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        async function fetchProduct () {
            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `api/products/detail/${id}`)
                
                if(response.data.success){
                    setProduct(response.data.product)
                } else {
                    console.log("Ha ocurrido un error inesperado", response.statusText);
                }
            } catch (error) {
                console.log("error al hacer fetching de datos", error);
            }
        }
        fetchProduct()
    }, [id])
    
  return (
    <>
    {product && (
      <div className='detail' key={product._id}>
        <section className='detail__section'>
            <img className='detail__section__img' src={product.image} alt={product.name} />
            <div className='detail__section__div'>
                <h1 className='detail__section__div__h1'>{product.name}</h1>
                <p className='detail__section__div__p'>${product.price}</p>
                <Count stock={product.stock} id={id} setNotification={setNotification}></Count>
                <div className='detail__section__div__div'>
                    <svg color='rgb(255, 68, 0)' xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"  viewBox="0 0 16 16">
                        <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                        <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    <p className='detail__section__div__div__p'>Compra protegida</p>
                </div>
                <div className='detail__section__div__div'>
                    <svg color='rgb(255, 68, 0)' xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"  viewBox="0 0 16 16">
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                    <p className='detail__section__div__div__p'>Envios a domicilio</p>
                </div>
                <div className='detail__section__div__div'>
                    <svg color='rgb(255, 68, 0)' className='svg' xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                    </svg>
                    <p className='detail__section__div__div__p'>Disponible - Stock: {product.stock}</p>
                </div>
            </div>
        </section>
        <div className='detail__div'>
            <div className="detail__div__div">
                <span className="detail__div__div__span"></span>
                <h1 className="detail__div__div__h1">Descripción</h1>
            </div>
            <p className='detail__div__p'>{product.description}</p>
        </div>
      </div>
    )}
    {notification && <Notification notification={notification}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"  viewBox="0 0 16 16">
            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"/>
        </svg>
        <p className='text-notification'>Producto agregado!</p></Notification>}
  </>
    
  )
}

export default Itemdetail