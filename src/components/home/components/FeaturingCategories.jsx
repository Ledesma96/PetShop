import React from 'react'
import { Link } from 'react-router-dom'

const FeaturingCategories = () => {
  return (
    <div  className='category'>
        <h3 className='category__title'>C<span className='category__title__span'>ategorías destacadas</span></h3>
        <div className='category__items'>
            <Link to={`/category/aves`}  className='category__items__item'>
                <img className='category__item__img' width={70} src="../public/images/ctg_1.png" alt="" />
                <h3 className='category__item__h3'>Aves</h3>
                <p className='span'>( 5 items )</p>
            </Link>
            <Link to={`/category/perros`} className='category__items__item'>
                <img className='category__item__img' width={70} src="../public/images/ctg_2.png" alt="" />
                <h3 className='category__item__h3'>Perros</h3>
                <p className='span'>( 5 items )</p>
            </Link>
            <Link to={`/category/conejos`} className='category__items__item'>
                <img className='category__item__img' width={70} src="../public/images/ctg_4.png" alt="" />
                <h3 className='category__item__h3'>Conejos</h3>
                <p className='span'>( 5 items )</p>
            </Link>
            <Link to={`/category/gatos`} className='category__items__item'>
                <img className='category__item__img' width={70} src="../public/images/ctg_6.png" alt="" />
                <h3 className='category__item__h3'>Gatos</h3>
                <p className='span'>( 5 items )</p>
            </Link>
        </div>
    </div>
  )
}

export default FeaturingCategories