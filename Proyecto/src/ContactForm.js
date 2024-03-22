import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

// Lista de palabras prohibidas
const palabrasProhibidas = [
  "pendejo", "cabrón", "chinga", "chingada", "puto", "puta", "verga", "culero",
  "culera", "mamón", "mamona", "culon", "culona", "joto", "jota", "pendeja",
  "pendejas", "pendejos", "putitos", "putitas", "chingar", "chingón", "chingona",
  "mierda", "pinche", "pinches"
];

// Definir el componente ContactForm
const ContactForm = () => {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono: '',
  });

  // Estado adicional para almacenar los datos del formulario al presionar "Guardar"
  const [datosGuardados, setDatosGuardados] = useState(null);

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para validar el nombre y apellidos
  const validarNombreApellido = (nombre) => {
    // Expresión regular para verificar si el nombre o apellido contiene solo letras y espacios
    const regex = /^[a-zA-Z\s]+$/;

    // Verificar si el nombre o apellido coincide con la expresión regular
    if (!regex.test(nombre)) {
      alert("Por favor, introduce un nombre válido sin números.");
      return false;
    }

    // Verificar si el nombre tiene al menos 3 letras
    if (nombre.length < 3) {
      alert("Por favor, introduce un nombre con al menos 3 letras.");
      return false;
    }

    // Verificar si el nombre o apellido contiene groserías
    if (palabrasProhibidas.some(palabra => nombre.toLowerCase().includes(palabra))) {
      alert("Por favor, evita groserías en el nombre o apellido.");
      return false;
    }

    return true;
  };

  // Función para validar el correo electrónico
  const validarCorreo = (email) => {
    // Expresión regular para verificar si la dirección de correo electrónico termina con "@gmail.com"
    const regex = /@gmail\.com$/i;

    // Verificar si el correo electrónico coincide con la expresión regular
    if (!regex.test(email)) {
      alert("Por favor, introduce un correo electrónico válido de Gmail.");
      return false;
    }

    // Verificar si el correo contiene groserías
    if (/[a-zA-Z][!#$%^&()_+={}\[\]:;"'<>,?/\\|]/.test(email)) {
      alert("Por favor, evita caracteres especiales o groserías en el correo electrónico.");
      return false;
    }

    return true;
  };

  // Función para validar el número de teléfono
  const validarContacto = (telefono) => {
    // Expresión regular para verificar si el teléfono contiene solo 10 dígitos
    const regex = /^\d{10}$/;

    // Verificar si el teléfono coincide con la expresión regular
    if (!regex.test(telefono)) {
      alert("Por favor, introduce un número de teléfono válido de 10 dígitos.");
      return false;
    }

    // Verificar la lada
    if (!telefono.startsWith("961")) {
      alert("Por favor, introduce un número de teléfono con la lada 961.");
      return false;
    }

    // Verificar si el teléfono tiene números repetidos o ceros consecutivos
    if (/(\d)\1{2,}|0000000/.test(telefono)) {
      alert("Por favor, evita números repetidos o ceros consecutivos en el teléfono.");
      return false;
    }

    // Verificar si el teléfono contiene groserías
    if (/[a-zA-Z][!@#$%^&()_+={}\[\]:;"'<>,.?/\\|]/.test(telefono)) {
      alert("Por favor, evita caracteres especiales o groserías en el teléfono.");
      return false;
    }

    return true;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el nombre antes de almacenar los datos del formulario
    if (!validarNombreApellido(formData.nombre)) {
      return;
    }

    // Validar el apellido paterno antes de almacenar los datos del formulario
    if (!validarNombreApellido(formData.apellidoPaterno)) {
      return;
    }

    // Validar el apellido materno antes de almacenar los datos del formulario
    if (!validarNombreApellido(formData.apellidoMaterno)) {
      return;
    }

    // Validar el correo electrónico antes de almacenar los datos del formulario
    if (!validarCorreo(formData.email)) {
      return;
    }

    // Validar el teléfono antes de almacenar los datos del formulario
    if (!validarContacto(formData.telefono)) {
      return;
    }

    // Almacenar los datos del formulario en el estado adicional
    setDatosGuardados(formData);
  };

  // Renderizar el formulario
  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            name="nombre"
            onChange={handleChange}
            value={formData.nombre}
            placeholder="Nombre"
            minLength={3} // Establecer la longitud mínima requerida
            required
          />
        </div>
        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            name="apellidoPaterno"
            onChange={handleChange}
            value={formData.apellidoPaterno}
            placeholder="Apellido Paterno"
            required
          />
        </div>
        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            name="apellidoMaterno"
            onChange={handleChange}
            value={formData.apellidoMaterno}
            placeholder="Apellido Materno"
            required
          />
        </div>
        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Correo Electrónico"
            required
          />
        </div>
        <div className="input-group">
          <FaPhone className="icon" />
          <input
            type="tel"
            name="telefono"
            onChange={handleChange}
            value={formData.telefono}
            placeholder="Teléfono"
            required
          />
        </div>
        <input type="submit" value="Guardar" />
      </form>

      {/* Mostrar los datos guardados */}
      {datosGuardados && (
        <div className="datos-guardados">
          <h2>Datos Guardados:</h2>
          <pre>{JSON.stringify(datosGuardados, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

// Exportar el componente ContactForm
export default ContactForm;

