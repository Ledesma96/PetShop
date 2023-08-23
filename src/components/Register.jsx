import React, { useState } from 'react';
const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    dni: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/api/session/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.status === 200) {
        console.log('Registro de usuario exitoso');
        window.location.href = '/login';
      } else {
        console.log('Error en el registro de usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud de registro:', error);
    }
  };


  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" name="first_name" placeholder="Nombre" value={formData.first_name} onChange={handleInputChange} className="orange-input"/>
        <input type="text" name="last_name" placeholder="Apellido" value={formData.last_name} onChange={handleInputChange} className="orange-input"/>
        <input type="number" name="dni" placeholder="DNI" value={formData.dni} onChange={handleInputChange} className="orange-input"/>
        <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleInputChange} className="orange-input"/>
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleInputChange} className="orange-input"/>
        <button type="submit" className="register-button">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
