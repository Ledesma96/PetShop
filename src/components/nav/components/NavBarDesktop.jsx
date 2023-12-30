import React ,{useContext} from 'react'
import { Link } from 'react-router-dom'
import CartIcon from './CartIcon.jsx'
import { UserContext } from '../../../context/UserContext.jsx';

const NavBarDesktop = ({ enterCategory, search, setSearch, searchText, setSearchText,SearchChange}) => {
    const [user, setUser] = useContext(UserContext)
  return (
    <>
         <div className='navbar'>
            <Link to={"/"} onClick={enterCategory} className='navbar__brand'>
                <img width={50} src="https://files.cults3d.com/uploaders/20952150/illustration-file/baf84c71-c11b-4b27-a2bc-377e5358b7da/pngwing.com-2023-01-17T071915.702.png" alt="" />
                <h3 className='navbar__brand__h3'>PetShop</h3>
            </Link>
            <div className='navbar__search'>
                <input className='navbar__search__input' type="text" placeholder='Buscar' value={searchText} onChange={SearchChange} />
                <button className='navbar__search__button'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </button>
            </div>
            <div className='navbar__links'>
                <Link onClick={enterCategory} to={`/category/${"perros"}`} className='navbar__links__link'>PERROS</Link>
                <Link onClick={enterCategory} to={`/category/${"gatos"}`} className='navbar__links__link'>GATOS</Link>
                <Link onClick={enterCategory} className='navbar__links__link'>AVES</Link>
                <Link onClick={enterCategory} className='navbar__links__link'>CONEJOS</Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                </svg>
            </div>
            {user?.rol == 'user' && <CartIcon></CartIcon>}
        </div>
    </>
  )
}

export default NavBarDesktop