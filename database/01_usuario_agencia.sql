-- HU 1.1 · Tablas de agencias y usuarios del sistema
CREATE TABLE agencia (
  id_agencia INT AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(80)  NOT NULL,
  ciudad     VARCHAR(60)  NOT NULL,
  direccion  VARCHAR(150),
  telefono   CHAR(9)
);

CREATE TABLE usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombres    VARCHAR(100) NOT NULL,
  usuario    VARCHAR(40)  NOT NULL UNIQUE,
  contrasena CHAR(60)     NOT NULL,          -- hash bcrypt
  rol        ENUM('COUNTER','ALMACEN','GERENTE') NOT NULL,
  id_agencia INT NOT NULL,
  estado     TINYINT(1)   NOT NULL DEFAULT 1,
  FOREIGN KEY (id_agencia) REFERENCES agencia(id_agencia)
);

INSERT INTO agencia (nombre, ciudad, direccion, telefono) VALUES
  ('Trujillo',   'Trujillo',   'Av. España 123',     '044123456'),
  ('Huamachuco', 'Huamachuco', 'Jr. Sánchez Carrión 450', '044441122'),
  ('Otuzco',     'Otuzco',     'Jr. Tacna 210',      '044436677');

-- Usuario administrador inicial (contraseña: Admin2026*)
INSERT INTO usuario (nombres, usuario, contrasena, rol, id_agencia) VALUES
  ('Administrador', 'admin', '$2a$10$rMkgYzbz9MLwt3iVR.BQA.1jjvKyC9cMw2t6mKFkMYdVgqEOkWxCS', 'GERENTE', 1);
