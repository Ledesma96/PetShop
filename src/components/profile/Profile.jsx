import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useContext(UserContext)
    
    const logOut = () => {
        setUser(null);
        sessionStorage.removeItem("user")
        navigate("/login")
    }
  return (
    <div className="profile">
        <section className='profile_section'>
            <img className='profile_section_img' src={user.image} alt="" />
            <aside className='profile_section_aside'>
                <svg color='white' xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
            </aside>
        </section>
        <div className='profile_div_datos'>
            <h2>{user.name} {user.last_name}</h2>
            <h6>{user.email}</h6>
        </div>
        <div className='profile_div_btn'>
            <button className='profile_div_btn_log-out' onClick={logOut}>CERRAR SESIÓN</button>
            <button className='profile_div_btn_shopping'>
                <Link to={'/my-shopping'} className='profile_div_btn_shopping_link'>MIS COMPRAS</Link>
            </button>
        </div>
    </div>

  )
}

export default Profile