const { body } = require('express-validator');

exports.validarCliente = [
  body('num_documento').matches(/^\d{8}$/).withMessage('El DNI debe tener 8 dígitos'),
  body('telefono').optional().matches(/^9\d{8}$/).withMessage('El teléfono debe tener 9 dígitos'),
  body('nombres').trim().notEmpty().withMessage('El nombre es obligatorio'),
];

exports.validarEncomienda = [
  body('id_remitente').isInt().withMessage('Seleccione el remitente'),
  body('id_destinatario').isInt().withMessage('Seleccione el destinatario'),
  body('id_agencia_destino').isInt().withMessage('Seleccione la agencia de destino'),
  // Pendiente (semana 2): descripción, bultos, peso con 2 decimales y estado de pago
];
