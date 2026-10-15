const db = require('../config/db');

/**
 * Calcula el costo del envío según el destino y el peso.
 * costo = precio_base + (peso_kg × precio_kg)
 */
exports.calcularCosto = async (idAgenciaDestino, pesoKg) => {
  const [rows] = await db.query(
    'SELECT precio_base, precio_kg FROM tarifa WHERE id_agencia_destino = ?',
    [idAgenciaDestino]
  );

  if (rows.length === 0) {
    // Si el destino no tiene tarifa, no se permite guardar
    const error = new Error('El destino seleccionado no tiene tarifa registrada');
    error.status = 422;
    throw error;
  }

  const { precio_base, precio_kg } = rows[0];
  const monto = Number(precio_base) + Number(pesoKg) * Number(precio_kg);
  return Math.round(monto * 100) / 100; // 2 decimales
};

// Pendiente (semana 2): endpoint GET /api/tarifas/calcular para mostrar el monto antes de guardar
