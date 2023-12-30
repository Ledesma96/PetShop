import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import Payment from './components/Payment.jsx';


const Cart = () => {
    const [user, setUser, add, setAdd] = useContext(UserContext)
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);


      const fetchData = async () => {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `api/carts/${user.cart}`);
        const data = response.data
        try {
            if (data.success) {
                 setProducts(data.cart.products);
                 console.log(data.cart);
                 const totalPrice = data.cart.products.reduce((total, item) => {
                     const productPrice = item.pid.price * item.quantity;
                     return total + productPrice;
                 }, 0);
                 setTotal(totalPrice.toFixed(2));
            } else {
                console.log("Ha ocurrido un error inesperado");
            }
        } catch (error) {
            console.log("Error al obtener los datos del carrito");
        }
    };

    useEffect(() => {
        fetchData();
    }, [add]);

    const addQuantity = async (pid) => {
        if (!isBtnDisabled) {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_URL + `api/carts/${user.cart}/${pid}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ quantity: 1 })
                });
                if (response.ok) {
                    setIsBtnDisabled(true);
                    fetchData();
                    setTimeout(() => {
                        setIsBtnDisabled(false);
                    }, 400);
                } else {
                    console.log("No se pudo actualizar el producto");
                }
            } catch (error) {
                console.log("Ha ocurrido un error inesperado", error);
            } finally {
                setTimeout(() => {
                    setIsBtnDisabled(false);
                }, 500);
            }
        }
    };
    

    const removeQuantity = async (pid) => {
        if (!isBtnDisabled) {
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + `api/carts/${user.cart}/${pid}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json' // Indicar que estás enviando JSON
                },
                body: JSON.stringify({ quantity: -1 })
            });

            if (response.ok) {
                setIsBtnDisabled(true)
                fetchData();
            } else {
                console.log("No se pudo actualizar el producto");
            }
        } catch (error) {
            console.log("Ha ocurrido un error inesperado", error);
        } finally {
            setTimeout(() => {
                setIsBtnDisabled(false)
            }, 500)
        }
    }
    };

    const deletedProduct = async(pid) => {
        const response = await axios.delete(import.meta.env.VITE_BACKEND_URL + `api/carts/${user.cart}/${pid}`)
        if(response.data.success){
            console.log(response.data.message);
            setAdd(add +1)
        } else {
            console.log(response.data.message);
        }
    }
    
  return (
    <div className='cart'>
        {products.map((item) => {
            // Dividir el nombre en palabras
            const nameWords = item.pid.name.split(' ');

            // Tomar las dos primeras palabras
            const firstTwoWords = nameWords.slice(0, 2).join(' ');

            return (
                <div className='cart__div' key={item._id}>
                    <img className='cart__div__img' src={item.pid.image} alt={item.pid.name}/>
                    <p className='cart__div__name'>{firstTwoWords}</p>
                    <div className='cart__div__div'>
                        <button disabled={(item.quantity == 1) || isBtnDisabled } className='cart__div__div__btn' onClick={() => removeQuantity(item.pid._id)}>-</button>
                        <p className='cart__div__div__quantity'>{item.quantity}</p>
                        <button disabled={(item.quantity >= item.pid.stock) || isBtnDisabled} className='cart__div__div__btn' onClick={() => addQuantity(item.pid._id)}>+</button>
                    </div>
                    <p className='cart__div__price'>${item.quantity * item.pid.price}</p>
                    <div onClick={() => deletedProduct(item._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"  viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </div>
                </div>
            );
        })}
        <div className='cart__total'>
            <h3 className='cart__total__h3'>TOTAL: </h3>
            <h3 className='cart__total__num'>${total}</h3>
        </div>
        <Payment></Payment>
    </div>
  )
}

export default Cart