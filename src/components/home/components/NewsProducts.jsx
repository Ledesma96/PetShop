import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewsProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `api/products`);
        if (response.status == 200) {
          const data = await response.json();
          const {docs} = data.products;
          setProducts(docs);
        } else {
          console.error('Error fetching products:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  
  return (
    <div className="new">
      <div className="new__div">
        <span className="new__div__span"></span>
        <h1 className="new__div__h1">Nuevos productos</h1>
      </div>
      <div className="new__cards">
      {products.length == 0 ?  (
         <>
            <div className="new__cards__card mt-4">
              <p className="new__cards__card__new">Nuevo</p>
              <div className="new__cards__card__img-skeleton"></div>
              <div className="new__cards__card__h2-skeleton"></div>
              <div className="new__cards__card__price-skeleton"></div>
              <section className="new__cards__card__section">
                <button className="new__cards__card__section__btn-skeleton-cart"></button>
                <button className="new__cards__card__section__btn-skeleton"></button>
              </section>
            </div>
            <div className="new__cards__card mt-4">
              <p className="new__cards__card__new">Nuevo</p>
              <div className="new__cards__card__img-skeleton"></div>
              <div className="new__cards__card__h2-skeleton"></div>
              <div className="new__cards__card__price-skeleton"></div>
              <section className="new__cards__card__section">
                <button className="new__cards__card__section__btn-skeleton-cart"></button>
                <button className="new__cards__card__section__btn-skeleton"></button>
              </section>
            </div>
            <div className="new__cards__card mt-4">
              <p className="new__cards__card__new">Nuevo</p>
              <div className="new__cards__card__img-skeleton"></div>
                    <div className="new__cards__card__h2-skeleton"></div>
              <div className="new__cards__card__price-skeleton"></div>
              <section className="new__cards__card__section">
                <button className="new__cards__card__section__btn-skeleton-cart"></button>
                <button className="new__cards__card__section__btn-skeleton"></button>
              </section>
            </div>
            <div className="new__cards__card mt-4">
              <p className="new__cards__card__new">Nuevo</p>
              <div className="new__cards__card__img-skeleton"></div>
              <div className="new__cards__card__h2-skeleton"></div>
              <div className="new__cards__card__price-skeleton"></div>
              <section className="new__cards__card__section">
                <button className="new__cards__card__section__btn-skeleton-cart"></button>
                <button className="new__cards__card__section__btn-skeleton"></button>
              </section>
            </div>
            <div className="new__cards__card mt-4">
              <p className="new__cards__card__new">Nuevo</p>
              <div className="new__cards__card__img-skeleton"></div>
              <div className="new__cards__card__h2-skeleton"></div>
              <div className="new__cards__card__price-skeleton"></div>
              <section className="new__cards__card__section">
                <button className="new__cards__card__section__btn-skeleton-cart"></button>
                <button className="new__cards__card__section__btn-skeleton"></button>
              </section>
            </div>
            <div className="new__cards__card mt-4">
              <p className="new__cards__card__new">Nuevo</p>
              <div className="new__cards__card__img-skeleton"></div>
              <div className="new__cards__card__h2-skeleton"></div>
              <div className="new__cards__card__price-skeleton"></div>
              <section className="new__cards__card__section">
                <button className="new__cards__card__section__btn-skeleton-cart"></button>
                <button className="new__cards__card__section__btn-skeleton"></button>
              </section>
            </div>
          </> 
          ): (
        products.map((prod) => (
          <div key={prod._id} className="new__cards__card mt-4">
            <p className="new__cards__card__new">Nuevo</p>
            <img className="new__cards__card__img" src={prod.image} alt=""/>
            <h2 className="new__cards__card__h2">{prod.name}</h2>
            <p className="new__cards__card__price">${prod.price}</p>
            <section className="new__cards__card__section">
              <button className="new__cards__card__section__btn">Agregar al carrito</button>
              <Link to={`/detail/${prod._id}`} className="new__cards__card__section__btn">Detalles</Link>
            </section>
          </div>
        ))
      ) }
      </div>
    </div>
  );
};

export default NewsProducts;
