const jwt = require('jsonwebtoken');

// Restringe una ruta a los roles indicados
exports.permitir = (...roles) => (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const datos = jwt.verify(token, process.env.JWT_SECRET);
    if (!roles.includes(datos.rol)) return res.status(403).json({ mensaje: 'Sin permiso' });
    req.usuario = datos;
    next();
  } catch {
    res.status(401).json({ mensaje: 'Sesión expirada' });
  }
};
