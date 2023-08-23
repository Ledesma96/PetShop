import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ItemList from './ItemList';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const ItemListContainer = () => {
    const {category} = useParams();
    const [products, setProducts] = useState([]);
    const [filterOn, setFilterOn] = useState(false);
    const [sort, setSort] = useState(1);
    const [type, setType] = useState(null);
    const [range, setRange] = useState([0, 25000]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(50000);
    const [nextPage, setNextPage] = useState(null)
    const [prevPage, setPrevPage] = useState(null)
    const [totalPages, setTotalPages] = useState(null)
    const [page, setPage] = useState(1)

    const handleClear = () => {
        setSort(1);
        setType(null);
        setMinPrice(0);
        setMaxPrice(50000)
    }

    const handlePrevPage = () => {
        setPage(prevPage)
    }

    const handleNextPage = () => {
        setPage(nextPage)
    }

    useEffect(() => {
        setMinPrice(range[0])
        setMaxPrice(range[1])
    }, [range])

    const handleRangeChange = (newRange) => {
      setRange(newRange);
    };



    const handleSort = (event) => {
        const selectedSort = parseInt(event.target.value, 10);
        setSort(selectedSort);
        
    };
    const handleType = (event) => {
        const selectedType = event.target.value;
        setType(selectedType);
    }

    const handleFilter = () => {
        setFilterOn(!filterOn)
    }

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(`http://localhost:8080/api/products?category=${category}&tipo=${type}&limit=4&sort=${sort}&max=${maxPrice}&min=${minPrice}&page=${page}`)

                if(response.status == 201){
                    const data = await response.json();
                    const {docs, nextPage, prevPage, totalPages} = data;
                    setProducts(docs);
                    setNextPage(nextPage);
                    setPrevPage(prevPage);
                    setTotalPages(totalPages);
                } else {
                    console.error('Error fetching products:', response.statusText);
                }
            } catch (error) {
                console.log("Ah ocurrido un error: ", error)
            }
        }
        fetchProducts();
    },[category, sort, type, range, page])

    useEffect(() =>{
        setType(null)
    }, [category] )
  return (
    <>
    <div className='filter'>
        <section className='filter__section' onClick={handleFilter}>
            <h3>Filtros</h3>
            <svg className={filterOn ? "filter__section__down" : "filter__section__up"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
            </svg> 
        </section>
        <form className={filterOn ? "filter__open" : "filter__close"}>
            <aside className='filter__aside'>
                <h5>Orden</h5>
                <div className='filter__aside__div'>
                    <label  className='filter__aside__div__label'>
                        <input className='filter__aside__div__label__input' type="radio" name="sortOption" value="1" onChange={handleSort}/>Menor a mayor
                    </label>
                    <label  className='filter__aside__div__label'>
                        <input className='filter__aside__div__label__input' type="radio" name="sortOption" value="-1" onChange={handleSort}/>Mayor a menor
                    </label>
                </div>
            </aside>
            <aside className='filter__aside'>
                <h5>Tipo</h5>
                <div className='filter__aside__div'>
                    <label  className='filter__aside__div__label'>
                        <input className='filter__aside__div__label__input' type="radio" name="alimentoOption" value="alimentos" onChange={handleType}/>Alimentos
                    </label>
                    <label  className='filter__aside__div__label'>
                        <input className='filter__aside__div__label__input' type="radio" name="alimentoOption" value="juguetes" onChange={handleType}/>Jugetes
                    </label>
                    <label  className='filter__aside__div__label'>
                        <input className='filter__aside__div__label__input' type="radio" name="alimentoOption" value="snacks" onChange={handleType}/>Snaks
                    </label>
                </div>
            </aside>
            <aside className='filter__aside'>
                <h5>Rango de precio</h5>
                <div className="filter__aside__div">
                    <div className="slider-container">
                        <div className="filter__aside__div__div">
                            <label className='filter__aside__div__label' htmlFor="price-range">${range[0]}</label>
                            <label className='filter__aside__div__label' htmlFor="price-range">${range[1]}</label>
                        </div>
                        <Slider className='filter__aside__div__slider' range min={0} max={25000} step={1} value={range} onChange={handleRangeChange}/>
                    </div>
                </div>
            </aside>
            <input className='filter__clear' type='reset' value="Limpiar" onClick={handleClear}/>
        </form>
    </div>
    <ItemList
    products= {products}></ItemList>
    <div className='paginate'>
        {prevPage && <Link className='paginate__link' onClick={handlePrevPage}>Antertior</Link>}
        {prevPage && <Link className='paginate__link' onClick={handlePrevPage}>{prevPage}</Link>}
        <Link className='paginate__link'>{page}</Link>
        {nextPage && <Link className='paginate__link' onClick={handleNextPage}>{nextPage}</Link>}
        {nextPage && <Link className='paginate__link' onClick={handleNextPage}>Proximo</Link>}
    </div>
    </>
  )
}

export default ItemListContainer