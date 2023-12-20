import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  const [register, setRegister] = useState(false)
  //register
  const [formDataa, setFormDataa] = useState({
    first_name: '',
    last_name: '',
    dni: '',
    email: '',
    password: ''
  });

  const handleInputChangee = (e) => {
    const { name, value } = e.target;
    setFormDataa({
      ...formDataa,
      [name]: value
    });
  };

  const handleSubmiit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/api/session/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataa)
      });

      if (response.status === 200) {
        console.log('Registro de usuario exitoso');
        setRegister(false)
      } else {
        console.log('Error en el registro de usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud de registro:', error);
    }
  };

  //login
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleRegister = () => {
    setRegister(!register)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8080/api/session/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if(response.status === 200){
        const userData = await response.json();
        sessionStorage.setItem('user', JSON.stringify(userData));
        window.location.href="/";
      } else {
        console.log("error al iniciar sesion");
        window.location.href= "/login"
      }
    } catch (error) {
      console.log("Ha ocurrido un error inesperado");
    }
  }

  
  return (
    <div className= 'login'>
      <div className={register ? "login-register_container-off" : 'login-register_container-on'}>
        {register ? 
        <div className="register-container">
        <h2 className='register-container__h2'>Registro</h2>
        <form className="register-form" onSubmit={handleSubmiit}>
          <input type="text" name="first_name" placeholder="Nombre" value={formDataa.first_name} onChange={handleInputChangee} className="orange-input"/>
          <input type="text" name="last_name" placeholder="Apellido" value={formDataa.last_name} onChange={handleInputChangee} className="orange-input"/>
          <input type="number" name="dni" placeholder="DNI" value={formDataa.dni} onChange={handleInputChangee} className="orange-input"/>
          <input type="email" name="email" placeholder="Correo electrónico" value={formDataa.email} onChange={handleInputChangee} className="orange-input"/>
          <input type="password" name="password" placeholder="Contraseña" value={formDataa.password} onChange={handleInputChangee} className="orange-input"/>
          <button type="submit" className="register-button">Registrarse</button>
        </form>
        <div className='register__div'>
            <div className='register__div__div'>
              <svg color='white' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
              </svg>
            </div>
            <div className='register__div__div'>
              <svg color='white' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
              </svg>
            </div>
          </div>
        <Link className='register__section__login' onClick={handleRegister}>Iniciar sesion</Link>
      </div>
        :
        <section className='login__section'>
          <h1 className='login__section__h1'>Iniciar sesion</h1>
          <form action="" className='login__section__form' onSubmit={handleSubmit}>
            <input className='login__section__form__datos' name='email'  value={formData.email} type="text" placeholder='Email' onChange={handleInputChange}/>
            <input className='login__section__form__datos' name='password' value={formData.password} type="password" placeholder='Password' onChange={handleInputChange}/>
            <input className='login__section__form__btn' type="submit" value="Iniciar sesion"/>
          </form>
          <Link className='login__section__register' onClick={handleRegister}>registrarse</Link>
          <div className='login__div'>
            <div className='login__div__div'>
              <svg color='white' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
              </svg>
            </div>
            <div className='login__div__div'>
              <svg color='white' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
              </svg>
            </div>
          </div>
        </section>
        }
      </div>
    </div> 
  );
}


export default Login