const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.login = async (req, res) => {
  const { usuario, contrasena } = req.body;
  if (!usuario || !contrasena) {
    return res.status(400).json({ mensaje: 'Ingrese usuario y contraseña' });
  }

  const [rows] = await db.query(
    'SELECT id_usuario, nombres, contrasena, rol, id_agencia FROM usuario WHERE usuario = ? AND estado = 1',
    [usuario]
  );
  const user = rows[0];
  const valida = user && await bcrypt.compare(contrasena, user.contrasena);

  // Mensaje genérico: no indica qué dato falló
  if (!valida) return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });

  const token = jwt.sign(
    { id: user.id_usuario, rol: user.rol, agencia: user.id_agencia },
    process.env.JWT_SECRET,
    { expiresIn: '30m' } // la sesión se cierra tras 30 minutos
  );
  res.json({ token, nombres: user.nombres, rol: user.rol });
};
