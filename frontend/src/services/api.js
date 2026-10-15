const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export async function login(usuario, contrasena) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, contrasena }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.mensaje);
  return data;
}
