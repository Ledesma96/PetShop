import React, { useContext } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import CartIcon from './CartIcon'
import { UserContext } from '../../../context/UserContext.jsx'

const NavBarMobile = ({open, setOpen, enterCategory, search, setSearch, searchText, setSearchText,SearchChange}) => {
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    const logOut = () => {
        setUser(null);
        setOpen(false)
        sessionStorage.removeItem("user")
        navigate("/login")
    }

    const handleClick = () => {
        setOpen(!open)
    }

    const handleRedirect = (id) => {
        window.location.href = "#/detail/" + id
        setSearchText("")
        setSearch([])
      }
  return (
    <>
     <div className='navbarMobile'>
                <Link to={"/"} onClick={enterCategory} className='navbarMobile__brand'>
                    <img width={50} src="https://files.cults3d.com/uploaders/20952150/illustration-file/baf84c71-c11b-4b27-a2bc-377e5358b7da/pngwing.com-2023-01-17T071915.702.png" alt="" />
                    <h3 className='navbarMobile__brand__h3'>PetShop</h3>
                </Link>
                {user?.rol == 'user' && <CartIcon></CartIcon>}
                <div className={`navbarMobile_toggle-icon ${open ? 'navbarMobile_open' : ''}`} onClick={handleClick}>
                    {open ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16  16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    )}
                </div>
                <div className={open ?'navbarMobile__links-on' : 'navbarMobile__links-off' }>
                    <Link onClick={enterCategory} to={`/category/${"perros"}`} className='navbarMobile__links__link'>PERROS</Link>
                    <Link onClick={enterCategory} to={`/category/${"gatos"}`} className='navbarMobile__links__link'>GATOS</Link>
                    <Link onClick={enterCategory} className='navbarMobile__links__link'>AVES</Link>
                    <Link onClick={enterCategory} className='navbarMobile__links__link'>CONEJOS</Link>
                    {user?.rol == 'user' && <Link onClick={enterCategory} className='navbarMobile__links__link' to={`/contact`}>CONTACTO</Link>}

                    {user ?  (user.rol == "admin" ? <Link to={"/dashboard"} onClick={enterCategory} className='navbarMobile__links__link'>PANEL</Link> : <Link to={"/profile"} onClick={enterCategory} className='navbarMobile__links__link'>PERFIL</Link>) : <></>}

                    {user !== null ? <button className='navbarMobile__links__button' onClick={logOut}>Cerrar sesion</button> : <Link onClick={enterCategory} to={`/login`} className='navbarMobile__links__link-session'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                        </svg> Iniciar sesion
                    </Link>}
                    
                </div>
            </div> 
            <div className='navbaMobiler__search'>
                <div className='navbaMobiler__seaarch'>
                    <input className='navbarMobile__search__input' type="text" placeholder='Buscar' value={searchText} onChange={SearchChange} />
                    <button className='navbarMobile__search__button'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </div>
                <div className='navbaMobiler__search__div'>
                    {search?.map((prod) => (
                        <aside key={prod._id} className='navbaMobiler__search__div__aside' onClick={() => handleRedirect(prod._id)} >
                            <img className='navbaMobiler__search__div__aside__img' src={prod.image} alt={prod.name} />
                            <p className='navbaMobiler__search__div__aside__p'>{prod.name}</p>
                        </aside>
                    ))}
                </div>
            </div> 
            </>
  )
}

export default NavBarMobile