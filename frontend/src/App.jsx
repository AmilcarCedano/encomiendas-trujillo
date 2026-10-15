import { useState } from 'react';
import Login from './pages/Login.jsx';

export default function App() {
  const [sesion, setSesion] = useState(() => JSON.parse(localStorage.getItem('sesion') || 'null'));

  if (!sesion) return <Login onIngreso={setSesion} />;

  return (
    <main style={{ fontFamily: 'system-ui', padding: 32 }}>
      <h1>Bienvenido, {sesion.nombres}</h1>
      <p>Rol: {sesion.rol}</p>
      <button onClick={() => { localStorage.removeItem('sesion'); setSesion(null); }}>Cerrar sesión</button>
    </main>
  );
}
