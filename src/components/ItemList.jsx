import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/ShopingCartContext'

const ItemList = ({products}) => {
    const [cart, setCart, updateCart, setUpdateCart] = useContext(CartContext) 

    const addCart = async (pid) => {
        console.log(pid, cart);
            const response = await fetch(`http://localhost:8080/api/carts/${cart}/products/${pid}`,{
                method:"POST"
            })
            try {
                if(response.status == 201){
                    console.log("Producto agregado al carrito");
                    setUpdateCart(updateCart + 1)
                } else {
                    console.log("ocurrio un error inesperado");
                }
            } catch (error) {
                console.log("No se pudo agregar producto al carrito", error, );
            }
    }
  return (
    <div className='items'>
        {products?.map((prod) => (
            <section className={prod.stock == 0 ? "items__section__disabled" :"items__section"} key={prod._id}>
                <img className='items__section__img' src={prod.image} alt={prod.name} />
                <div className='items__section__div'>
                    <h4 className="items__section__div__h4">{prod.name}</h4>
                    <p className="items__section__div__p">Stock: {prod.stock}</p>
                    {prod.stock > 0 ? <p className="items__section__div__p">Disponible</p> : <p className="items__section__div__p">Sin stock</p>}
                    <h4 className="items__section__div__h4">${prod.price}</h4>
                    <div>
                        <button disabled={prod.stock == 0} className="items__section__div__btn" onClick={() => addCart(prod._id)}>Agregar al carrito</button>
                        <Link to={`/detail/${prod._id}`} className="items__section__div__des">Detalles</Link>
                    </div>
                </div>
            </section>
        ))}
    </div>
  )
}

export default ItemList