import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Cart = () => {
    const [user, setUser, add, setAdd] = useContext(UserContext)
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);


      const fetchData = async () => {
        const response = await axios.get(`http://localhost:8080/api/carts/${user.cart}`);
        const data = response.data
        try {
            if (data.success) {
                 setProducts(data.cart.products);
                 const totalPrice = data.cart.products.reduce((total, item) => {
                     const productPrice = item.pid.price * item.quantity;
                     return total + productPrice;
                 }, 0);
                 setTotal(totalPrice);
            } else {
                console.log("Ha ocurrido un error inesperado");
            }
        } catch (error) {
            console.log("Error al obtener los datos del carrito");
        }
    };

    useEffect(() => {
        fetchData(); // Llamar a fetchData al cargar el componente
    }, []);

    

    const addQuantity = async (pid) => {
        if (!isBtnDisabled) {
            try {
                const response = await fetch(`http://localhost:8080/api/carts/${user.cart}/${pid}`, {
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
            const response = await fetch(`http://localhost:8080/api/carts/${user.cart}/${pid}`, {
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
                </div>
            );
        })}
        <div className='cart__total'>
            <h3 className='cart__total__h3'>TOTAL: </h3>
            <h3 className='cart__total__num'>${total}</h3>
        </div>
    </div>
  )
}

export default Cart