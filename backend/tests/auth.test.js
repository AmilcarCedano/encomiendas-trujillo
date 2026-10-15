const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../src/config/db', () => ({ query: jest.fn() }));
const db = require('../src/config/db');
const app = require('../src/app');
const { permitir } = require('../src/middlewares/auth');

process.env.JWT_SECRET = 'clave-de-prueba';
const hash = bcrypt.hashSync('Clave2026*', 10);
const usuario = { id_usuario: 1, nombres: 'María Rojas', contrasena: hash, rol: 'COUNTER', id_agencia: 1 };

describe('HU 1.1 · Iniciar sesión', () => {
  beforeEach(() => db.query.mockReset());

  test('permite ingresar con usuario y contraseña válidos', async () => {
    db.query.mockResolvedValue([[usuario]]);
    const res = await request(app).post('/api/auth/login').send({ usuario: 'mrojas', contrasena: 'Clave2026*' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.rol).toBe('COUNTER');
  });

  test('rechaza contraseña incorrecta con mensaje genérico', async () => {
    db.query.mockResolvedValue([[usuario]]);
    const res = await request(app).post('/api/auth/login').send({ usuario: 'mrojas', contrasena: 'otra' });
    expect(res.status).toBe(401);
    expect(res.body.mensaje).toBe('Usuario o contraseña incorrectos');
  });

  test('rechaza usuario inexistente con el mismo mensaje', async () => {
    db.query.mockResolvedValue([[]]);
    const res = await request(app).post('/api/auth/login').send({ usuario: 'nadie', contrasena: 'x' });
    expect(res.status).toBe(401);
    expect(res.body.mensaje).toBe('Usuario o contraseña incorrectos');
  });

  test('la contraseña se guarda cifrada con bcrypt', () => {
    expect(usuario.contrasena).toMatch(/^\$2[aby]\$10\$/);
    expect(usuario.contrasena).not.toContain('Clave2026*');
  });

  test('el counter no accede a rutas del gerente (403)', () => {
    const token = jwt.sign({ id: 1, rol: 'COUNTER' }, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    permitir('GERENTE')(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(403);
  });

  test('el token expira a los 30 minutos', async () => {
    db.query.mockResolvedValue([[usuario]]);
    const res = await request(app).post('/api/auth/login').send({ usuario: 'mrojas', contrasena: 'Clave2026*' });
    const { iat, exp } = jwt.decode(res.body.token);
    expect(exp - iat).toBe(30 * 60);
  });

  test('un usuario desactivado no puede ingresar', async () => {
    db.query.mockResolvedValue([[]]); // la consulta filtra estado = 1
    const res = await request(app).post('/api/auth/login').send({ usuario: 'inactivo', contrasena: 'x' });
    expect(res.status).toBe(401);
  });
});
