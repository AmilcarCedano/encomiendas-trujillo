import { useState } from 'react';
import { login } from '../services/api.js';

const estilos = {
  fondo: { minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#eef2f3', fontFamily: 'system-ui' },
  tarjeta: { background: '#fff', borderRadius: 14, boxShadow: '0 8px 28px rgba(0,0,0,.12)', width: 380, padding: '30px 34px' },
  campo: { width: '100%', boxSizing: 'border-box', border: '1px solid #cfd6da', borderRadius: 8, padding: '9px 12px', marginBottom: 14 },
  boton: { width: '100%', background: '#2F6F73', color: '#fff', border: 0, borderRadius: 8, padding: 10, fontWeight: 600, cursor: 'pointer' },
};

export default function Login({ onIngreso }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  async function enviar(e) {
    e.preventDefault();
    setError('');
    try {
      const sesion = await login(usuario, contrasena);
      localStorage.setItem('sesion', JSON.stringify(sesion));
      onIngreso(sesion);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={estilos.fondo}>
      <form style={estilos.tarjeta} onSubmit={enviar}>
        <h2 style={{ textAlign: 'center', margin: 0 }}>Encomiendas Trujillo</h2>
        <p style={{ textAlign: 'center', color: '#5B6770', marginTop: 4 }}>Acceso del personal</p>
        <label htmlFor="usuario">Usuario</label>
        <input id="usuario" style={estilos.campo} value={usuario} onChange={e => setUsuario(e.target.value)} required />
        <label htmlFor="contrasena">Contraseña</label>
        <input id="contrasena" type="password" style={estilos.campo} value={contrasena} onChange={e => setContrasena(e.target.value)} required />
        {error && <p style={{ color: '#c0392b' }}>⚠ {error}</p>}
        <button style={estilos.boton}>Ingresar</button>
      </form>
    </div>
  );
}
