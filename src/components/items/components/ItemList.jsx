import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'


const ItemList = ({products}) => {
    const [user, setUser, add, setAdd] = useContext(UserContext);


     const addCart = async (pid) => {

             const response = await fetch(import.meta.env.VITE_BACKEND_URL + `api/carts/${user.cart}/products/${pid}`,{
                 method:"POST"
             })
             try {
                 if(response.ok){
                    const data = await response.json()
                    console.log(data);
                    console.log(data.message);
                    setAdd(add + 1)
                 } else {
                     console.log("ocurrio un error inesperado", data.message);
                 }
             } catch (error) {
                 console.log(error.message );
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
                    <div className='items__section__div__div'>
                        <button disabled={prod.stock == 0} className="items__section__div__div__btn" onClick={() => addCart(prod._id)}>Agregar al carrito</button>
                        <Link to={`/detail/${prod._id}`} className="items__section__div__div__des">Detalles</Link>
                    </div>
                </div>
            </section>
        ))}
    </div>
  )
}

export default ItemList